# CityTwin

**Helping movers preserve their lifestyle when they relocate.**

CityTwin matches people moving to a new city with the neighborhoods most likely to feel like home — based on lifestyle priorities like walkability, food scene, transit access, and outdoor spaces. No account required. No long questionnaires. Results in under a minute.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript (no framework) |
| Fonts | DM Serif Display + DM Sans via Google Fonts |
| Maps | Mapbox GL JS v3.3.0 |
| Places data | Google Places API (Nearby Search + Text Search + Photo) |
| Backend | Azure Functions v4 (Node.js) |
| Hosting | Azure Static Web Apps |
| CI/CD | GitHub Actions |
| Waitlist forms | Web3Forms |

The frontend is intentionally framework-free. Every page is a self-contained HTML file with inlined CSS and a `<script>` block. This keeps the bundle size at zero and deployment trivial — push to `main`, done.

---

## File Structure

```
citytwin-landing/
│
├── index.html               # Original landing page (waitlist-focused)
├── index-new.html           # Redesigned marketing homepage (active)
├── find.html                # 3-step lifestyle questionnaire
├── results.html             # Neighborhood match results page
├── places.html              # Interactive map with live Google Places data
├── thank-you.html           # Waitlist signup confirmation
├── terms.html               # Terms of Use
├── privacy-policy.html      # Privacy Policy
│
├── script.js                # Waitlist form submission (Web3Forms)
│
├── data/
│   ├── neighborhoods.js     # All neighborhood data + category definitions
│   └── scoring.js           # Matching engine (pure weighted arithmetic)
│
├── api/
│   ├── host.json            # Azure Functions host config
│   ├── package.json         # Node.js deps (@azure/functions, node-fetch)
│   └── src/functions/
│       └── places.js        # Azure Function: Google Places proxy
│
└── .github/workflows/
    └── azure-static-web-apps-*.yml   # Auto-deploy on push to main
```

### Page flow

```
index-new.html
    └── find.html  (3-step quiz)
            └── results.html  (top 3 neighborhood matches)
                    └── places.html  (live map of nearby venues)
```

Results and user priorities travel between pages via `sessionStorage` — no backend session required.

---

## How Scoring Works

The matching engine lives entirely in [`data/scoring.js`](data/scoring.js) and [`data/neighborhoods.js`](data/neighborhoods.js). There is no AI or ML — it is transparent weighted arithmetic that can be audited and explained to the user.

### 1. Neighborhood data

Each neighborhood carries a `scores` object with integer values from 1–10 across ten lifestyle categories:

```
walkability, transitAccess, foodScene, coffeeShops, outdoorSpaces,
nightlife, familyFriendly, culturalDiversity, affordability, quietResidential
```

Scores are manually researched from Walk Score, Niche, RentCafe, Apartment List, and local guides (2024–2025).

### 2. User priority weights

In Step 3 of the questionnaire the user assigns a priority level to each category they selected:

| Priority label | Numeric weight |
|---|---|
| Must have | 3 |
| Important | 2 |
| Nice to have | 1 |

A "must have" carries three times the weight of a "nice to have."

### 3. Raw score

For each neighborhood, the engine multiplies the neighborhood's score in each selected category by the user's weight for that category and sums the results:

```
rawScore = Σ (neighborhoodScore[category] × userWeight[category])
```

### 4. Match percentage

The raw score is normalised against the theoretical maximum — what a perfect 10/10 neighborhood would score given the user's exact weights:

```
maxPossibleScore = Σ (10 × userWeight[category])
matchPercent     = round((rawScore / maxPossibleScore) × 100)
```

### 5. Gap detection

If the user marked a category as "must have" (weight 3) but the neighborhood scores 5 or below in that category, a gap warning is surfaced on the results card. Pre-written gaps from the neighborhood data are also appended.

### 6. Plain-language explanation

The engine finds the top 3 categories where the neighborhood scores ≥ 7 **and** the user weighted them highly. It converts these into a single sentence:

> "Stands out for its exceptional walkability (9/10), strong food scene (8/10), and solid public transit (7/10)."

### Summary

```
User priorities
      │
      ▼
scoreNeighborhood()   →  rawScore per neighborhood
      │
      ▼
maxPossibleScore()    →  normalise to matchPercent
      │
      ▼
detectGaps()          →  honest mismatch warnings
      │
      ▼
buildExplanation()    →  plain-language "why this fits you"
      │
      ▼
getTopMatches()       →  sorted top 3 → sessionStorage → results.html
```

---

## Azure Function: Google Places Proxy

**Endpoint:** `https://citytwin-api.azurewebsites.net/api/places`

The Azure Function (`api/src/functions/places.js`) acts as a secure proxy between the browser and the Google Places API. The `GOOGLE_PLACES_KEY` environment variable is set in Azure and never reaches the client.

