const { app } = require('@azure/functions');

const CATEGORY_QUERIES = {
  walkability:       null,
  transitAccess:     null,
  foodScene:         'restaurant',
  coffeeShops:       'coffee shop',
  outdoorSpaces:     'park',
  nightlife:         'bar',
  familyFriendly:    'playground',
  culturalDiversity: 'international grocery store',
  affordability:     null,
  quietResidential:  null,
  faith:             'church OR mosque OR temple OR synagogue',
  fitness:           'gym',
  markets:           'international market',
};

app.http('places', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {

    // CORS headers so your frontend can call this
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    try {
      const lat      = request.query.get('lat');
      const lng      = request.query.get('lng');
      const category = request.query.get('category');
      const radius   = request.query.get('radius') || '1500';

      // Validate inputs
      if (!lat || !lng || !category) {
        return {
          status: 400,
          headers,
          body: JSON.stringify({ error: 'lat, lng, and category are required' }),
        };
      }

      const query = CATEGORY_QUERIES[category];
      if (!query) {
        return {
          status: 200,
          headers,
          body: JSON.stringify({ places: [] }),
        };
      }

      const key = process.env.GOOGLE_PLACES_KEY;

      // Call Google Places Text Search API
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json` +
        `?query=${encodeURIComponent(query)}` +
        `&location=${lat},${lng}` +
        `&radius=${radius}` +
        `&key=${key}`;

      const response = await fetch(url);
      const data     = await response.json();

      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        context.log('Google Places error:', data.status, data.error_message);
        return {
          status: 502,
          headers,
          body: JSON.stringify({ error: 'Google Places API error', status: data.status }),
        };
      }

      // Shape the results — only send what the frontend needs
      const places = (data.results || []).slice(0, 6).map(p => ({
        id:       p.place_id,
        name:     p.name,
        address:  p.formatted_address,
        rating:   p.rating || null,
        reviews:  p.user_ratings_total || 0,
        lat:      p.geometry?.location?.lat,
        lng:      p.geometry?.location?.lng,
        open:     p.opening_hours?.open_now ?? null,
        photo:    p.photos?.[0]?.photo_reference || null,
      }));

      return {
        status: 200,
        headers,
        body: JSON.stringify({ places, category }),
      };

    } catch (err) {
      context.log('Function error:', err.message);
      return {
        status: 500,
        headers,
        body: JSON.stringify({ error: 'Internal server error' }),
      };
    }
  },
});