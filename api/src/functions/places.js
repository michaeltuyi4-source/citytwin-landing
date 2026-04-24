// CityTwin Azure Function — api/src/functions/places.js
// Handles two routes:
//   1. ?lat=&lng=&type=  → nearby places search (existing)
//   2. ?type=photo&placeid=  → Google Places photo proxy (NEW)
//
// Security:
//   - CORS restricted to citytwinapp.com (+ localhost for dev)
//   - API key never exposed to client
//   - Rate limiting handled by Azure API Management (Stage 3)

const { app } = require('@azure/functions');

const GOOGLE_KEY    = process.env.GOOGLE_PLACES_KEY;
const ALLOWED_ORIGINS = [
  'https://www.citytwinapp.com',
  'https://citytwinapp.com',
  'http://localhost:3000',    // local dev
  'http://127.0.0.1:5500',   // VS Code Live Server
];

// Shared CORS headers builder
function corsHeaders(requestOrigin) {
  const origin = ALLOWED_ORIGINS.includes(requestOrigin)
    ? requestOrigin
    : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin':  origin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'X-Content-Type-Options':       'nosniff',
    'X-Frame-Options':              'DENY',
    'Cache-Control':                'public, max-age=3600',  // cache 1hr
  };
}

// ─── Category → Google Places API type values ────────────────────────────────
// Uses the official Places API `type` parameter for precise filtering.
const CATEGORY_TYPES = {
  coffeeShops:       'cafe',
  foodScene:         'restaurant',
  fitness:           'gym',
  faith:             'church',         // keyword fallback covers other faiths
  outdoorSpaces:     'park',
  nightlife:         'bar',
  culturalDiversity: 'supermarket',    // keyword fallback narrows to intl markets
  grocery:           'supermarket',
  familyFriendly:    'playground',
  shopping:          'shopping_mall',
  entertainment:     'movie_theater',
  trails:            'park',           // no dedicated trails type; park is closest
};

// ─── Keyword fallbacks for categories that need extra specificity ─────────────
// Only applied when present — layered on top of the type param.
const CATEGORY_KEYWORDS = {
  faith:             'church mosque synagogue temple worship',
  culturalDiversity: 'international grocery ethnic market',
};

// ─── MAIN HANDLER ─────────────────────────────────────────────────────────────
app.http('places', {
  methods:   ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (request, context) => {

    const origin  = request.headers.get('origin') || '';
    const headers = corsHeaders(origin);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return { status: 204, headers };
    }

    const params  = new URL(request.url).searchParams;
    const reqType = params.get('type');

    // ── Route 1: Photo proxy (NEW) ──────────────────────────────────────────
    // Called by the landing page to load real neighborhood photos.
    // Strategy: text search for a well-known landmark in the neighborhood,
    // then fetch a photo from that place. More reliable than neighborhood
    // Place IDs which Google doesn't consistently support.
    //
    // Query: ?type=photo&neighborhood=NoDa Charlotte NC
    // Returns: { photoUrl: "https://..." } or { photoUrl: null }
    if (reqType === 'photo') {
      const neighborhood = params.get('neighborhood');
      if (!neighborhood) {
        return {
          status:  400,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body:    JSON.stringify({ error: 'neighborhood param required' }),
        };
      }

      try {
        // Step 1: Text search for the neighborhood to get a place with photos
        const searchUrl = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
        searchUrl.searchParams.set('query', neighborhood);
        searchUrl.searchParams.set('key', GOOGLE_KEY);

        const searchRes  = await fetch(searchUrl.toString());
        const searchData = await searchRes.json();

        // Find first result that has photos
        const placeWithPhoto = (searchData.results || []).find(
          r => r.photos && r.photos.length > 0
        );

        if (!placeWithPhoto) {
          return {
            status:  200,
            headers: { ...headers, 'Content-Type': 'application/json' },
            body:    JSON.stringify({ photoUrl: null }),
          };
        }

        const photoRef = placeWithPhoto.photos[0].photo_reference;

        // Step 2: Fetch the actual photo — Google redirects to CDN URL
        const photoUrl = new URL('https://maps.googleapis.com/maps/api/place/photo');
        photoUrl.searchParams.set('maxwidth', '800');
        photoUrl.searchParams.set('photo_reference', photoRef);
        photoUrl.searchParams.set('key', GOOGLE_KEY);

        const photoRes = await fetch(photoUrl.toString(), { redirect: 'follow' });
        const finalUrl = photoRes.url;

        return {
          status:  200,
          headers: {
            ...headers,
            'Content-Type':  'application/json',
            'Cache-Control': 'public, max-age=86400',  // cache 24hrs
          },
          body: JSON.stringify({ photoUrl: finalUrl }),
        };

      } catch (err) {
        context.error('Photo proxy error:', err);
        return {
          status:  200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body:    JSON.stringify({ photoUrl: null, error: err.message }),
        };
      }
    }

    // ── Route 2: Nearby places search (existing) ────────────────────────────
    // Query: ?lat=&lng=&type=CATEGORY&radius=1609
    const lat      = parseFloat(params.get('lat'));
    const lng      = parseFloat(params.get('lng'));
    const category = params.get('type') || 'coffee';
    const radius   = parseInt(params.get('radius') || '1609', 10);

    if (isNaN(lat) || isNaN(lng)) {
      return {
        status:  400,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body:    JSON.stringify({ error: 'lat and lng required' }),
      };
    }

    const placeType = CATEGORY_TYPES[category] || 'establishment';
    const keyword   = CATEGORY_KEYWORDS[category] || null;

    try {
      const searchUrl = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
      searchUrl.searchParams.set('location', `${lat},${lng}`);
      searchUrl.searchParams.set('radius', radius.toString());
      searchUrl.searchParams.set('type', placeType);
      if (keyword) searchUrl.searchParams.set('keyword', keyword);
      searchUrl.searchParams.set('key', GOOGLE_KEY);

      const searchRes  = await fetch(searchUrl.toString());
      const searchData = await searchRes.json();

      if (searchData.status !== 'OK' && searchData.status !== 'ZERO_RESULTS') {
        throw new Error(`Places API: ${searchData.status}`);
      }

      const results = (searchData.results || []).slice(0, 6).map(place => ({
        place_id:  place.place_id,
        name:      place.name,
        rating:    place.rating || null,
        vicinity:  place.vicinity,
        open_now:  place.opening_hours?.open_now ?? null,
        lat:       place.geometry?.location?.lat,
        lng:       place.geometry?.location?.lng,
        // Include photo reference so client can call ?type=photo&placeid= if needed
        has_photo: (place.photos?.length || 0) > 0,
      }));

      return {
        status:  200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body:    JSON.stringify({ results, status: searchData.status }),
      };

    } catch (err) {
      context.error('Places search error:', err);
      return {
        status:  500,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body:    JSON.stringify({ error: err.message }),
      };
    }
  },
});
