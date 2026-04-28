// scripts/seed-new-cities.mjs
// Seeds Austin, Nashville, Denver, Miami, Raleigh, Springfield,
// DC Metro, and Northern Virginia into the Supabase cities +
// neighborhoods tables.
//
// Run from project root:
//   SUPABASE_SERVICE_KEY=your_key node scripts/seed-new-cities.mjs
//
// Idempotent — fetches existing cities by name first, skips any already present.
// Safe to re-run.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL         = 'https://xdbsimwqyjttfihuvpal.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error(
    'Missing SUPABASE_SERVICE_KEY.\n' +
    'Run with: SUPABASE_SERVICE_KEY=your_key node scripts/seed-new-cities.mjs'
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ── City + neighborhood data ──────────────────────────────────────────────────
// Each city: { name, state, status, lat, lng, neighborhoods[] }
// Each neighborhood carries every column in the neighborhoods table directly.

const NEW_CITIES = [

  // ── Austin, TX ──────────────────────────────────────────────────────────────
  {
    name: 'Austin', state: 'TX', status: 'live', lat: 30.2950, lng: -97.7331,
    neighborhoods: [
      {
        name:               'South Congress (SoCo)',
        tagline:            'Austin\'s iconic strip — walkable, eclectic, effortlessly cool',
        walkability:        8,
        public_transit:     6,
        food_scene:         9,
        coffee_shops:       8,
        fitness:            7,
        faith:              6,
        outdoor_spaces:     8,
        nightlife:          8,
        cultural_diversity: 7,
        family_friendly:    6,
        affordability:      4,
        rent_min:           1800,
        rent_max:           2400,
        walk_score:         80,
        highlights: [
          'South Congress Avenue — iconic strip of boutiques, cafes, restaurants, and live music',
          'Barton Springs Pool and Zilker Park within biking distance — Austin\'s outdoor heartbeat',
          'One of Austin\'s most walkable neighborhoods with a distinct local identity',
        ],
        gaps: [
          'Among Austin\'s priciest rental markets — premium for the lifestyle',
          'Car still needed for errands beyond the SoCo corridor',
          'Traffic on Congress Avenue can be slow during events',
        ],
        best_for:       ['Young professionals', 'Music lovers', 'Foodies', 'Creative types'],
        things_to_know: [
          'SoCo hosts Austin City Limits Fest overflow crowds and is packed during SXSW',
          'The Continental Club on South Congress is one of America\'s great live music rooms',
          'Barton Springs — a natural spring-fed pool — is open year-round and free most mornings',
        ],
        lat: 30.2419, lng: -97.7503,
      },
      {
        name:               'East Austin',
        tagline:            'Austin\'s creative engine — diverse, vibrant, and impossibly tasty',
        walkability:        7,
        public_transit:     5,
        food_scene:         9,
        coffee_shops:       9,
        fitness:            7,
        faith:              7,
        outdoor_spaces:     6,
        nightlife:          9,
        cultural_diversity: 9,
        family_friendly:    5,
        affordability:      5,
        rent_min:           1600,
        rent_max:           2200,
        walk_score:         72,
        highlights: [
          'Austin\'s most acclaimed food and bar scene — new restaurants opening weekly',
          'Strong creative arts community with galleries, studios, and music venues',
          'Diverse, culturally rich neighborhood with deep Latino roots and new energy',
        ],
        gaps: [
          'Rapid gentrification has significantly changed the neighborhood\'s character and cost',
          'Car still needed beyond the main strips on 6th and 7th Streets',
        ],
        best_for:       ['Foodies', 'Creatives', 'Nightlife seekers', 'Young professionals'],
        things_to_know: [
          'East Austin transformed from an underserved area to one of the hottest food destinations in the South',
          'Home to Franklin Barbecue — consistently rated the best BBQ in America',
          'Street parking is increasingly difficult on busy weekend nights',
        ],
        lat: 30.2626, lng: -97.7186,
      },
      {
        name:               'Domain / North Austin',
        tagline:            'Austin\'s tech corridor — upscale, modern, and surprisingly walkable',
        walkability:        7,
        public_transit:     5,
        food_scene:         8,
        coffee_shops:       7,
        fitness:            8,
        faith:              6,
        outdoor_spaces:     6,
        nightlife:          7,
        cultural_diversity: 6,
        family_friendly:    8,
        affordability:      5,
        rent_min:           1700,
        rent_max:           2300,
        walk_score:         62,
        highlights: [
          'The Domain — upscale walkable retail, dining, and entertainment district anchored by Whole Foods',
          'Apple, Amazon, Google, and Meta campuses within minutes — Austin\'s tech employment hub',
          'Modern apartment communities with resort-style amenities and easy employer access',
        ],
        gaps: [
          'Very car-dependent outside The Domain footprint itself',
          'MoPac Expressway traffic can be brutal during peak commute hours',
        ],
        best_for:       ['Tech workers', 'Families', 'Young professionals', 'Suburbanites wanting walkable access'],
        things_to_know: [
          'The Domain functions as a self-contained city — residents can avoid Downtown entirely',
          'Apple\'s 3-million-square-foot North Austin campus employs over 15,000 people nearby',
          'North Austin\'s growth has made it the primary tech employment hub of the entire metro',
        ],
        lat: 30.4011, lng: -97.7244,
      },
    ],
  },

  // ── Nashville, TN ────────────────────────────────────────────────────────────
  {
    name: 'Nashville', state: 'TN', status: 'live', lat: 36.1480, lng: -86.7699,
    neighborhoods: [
      {
        name:               'East Nashville',
        tagline:            'Nashville\'s creative soul — eclectic, musical, and community-driven',
        walkability:        7,
        public_transit:     4,
        food_scene:         9,
        coffee_shops:       9,
        fitness:            7,
        faith:              7,
        outdoor_spaces:     7,
        nightlife:          8,
        cultural_diversity: 7,
        family_friendly:    7,
        affordability:      5,
        rent_min:           1500,
        rent_max:           2100,
        walk_score:         68,
        highlights: [
          'Five Points — walkable hub of acclaimed restaurants, bars, coffee shops, and live music',
          'Shelby Bottoms Greenway — 810-acre park with trails along the Cumberland River',
          'Strong community of artists, musicians, chefs, and entrepreneurs',
        ],
        gaps: [
          'Very limited public transit — a car is nearly essential for commuting',
          'Rapid price increases over five years have pushed out longtime residents',
        ],
        best_for:       ['Creatives', 'Musicians', 'Foodies', 'Young professionals'],
        things_to_know: [
          'East Nashville was largely rebuilt after a tornado in 1998 — its revival made it what it is today',
          'Bongo Java on Belmont is one of the oldest independent coffeehouses in Nashville',
          'The neighborhood floods during heavy rain — check flood maps before renting ground-floor units',
        ],
        lat: 36.1741, lng: -86.7482,
      },
      {
        name:               'The Gulch',
        tagline:            'Nashville\'s most walkable urban neighborhood — sleek, social, vertical',
        walkability:        9,
        public_transit:     5,
        food_scene:         9,
        coffee_shops:       7,
        fitness:            9,
        faith:              4,
        outdoor_spaces:     5,
        nightlife:          8,
        cultural_diversity: 6,
        family_friendly:    4,
        affordability:      3,
        rent_min:           2200,
        rent_max:           3200,
        walk_score:         90,
        highlights: [
          'Walk Score 90 — Nashville\'s most walkable neighborhood by a wide margin',
          'High-rise living with rooftop pools and direct skyline views of downtown',
          'Walking distance to Bridgestone Arena, Broadway honky-tonks, and Nissan Stadium',
        ],
        gaps: [
          'Among Nashville\'s most expensive rental markets — premium for the walkability',
          'Very limited green space — the smallest footprint of any Nashville neighborhood',
        ],
        best_for:       ['Young professionals', 'Finance and tech workers', 'Urban lifestyle seekers'],
        things_to_know: [
          'The Gulch is Nashville\'s only LEED-certified neighborhood',
          'SoBro and The Gulch have merged into a continuous high-rise corridor stretching to Lower Broadway',
          'Small footprint — everything you need is within a 10-minute walk',
        ],
        lat: 36.1480, lng: -86.7922,
      },
      {
        name:               '12 South',
        tagline:            'Boutique, walkable, community-first — Nashville\'s most charming neighborhood',
        walkability:        8,
        public_transit:     4,
        food_scene:         9,
        coffee_shops:       9,
        fitness:            7,
        faith:              7,
        outdoor_spaces:     7,
        nightlife:          7,
        cultural_diversity: 6,
        family_friendly:    8,
        affordability:      4,
        rent_min:           1800,
        rent_max:           2600,
        walk_score:         80,
        highlights: [
          '12th Avenue South — a compact walkable strip of boutiques, acclaimed restaurants, and coffee',
          'Sevier Park — neighborhood green space hosting farmers markets and community events year-round',
          'Strong community identity with a distinct local character unlike the rest of Nashville',
        ],
        gaps: [
          'One of Nashville\'s most expensive neighborhoods — single-family home prices average over $900K',
          'Minimal public transit — a car is needed for anything outside the immediate corridor',
        ],
        best_for:       ['Young families', 'Professionals', 'Foodies', 'Community seekers'],
        things_to_know: [
          'Frothy Monkey — the neighborhood coffee institution — has been here since before 12 South was trendy',
          'Imogen Hotel and the redevelopment of Sevier Park have anchored the neighborhood\'s national profile',
          'Radnor Lake State Park, one of Nashville\'s best natural areas, is a short drive south',
        ],
        lat: 36.1219, lng: -86.7895,
      },
    ],
  },

  // ── Denver, CO ───────────────────────────────────────────────────────────────
  {
    name: 'Denver', state: 'CO', status: 'live', lat: 39.7391, lng: -104.9849,
    neighborhoods: [
      {
        name:               'Capitol Hill',
        tagline:            'Denver\'s most walkable neighborhood — eclectic, affordable, full of character',
        walkability:        9,
        public_transit:     8,
        food_scene:         8,
        coffee_shops:       9,
        fitness:            8,
        faith:              7,
        outdoor_spaces:     7,
        nightlife:          8,
        cultural_diversity: 8,
        family_friendly:    5,
        affordability:      6,
        rent_min:           1400,
        rent_max:           2000,
        walk_score:         91,
        highlights: [
          'Walk Score 91 — Denver\'s most walkable neighborhood with everything within reach',
          'Cheesman Park — beautiful 80-acre park with mountain views and a beloved running loop',
          'Colfax Avenue — Denver\'s most eclectic commercial strip with bars, diners, and music venues',
        ],
        gaps: [
          'Higher property crime rates than suburban Denver neighborhoods',
          'Older housing stock — many buildings lack in-unit laundry and modern finishes',
        ],
        best_for:       ['Young professionals', 'Artists', 'Budget-conscious movers', 'Walkability seekers'],
        things_to_know: [
          'Capitol Hill was Denver\'s Millionaires Row in the 1890s — many Victorian mansions survive',
          'The Fillmore and Ogden Theatre bring national touring acts to the neighborhood\'s doorstep',
          'Denver\'s 16th Street Mall free bus connects the neighborhood to all of downtown',
        ],
        lat: 39.7370, lng: -104.9795,
      },
      {
        name:               'RiNo (River North)',
        tagline:            'Denver\'s arts and brewery district — creative, energetic, and nationally recognized',
        walkability:        8,
        public_transit:     7,
        food_scene:         9,
        coffee_shops:       9,
        fitness:            8,
        faith:              5,
        outdoor_spaces:     6,
        nightlife:          9,
        cultural_diversity: 7,
        family_friendly:    4,
        affordability:      4,
        rent_min:           1800,
        rent_max:           2600,
        walk_score:         81,
        highlights: [
          'Highest concentration of craft breweries per square mile of any US neighborhood',
          'Murals, galleries, and creative spaces on every block — one of America\'s top arts districts',
          'A Line commuter rail to Denver International Airport and Union Station within walking distance',
        ],
        gaps: [
          'Expensive relative to the industrial character — premium for the RiNo brand',
          'Limited green space — park access requires a trip to other neighborhoods',
        ],
        best_for:       ['Creatives', 'Foodies', 'Brewery enthusiasts', 'Young professionals'],
        things_to_know: [
          'Denver Central Market is the neighborhood\'s food hall anchor — locally sourced everything',
          'RiNo went from a flood-prone industrial zone to one of Denver\'s most desirable neighborhoods in under a decade',
          'The Source Hotel rooftop is one of Denver\'s best spots for mountain views and craft cocktails',
        ],
        lat: 39.7648, lng: -104.9827,
      },
      {
        name:               'Washington Park',
        tagline:            'Denver\'s most beloved neighborhood — outdoor-first, family-friendly, undeniably beautiful',
        walkability:        8,
        public_transit:     6,
        food_scene:         8,
        coffee_shops:       8,
        fitness:            9,
        faith:              7,
        outdoor_spaces:     10,
        nightlife:          6,
        cultural_diversity: 5,
        family_friendly:    9,
        affordability:      4,
        rent_min:           1700,
        rent_max:           2500,
        walk_score:         82,
        highlights: [
          'Washington Park — 165 acres with two lakes, tennis courts, a flower garden, and a beloved cycling loop',
          'Old South Pearl Street — award-winning restaurants, coffee, and a year-round Sunday farmers market',
          'One of Denver\'s safest, most community-oriented, and most consistently desirable neighborhoods',
        ],
        gaps: [
          'Among Denver\'s most expensive neighborhoods — ownership significantly out of reach for many',
          'Limited nightlife — evening activity winds down early by design',
        ],
        best_for:       ['Families', 'Outdoor enthusiasts', 'Dog owners', 'Professionals wanting calm and access'],
        things_to_know: [
          '"Wash Park" residents are legendarily devoted to their neighborhood — it has a cult following',
          'The Old South Pearl Farmers Market runs every Sunday year-round, rain or snow',
          'Biking around the park loop is a daily ritual for thousands of residents',
        ],
        lat: 39.7075, lng: -104.9626,
      },
    ],
  },

  // ── Miami, FL ────────────────────────────────────────────────────────────────
  {
    name: 'Miami', state: 'FL', status: 'live', lat: 25.7630, lng: -80.2102,
    neighborhoods: [
      {
        name:               'Wynwood',
        tagline:            'Miami\'s world-famous arts district — creative, electric, globally recognized',
        walkability:        8,
        public_transit:     5,
        food_scene:         9,
        coffee_shops:       8,
        fitness:            8,
        faith:              5,
        outdoor_spaces:     5,
        nightlife:          9,
        cultural_diversity: 9,
        family_friendly:    3,
        affordability:      4,
        rent_min:           2000,
        rent_max:           3200,
        walk_score:         80,
        highlights: [
          'Wynwood Walls — the world\'s largest permanent outdoor street art museum draws visitors globally',
          'Walkable blocks of galleries, acclaimed restaurants, cocktail bars, and concept stores',
          'Miami\'s most internationally recognized neighborhood — a genuine cultural destination',
        ],
        gaps: [
          'One of Miami\'s most expensive neighborhoods per square foot for what is still a small footprint',
          'Very limited green space — almost entirely concrete and murals',
        ],
        best_for:       ['Creatives', 'Artists', 'Nightlife seekers', 'Young professionals'],
        things_to_know: [
          'Art Basel Miami Beach transforms Wynwood into the epicenter of global contemporary art every December',
          'The neighborhood was a Puerto Rican warehouse district before Tony Goldman began the murals project in 2009',
          'Street parking on weekends is nearly impossible — Uber or bike share strongly recommended',
        ],
        lat: 25.8008, lng: -80.1997,
      },
      {
        name:               'Brickell',
        tagline:            'Miami\'s financial capital — walkable, high-rise, and globally connected',
        walkability:        9,
        public_transit:     8,
        food_scene:         9,
        coffee_shops:       7,
        fitness:            9,
        faith:              5,
        outdoor_spaces:     6,
        nightlife:          9,
        cultural_diversity: 8,
        family_friendly:    4,
        affordability:      2,
        rent_min:           2500,
        rent_max:           4000,
        walk_score:         88,
        highlights: [
          'Metromover — free elevated transit connecting Brickell to downtown, Wynwood, and the airport corridor',
          'Brickell City Centre and Mary Brickell Village — luxury shopping and dining within walking distance',
          'Miami\'s most walkable neighborhood with a dense urban core that rivals any US financial district',
        ],
        gaps: [
          'Among the most expensive rental markets in Florida — luxury pricing at every level',
          'Very high-rise and dense — green space and quiet streets are hard to find',
        ],
        best_for:       ['Finance professionals', 'Urban lifestyle seekers', 'Young professionals', 'International movers'],
        things_to_know: [
          'Brickell is the fastest-growing urban core neighborhood in the United States',
          'Major international banks, law firms, and family offices are headquartered here',
          'The free Metromover makes car-free living genuinely viable within the downtown core',
        ],
        lat: 25.7617, lng: -80.1918,
      },
      {
        name:               'Coconut Grove',
        tagline:            'Miami\'s oldest neighborhood — lush, bohemian, and beautifully unhurried',
        walkability:        7,
        public_transit:     5,
        food_scene:         8,
        coffee_shops:       7,
        fitness:            8,
        faith:              7,
        outdoor_spaces:     9,
        nightlife:          7,
        cultural_diversity: 7,
        family_friendly:    9,
        affordability:      3,
        rent_min:           2200,
        rent_max:           3500,
        walk_score:         72,
        highlights: [
          'Biscayne Bay waterfront with marinas, sailing clubs, and waterside parks',
          'Tree-canopied streets and lush tropical landscaping unlike anywhere else in Miami',
          'CocoWalk village and the Barnacle Historic State Park — neighborhood anchors for decades',
        ],
        gaps: [
          'Some of Miami\'s most expensive single-family homes — ownership requires significant means',
          'Car needed for most errands outside the immediate CocoWalk village area',
        ],
        best_for:       ['Families', 'Boating enthusiasts', 'Established professionals', 'Those wanting quiet with Miami access'],
        things_to_know: [
          'The Coconut Grove Arts Festival — held every February — is one of the oldest arts festivals in the US',
          'The neighborhood has a genuine sailing culture — the Coconut Grove Sailing Club has raced here since 1887',
          'Coral Gables borders the Grove to the west — residents enjoy both communities easily',
        ],
        lat: 25.7280, lng: -80.2390,
      },
    ],
  },

  // ── Raleigh, NC ─────────────────────────────────────────────────────────────
  {
    name: 'Raleigh', state: 'NC', status: 'live', lat: 35.8094, lng: -78.6441,
    neighborhoods: [
      {
        name:               'Downtown Raleigh',
        tagline:            'The Triangle\'s urban core — walkable, growing fast, and full of momentum',
        walkability:        8,
        public_transit:     6,
        food_scene:         8,
        coffee_shops:       8,
        fitness:            7,
        faith:              6,
        outdoor_spaces:     7,
        nightlife:          8,
        cultural_diversity: 7,
        family_friendly:    5,
        affordability:      5,
        rent_min:           1500,
        rent_max:           2200,
        walk_score:         78,
        highlights: [
          'Fayetteville Street — Raleigh\'s walkable main artery with restaurants, bars, and events',
          'Dorothea Dix Park — 308 acres of park land undergoing a major buildout along the Raleigh skyline',
          'Growing craft beer and food scene — Raleigh has quietly become one of the South\'s best food cities',
        ],
        gaps: [
          'Public transit is still developing — bus-dependent with no rail in the core yet',
          'Smaller-city scale means fewer late-night options than Charlotte or Atlanta',
        ],
        best_for:       ['Young professionals', 'Tech workers', 'Urban enthusiasts', 'RTP commuters'],
        things_to_know: [
          'Raleigh is consistently one of the top 5 fastest-growing cities in the United States',
          'Research Triangle Park (RTP) — 15 minutes away — is one of the largest tech employment hubs in the country',
          'Dorothea Dix Park\'s full buildout will make it one of the largest urban parks in the Southeast',
        ],
        lat: 35.7796, lng: -78.6382,
      },
      {
        name:               'North Hills',
        tagline:            'Raleigh\'s upscale mixed-use hub — polished, family-friendly, and well-connected',
        walkability:        7,
        public_transit:     4,
        food_scene:         8,
        coffee_shops:       7,
        fitness:            8,
        faith:              7,
        outdoor_spaces:     7,
        nightlife:          6,
        cultural_diversity: 6,
        family_friendly:    9,
        affordability:      5,
        rent_min:           1400,
        rent_max:           2000,
        walk_score:         65,
        highlights: [
          'North Hills mixed-use district — walkable retail, dining, entertainment, and office in one campus',
          'Midtown Raleigh\'s most established upscale suburban neighborhood with strong schools',
          'Easy access to I-440 beltline for commuting across the Triangle',
        ],
        gaps: [
          'Car needed for most commutes and errands outside the immediate mixed-use core',
          'Less character and street-level energy than Downtown or Five Points',
        ],
        best_for:       ['Families', 'Suburban professionals', 'Those prioritizing schools', 'RTP workers'],
        things_to_know: [
          'Kane Realty\'s mixed-use development has transformed North Hills into Raleigh\'s "Midtown"',
          'One of the Triangle\'s consistently strongest real estate markets — low vacancy, high demand',
          'North Hills Swim and Racquet Club has been the neighborhood\'s social hub since 1960',
        ],
        lat: 35.8412, lng: -78.6518,
      },
      {
        name:               'Midtown Raleigh',
        tagline:            'Affordable, green, and community-focused — Raleigh\'s hidden gem',
        walkability:        6,
        public_transit:     5,
        food_scene:         7,
        coffee_shops:       7,
        fitness:            7,
        faith:              7,
        outdoor_spaces:     8,
        nightlife:          5,
        cultural_diversity: 6,
        family_friendly:    8,
        affordability:      6,
        rent_min:           1300,
        rent_max:           1900,
        walk_score:         58,
        highlights: [
          'Shelley Lake and Optimist Park — beloved local green spaces for running, cycling, and kayaking',
          'More affordable than Downtown or North Hills with genuinely good quality of life',
          'Strong community feel with good schools and safe, well-maintained streets',
        ],
        gaps: [
          'Very car-dependent — limited walkability beyond the immediate neighborhood streets',
          'Fewer dining and nightlife options than Raleigh\'s more urban neighborhoods',
        ],
        best_for:       ['Families', 'Value seekers', 'Outdoor enthusiasts', 'Remote workers'],
        things_to_know: [
          'Shelley Lake is a beloved local gem that many Raleigh residents don\'t know about until they move nearby',
          'Several new mixed-use projects are breaking ground in Midtown — character is changing quickly',
          'One of the better value options in the Raleigh market relative to quality of life',
        ],
        lat: 35.8085, lng: -78.6423,
      },
    ],
  },

  // ── Springfield, IL ──────────────────────────────────────────────────────────
  {
    name: 'Springfield', state: 'IL', status: 'live', lat: 39.8097, lng: -89.6663,
    neighborhoods: [
      {
        name:               'Downtown Springfield',
        tagline:            'Illinois\' state capital — historic, affordable, and genuinely livable',
        walkability:        7,
        public_transit:     5,
        food_scene:         7,
        coffee_shops:       6,
        fitness:            6,
        faith:              7,
        outdoor_spaces:     6,
        nightlife:          6,
        cultural_diversity: 6,
        family_friendly:    6,
        affordability:      9,
        rent_min:           700,
        rent_max:           1100,
        walk_score:         68,
        highlights: [
          'Abraham Lincoln Presidential Library and Museum — one of the finest presidential museums in the country',
          'Historic Old State Capitol district with walkable streets and government-era architecture',
          'Extremely affordable — cost of living among the lowest of any US state capital',
        ],
        gaps: [
          'Limited private sector job market — government and healthcare dominate employment',
          'Smaller city scale — fewer cultural amenities and dining options than major metros',
        ],
        best_for:       ['Government workers', 'History enthusiasts', 'Budget-conscious movers', 'Remote workers'],
        things_to_know: [
          'Springfield is Illinois\' state capital — nearly every major employer ties to government or healthcare',
          'The Lincoln sites draw over a million visitors annually — the city\'s identity is deeply tied to Lincoln\'s legacy',
          'Cost of living is genuinely exceptional — a comfortable lifestyle costs far less here than any comparable city',
        ],
        lat: 39.7983, lng: -89.6542,
      },
      {
        name:               'Prairie Capital',
        tagline:            'Springfield\'s quiet suburban best — affordable, outdoor-adjacent, community-driven',
        walkability:        5,
        public_transit:     4,
        food_scene:         6,
        coffee_shops:       5,
        fitness:            6,
        faith:              8,
        outdoor_spaces:     8,
        nightlife:          4,
        cultural_diversity: 5,
        family_friendly:    8,
        affordability:      10,
        rent_min:           650,
        rent_max:           950,
        walk_score:         42,
        highlights: [
          'Lake Springfield — a 4,200-acre reservoir for boating, fishing, swimming, and lakefront trails',
          'Some of the most affordable single-family homes of any metro area in the United States',
          'Strong community and faith networks with well-maintained parks and quiet streets',
        ],
        gaps: [
          'Very car-dependent — a vehicle is essential for nearly every errand and commute',
          'Limited dining and entertainment options — evenings are quiet',
        ],
        best_for:       ['Families on a budget', 'Remote workers', 'Retirees', 'First-time homebuyers'],
        things_to_know: [
          'Median home prices here can be under $150K — home ownership is genuinely within reach',
          'Lake Springfield provides four seasons of outdoor recreation just minutes from the neighborhood',
          'Community is tight-knit and friendly — neighbors know each other here',
        ],
        lat: 39.8317, lng: -89.6437,
      },
      {
        name:               'West Side Springfield',
        tagline:            'Stable, safe, and affordable — Springfield\'s family-first neighborhood',
        walkability:        5,
        public_transit:     4,
        food_scene:         6,
        coffee_shops:       5,
        fitness:            6,
        faith:              8,
        outdoor_spaces:     6,
        nightlife:          4,
        cultural_diversity: 6,
        family_friendly:    8,
        affordability:      9,
        rent_min:           650,
        rent_max:           1000,
        walk_score:         46,
        highlights: [
          'Washington Park — Springfield\'s premier urban park with formal gardens, a lagoon, and an amphitheater',
          'Good public schools and a stable, well-maintained residential character',
          'Easy access to downtown Springfield — most state government buildings within 10 minutes',
        ],
        gaps: [
          'Car essential for all errands — virtually no walkable commercial strips',
          'Limited cultural and dining amenities compared to even other Springfield neighborhoods',
        ],
        best_for:       ['Families', 'Government employees', 'Budget-conscious movers', 'Remote workers'],
        things_to_know: [
          'Washington Park\'s Muni Opera — a free outdoor amphitheater — hosts summer concerts and theater',
          'West Side offers some of Springfield\'s best-rated public elementary schools',
          'The area is notably quiet and stable — crime rates here are among Springfield\'s lowest',
        ],
        lat: 39.7983, lng: -89.7010,
      },
    ],
  },

  // ── DC Metro ─────────────────────────────────────────────────────────────────
  {
    name: 'DC Metro', state: 'DC', status: 'live', lat: 38.9099, lng: -77.0258,
    neighborhoods: [
      {
        name:               'Capitol Hill',
        tagline:            'DC\'s historic heart — walkable, politically charged, architecturally magnificent',
        walkability:        9,
        public_transit:     9,
        food_scene:         9,
        coffee_shops:       8,
        fitness:            8,
        faith:              7,
        outdoor_spaces:     8,
        nightlife:          7,
        cultural_diversity: 8,
        family_friendly:    7,
        affordability:      3,
        rent_min:           2400,
        rent_max:           3500,
        walk_score:         95,
        highlights: [
          'Eastern Market — DC institution since 1873, beloved for produce, antiques, and community',
          'Metro Orange, Blue, and Silver lines with direct access to every part of the region',
          'Victorian rowhouses, tree-lined streets, and the Capitol dome as a literal landmark',
        ],
        gaps: [
          'Among DC\'s most expensive neighborhoods — premium for the history and location',
          'Older housing stock means many buildings lack modern finishes and in-unit laundry',
        ],
        best_for:       ['Congressional staffers', 'Policy professionals', 'Urban families', 'DC lifers'],
        things_to_know: [
          'The US Capitol, Supreme Court, and Library of Congress are all walking distance from residential streets',
          'Eastern Market has operated continuously since 1873 — one of America\'s great public markets',
          'The neighborhood floods during major storms — basement apartments carry real risk',
        ],
        lat: 38.8895, lng: -76.9970,
      },
      {
        name:               'Dupont Circle',
        tagline:            'DC\'s most cosmopolitan neighborhood — walkable, worldly, and endlessly alive',
        walkability:        10,
        public_transit:     9,
        food_scene:         9,
        coffee_shops:       9,
        fitness:            8,
        faith:              7,
        outdoor_spaces:     8,
        nightlife:          9,
        cultural_diversity: 9,
        family_friendly:    5,
        affordability:      3,
        rent_min:           2500,
        rent_max:           3800,
        walk_score:         98,
        highlights: [
          'Walk Score 98 — one of the highest in Washington DC and among the top in the US',
          'Embassy Row along Massachusetts Avenue — the most cosmopolitan mile in America',
          'Connecticut Avenue — restaurants, bookstores, bars, and coffee from morning to midnight',
        ],
        gaps: [
          'One of DC\'s most expensive neighborhoods — entry price is significant',
          'Weekend nights near the circle are loud — not ideal for those wanting quiet',
        ],
        best_for:       ['Embassy and nonprofit professionals', 'LGBTQ+ movers', 'Urban lifestyle seekers', 'Young professionals'],
        things_to_know: [
          'Dozens of international embassies line Massachusetts Avenue through the neighborhood',
          'Dupont Circle is DC\'s most established and recognized LGBTQ+ neighborhood',
          'Kramerbooks — open since 1976, one of DC\'s most beloved independent bookstores — never fully closes',
        ],
        lat: 38.9096, lng: -77.0434,
      },
      {
        name:               'Columbia Heights',
        tagline:            'DC\'s most diverse neighborhood — vibrant, transit-rich, authentically multicultural',
        walkability:        9,
        public_transit:     9,
        food_scene:         8,
        coffee_shops:       7,
        fitness:            7,
        faith:              8,
        outdoor_spaces:     7,
        nightlife:          7,
        cultural_diversity: 10,
        family_friendly:    7,
        affordability:      5,
        rent_min:           1900,
        rent_max:           2800,
        walk_score:         94,
        highlights: [
          'One of the most culturally diverse urban neighborhoods in the United States',
          'Columbia Heights Metro — direct access to the entire Metro system at the neighborhood\'s doorstep',
          '14th Street corridor — a growing restaurant and bar scene that rivals any DC neighborhood',
        ],
        gaps: [
          'Gentrification tension is significant — longtime Latino residents have been displaced rapidly',
          'Some blocks still feel transitional — street-level experience varies widely',
        ],
        best_for:       ['Diverse community seekers', 'Budget-conscious DC movers', 'Young professionals', 'Families'],
        things_to_know: [
          'Columbia Heights is one of the most linguistically diverse zip codes in the entire country',
          '14th Street transformed from a riot corridor after 1968 into one of DC\'s premier dining destinations',
          'More affordable than Capitol Hill or Dupont while offering equivalent Metro access',
        ],
        lat: 38.9284, lng: -77.0325,
      },
      {
        name:               'Logan Circle',
        tagline:            'DC\'s restaurant row neighborhood — beautiful, central, and irresistibly livable',
        walkability:        9,
        public_transit:     9,
        food_scene:         9,
        coffee_shops:       8,
        fitness:            8,
        faith:              6,
        outdoor_spaces:     7,
        nightlife:          8,
        cultural_diversity: 8,
        family_friendly:    5,
        affordability:      3,
        rent_min:           2300,
        rent_max:           3500,
        walk_score:         96,
        highlights: [
          '14th Street corridor — DC\'s highest concentration of celebrated restaurants and cocktail bars',
          'Logan Circle park — a beautifully restored Victorian fountain and park surrounded by rowhouses',
          'Central location walkable to Dupont Circle, Shaw, U Street, and the Convention Center',
        ],
        gaps: [
          'Among DC\'s most expensive neighborhoods — prices have risen dramatically since 2010',
          'Significant weekend nightlife noise — 14th Street gets loud Thursday through Saturday',
        ],
        best_for:       ['Foodies', 'Young professionals', 'Urban enthusiasts', 'DC transplants'],
        things_to_know: [
          'Logan Circle has produced more James Beard Award nominees per block than any DC neighborhood',
          'The neighborhood transformed almost entirely within a decade — it was largely vacant in the early 2000s',
          'Victorian rowhouses surrounding the circle are some of DC\'s most architecturally significant residential buildings',
        ],
        lat: 38.9101, lng: -77.0303,
      },
    ],
  },

  // ── Northern Virginia ────────────────────────────────────────────────────────
  {
    name: 'Northern Virginia', state: 'VA', status: 'live', lat: 38.9401, lng: -77.2660,
    neighborhoods: [
      {
        name:               'Ashburn',
        tagline:            'Loudoun County\'s family powerhouse — top schools, Silver Line access, strong community',
        walkability:        5,
        public_transit:     7,
        food_scene:         7,
        coffee_shops:       6,
        fitness:            8,
        faith:              8,
        outdoor_spaces:     8,
        nightlife:          4,
        cultural_diversity: 8,
        family_friendly:    10,
        affordability:      4,
        rent_min:           1800,
        rent_max:           2600,
        walk_score:         42,
        highlights: [
          'Dulles Silver Line Metro — opened 2022, connecting Ashburn to DC in approximately 45 minutes',
          'One Loudoun — walkable town center with restaurants, retail, and year-round community events',
          'Top-rated Loudoun County Public Schools — consistently among Virginia\'s best',
        ],
        gaps: [
          'Very car-dependent outside One Loudoun and the immediate Metro station areas',
          'Suburban character throughout — minimal urban energy or walkable street life',
        ],
        best_for:       ['Families', 'Tech workers', 'Northern Virginia commuters', 'Those prioritizing schools'],
        things_to_know: [
          'Ashburn is the "Data Center Capital of the World" — an estimated 70% of global internet traffic routes through here',
          'Loudoun County schools rank among Virginia\'s best every year — a major draw for families',
          'The Silver Line extension transformed Ashburn from fully car-dependent to transit-accessible overnight',
        ],
        lat: 39.0437, lng: -77.4875,
      },
      {
        name:               'Tysons',
        tagline:            'Northern Virginia\'s urban transformation in progress — transit-connected and growing fast',
        walkability:        7,
        public_transit:     8,
        food_scene:         8,
        coffee_shops:       7,
        fitness:            8,
        faith:              6,
        outdoor_spaces:     5,
        nightlife:          6,
        cultural_diversity: 8,
        family_friendly:    7,
        affordability:      4,
        rent_min:           2000,
        rent_max:           3000,
        walk_score:         62,
        highlights: [
          'Four Silver Line Metro stations are actively reshaping Tysons into a walkable urban center',
          'Tysons Corner Center and Tysons Galleria — one of the premier retail destinations on the East Coast',
          'Major tech and government contractor employers within walking distance of Metro stations',
        ],
        gaps: [
          'Still heavily car-oriented outside the immediate Metro station areas — streets are wide and pedestrian-hostile',
          'Corporate and transient feel — lacks the neighborhood character of DC proper',
        ],
        best_for:       ['Tech and defense contractors', 'Professionals', 'Suburban commuters', 'Career-focused movers'],
        things_to_know: [
          'Tysons is the subject of a 30-year master plan to become a fully urban walkable city — progress is visible',
          'Home to major employers including Booz Allen Hamilton, Freddie Mac, and Capital One',
          'The Boro development near the Greensboro station is the clearest vision of what Tysons is becoming',
        ],
        lat: 38.9218, lng: -77.2283,
      },
      {
        name:               'Arlington',
        tagline:            'The ideal DC suburb — transit-rich, walkable, and minutes from the capital',
        walkability:        8,
        public_transit:     9,
        food_scene:         8,
        coffee_shops:       8,
        fitness:            9,
        faith:              7,
        outdoor_spaces:     8,
        nightlife:          7,
        cultural_diversity: 8,
        family_friendly:    8,
        affordability:      3,
        rent_min:           2200,
        rent_max:           3400,
        walk_score:         86,
        highlights: [
          'Metro Orange, Blue, and Silver lines — direct to downtown DC in under 20 minutes',
          'Rosslyn-Ballston corridor — one of the most successful transit-oriented development corridors in the US',
          'Excellent parks system — Four Mile Run Trail, Lubber Run, and Arlington National Cemetery',
        ],
        gaps: [
          'Among the most expensive suburbs in the country — pricing rivals many major cities',
          'Still feels suburban in character despite excellent transit — density is moderate',
        ],
        best_for:       ['Federal workers', 'Defense contractors', 'Young professionals', 'DC commuters who want space'],
        things_to_know: [
          'Amazon HQ2 is in National Landing / Crystal City, Arlington — reshaping the southern end of the corridor',
          'Virginia has no city income tax — Arlington residents save meaningfully compared to DC residents',
          'The Rosslyn-Ballston corridor is studied by urban planners worldwide as a model for suburban transit development',
        ],
        lat: 38.8816, lng: -77.0910,
      },
      {
        name:               'Reston',
        tagline:            'America\'s first planned community — trail-connected, tech-driven, and beautifully designed',
        walkability:        6,
        public_transit:     7,
        food_scene:         7,
        coffee_shops:       7,
        fitness:            8,
        faith:              7,
        outdoor_spaces:     9,
        nightlife:          5,
        cultural_diversity: 8,
        family_friendly:    9,
        affordability:      4,
        rent_min:           1900,
        rent_max:           2800,
        walk_score:         56,
        highlights: [
          'Over 55 miles of trails connecting directly to the Washington & Old Dominion (W&OD) Trail',
          'Reston Town Center — a walkable mixed-use district with restaurants, retail, and a beloved outdoor plaza',
          'Silver Line Metro at Reston Town Center and Wiehle-Reston East stations',
        ],
        gaps: [
          'Car needed for most errands outside Town Center and the immediate Metro station areas',
          'Quiet suburban character — evenings wind down early and nightlife is minimal',
        ],
        best_for:       ['Families', 'Tech workers', 'Outdoor enthusiasts', 'Remote workers'],
        things_to_know: [
          'Reston was founded in 1964 as America\'s first racially integrated planned community — its design values show',
          'Home to major tech companies including DXC Technology, Leidos, and the US Geological Survey',
          'Lake Anne Village — the original planned center of Reston — is a beautiful and underrated gem',
        ],
        lat: 38.9586, lng: -77.3570,
      },
    ],
  },

];