CORS is locked to `citytwinapp.com` (plus `localhost:3000` and `127.0.0.1:5500` for local dev).

### Route 1 — Nearby places search

Used by `places.html` to populate the map panel when the user selects a lifestyle category tab.

```
GET /api/places?lat={lat}&lng={lng}&type={category}&radius={metres}
```

| Param | Description |
|---|---|
| `lat`, `lng` | Coordinates of the matched neighborhood center |
| `type` | Lifestyle category (`coffeeShops`, `foodScene`, `fitness`, `faith`, `trails`, etc.) |
| `radius` | Search radius in metres (default `1609` = 1 mile) |

The function maps each category to a Google Places keyword:

```js
coffeeShops  →  "coffee shop"
foodScene    →  "restaurant"
fitness      →  "gym"
faith        →  "church OR mosque OR synagogue OR temple"
trails       →  "hiking trail OR nature trail"
// ...etc
```

**Response:**
```json
{
  "results": [
    {
      "name": "Smelly Cat Coffee",
      "rating": 4.7,
      "vicinity": "514 E 36th St, Charlotte",
      "open_now": true,
      "lat": 35.2368,
      "lng": -80.8275,
      "has_photo": true
    }
  ],
  "status": "OK"
}
```

Results are capped at 10 per request. Responses are cached for 1 hour via `Cache-Control: public, max-age=3600`.

### Route 2 — Neighborhood photo proxy

Used by `index-new.html` to load real Google Places photos into the neighborhood showcase cards. Falls back silently to the CSS gradient if no photo is found — no broken UI.

```
GET /api/places?type=photo&neighborhood={neighborhood+city+state}
```

**Two-step process:**
1. Text Search for the neighborhood name to find a place with photos
2. Fetch that place's photo reference through the Places Photo API, follow the redirect to the CDN URL, and return it

**Response:**
```json
{ "photoUrl": "https://lh3.googleusercontent.com/places/..." }
```

Photo responses are cached for 24 hours (`Cache-Control: public, max-age=86400`).

### Running the API locally

```bash
cd api
npm install
# Add a local.settings.json with your GOOGLE_PLACES_KEY
func start
```

`local.settings.json` (not committed):
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "GOOGLE_PLACES_KEY": "YOUR_KEY_HERE"
  }
}
```

---

## Deployment

Every push to `main` triggers the GitHub Actions workflow (`.github/workflows/`), which deploys the static frontend to Azure Static Web Apps automatically. The Azure Function is deployed as part of the same Static Web App resource.

The `AZURE_STATIC_WEB_APPS_API_TOKEN` is stored as a GitHub repository secret.

---

## Cities & Neighborhoods (Stage 1 data)

8 cities are live. Each city has 3 hand-researched neighborhoods.

| City | Neighborhoods |
|---|---|
| Charlotte, NC | South End, NoDa, Dilworth |
| Montgomery County, MD | Rockville Town Center, Kentlands, Germantown |
| Chicago, IL | Wicker Park, West Loop, Lincoln Park |
| Dallas, TX | Uptown, Bishop Arts District, Deep Ellum |
| Houston, TX | Montrose, Midtown, The Heights |
| Seattle, WA | Capitol Hill, Ballard, Fremont |
| Phoenix, AZ | Downtown, Roosevelt Row, Midtown |
| Atlanta, GA | Midtown, Old Fourth Ward, Inman Park |

---

## Stage 3 Roadmap

### More cities
Denver, Nashville, Austin, Miami, and Raleigh are already marked on the homepage map as "coming soon." The data model in `neighborhoods.js` is designed to accept new cities with no code changes — add a key and the scoring engine picks it up automatically.

### Community layer
The homepage previews Meetup and Eventbrite integrations. Stage 3 adds a "find your people" layer alongside the neighborhood match: local events, running clubs, faith communities, and professional groups filtered to the matched neighborhood and the user's lifestyle categories.

### User accounts and saved searches
Allow users to save their lifestyle profile, revisit results, and update priorities as their move date approaches. Enables email re-engagement ("your matched neighborhoods in Charlotte have updated").

### Enterprise / B2B product
Relocation management companies and HR teams handling corporate moves. The demo request modal on the homepage (wired to `hello@citytwinapp.com`) is the current top-of-funnel. Stage 3 introduces a white-label embed and a bulk API for relocation partners.

### Expanded scoring model
- More lifestyle categories (pet-friendliness, bikeability, school ratings for families)
- Scoring data sourced dynamically rather than hardcoded — pull from Walk Score API, census data, and Google Places density metrics
- Confidence scores to surface data freshness and source quality

### Azure API Management
Rate limiting and quota management for the Google Places proxy are noted as a Stage 3 item in the function source. Currently the function is open to any authenticated request from the allowed origins.

---

## Contact

- General: hello@citytwinapp.com
- Privacy: privacy@citytwinapp.com
- Legal: legal@citytwinapp.com