// ── Step 1: Fetch existing cities to avoid duplicates ─────────────────────────

console.log('Fetching existing cities from Supabase...');
const { data: existingCities, error: fetchErr } = await supabase
  .from('cities')
  .select('id, name');

if (fetchErr) {
  console.error('Failed to fetch cities:', fetchErr.message);
  process.exit(1);
}

const existingByName = Object.fromEntries((existingCities || []).map(c => [c.name, c.id]));

// ── Step 2: Insert new cities ─────────────────────────────────────────────────

const cityInserts = NEW_CITIES
  .filter(c => !existingByName[c.name])
  .map(c => ({
    name:               c.name,
    state:              c.state,
    status:             c.status,
    lat:                c.lat,
    lng:                c.lng,
    neighborhood_count: c.neighborhoods.length,
  }));

if (cityInserts.length > 0) {
  console.log(`Inserting ${cityInserts.length} new cities...`);
  const { data: inserted, error: cityErr } = await supabase
    .from('cities')
    .insert(cityInserts)
    .select('id, name');

  if (cityErr) {
    console.error('City insert failed:', cityErr.message);
    console.error('Details:', cityErr.details ?? cityErr);
    process.exit(1);
  }

  for (const c of inserted) {
    existingByName[c.name] = c.id;
    console.log(`  ✓ City: ${c.name} (id: ${c.id})`);
  }
} else {
  console.log('All cities already exist — skipping city inserts.');
}

// ── Step 3: Build neighborhood rows ──────────────────────────────────────────

const neighborhoodRows = [];

for (const city of NEW_CITIES) {
  const cityId = existingByName[city.name];
  if (!cityId) {
    console.error(`No city id found for "${city.name}" — skipping its neighborhoods.`);
    continue;
  }

  for (const n of city.neighborhoods) {
    neighborhoodRows.push({ city_id: cityId, ...n });
  }
}

// ── Step 4: Insert neighborhoods in batches ───────────────────────────────────

console.log(`\nInserting ${neighborhoodRows.length} neighborhoods...`);

const BATCH = 10;
let successCount = 0;

for (let i = 0; i < neighborhoodRows.length; i += BATCH) {
  const batch = neighborhoodRows.slice(i, i + BATCH);
  const { error: nErr } = await supabase
    .from('neighborhoods')
    .insert(batch);

  if (nErr) {
    console.error(`\nNeighborhood insert failed (batch ${i / BATCH + 1}):`, nErr.message);
    console.error('Details:', nErr.details ?? nErr);
    process.exit(1);
  }

  for (const r of batch) {
    console.log(`  ✓ ${r.name}`);
    successCount++;
  }
}

console.log(`\nDone. ${successCount} neighborhoods seeded across ${NEW_CITIES.length} cities.`);
