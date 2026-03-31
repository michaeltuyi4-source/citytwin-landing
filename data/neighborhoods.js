// CityTwin — neighborhoods.js
// Stage 1 data: manually researched, hardcoded
// Cities: Charlotte NC, Baltimore MD, Chicago IL
// Scores are 1–10. Sources: Walk Score, Niche, Apartment List, RentCafe, local guides (2024–2025)

const NEIGHBORHOODS = {

  charlotte: {
    cityName: "Charlotte, NC",
    cityNote: "Sun Belt boomtown. Car-dependent overall but pockets of strong walkability near the light rail.",
    neighborhoods: [
      {
        id: "south-end",
        name: "South End",
        tagline: "Charlotte's live-work-play hub",
        scores: {
          walkability: 8,
          transitAccess: 9,     // LYNX Blue Line light rail runs through it
          foodScene: 9,         // Breweries, restaurants dense along Rail Trail
          coffeeShops: 8,
          outdoorSpaces: 7,     // Rail Trail greenway, parks nearby
          nightlife: 9,
          familyFriendly: 5,    // Young professional skew, not quiet
          culturalDiversity: 6,
          affordability: 4,     // 1BR avg ~$2,000/mo — premium pricing
          quietResidential: 3,
        },
        rentRange: "$1,800–$2,300/mo (1BR)",
        walkScore: 82,
        highlights: [
          "LYNX Blue Line light rail — direct to Uptown in minutes",
          "Charlotte Rail Trail — 3.5 miles of greenway for walking and cycling",
          "Dense brewery and restaurant scene (NoDa Brewing, Sycamore, Free Range)",
          "Modern apartment buildings with rooftop amenities",
        ],
        gaps: [
          "Expensive — one of Charlotte's priciest rental markets",
          "Loud and busy on weekends — not for those wanting quiet",
          "Limited green space beyond the Rail Trail",
        ],
        bestFor: ["Young professionals", "Remote workers", "Social movers", "No-car lifestyle"],
        coords: { lat: 35.2076, lng: -80.8567 },
      },
      {
        id: "noda",
        name: "NoDa (North Davidson)",
        tagline: "Charlotte's arts and music district",
        scores: {
          walkability: 7,
          transitAccess: 7,     // Blue Line extension added a stop
          foodScene: 8,         // Independent restaurants, food halls
          coffeeShops: 8,       // Strong indie coffee culture
          outdoorSpaces: 5,
          nightlife: 8,         // Music venues, gallery crawls
          familyFriendly: 5,
          culturalDiversity: 7,
          affordability: 6,     // 1BR avg ~$1,775/mo — more reasonable than South End
          quietResidential: 4,
        },
        rentRange: "$1,500–$1,900/mo (1BR)",
        walkScore: 74,
        highlights: [
          "Charlotte's creative hub — murals, galleries, live music every weekend",
          "Blue Line light rail stop added in recent expansion",
          "Strong indie coffee and food scene (Smelly Cat Coffee, Haberdish)",
          "More affordable than South End while offering similar energy",
        ],
        gaps: [
          "Less polished than South End — some areas still developing",
          "Walkability drops sharply off the main strip",
          "Limited green space and parks",
        ],
        bestFor: ["Creatives", "Artists", "Music lovers", "Budget-conscious young professionals"],
        coords: { lat: 35.2368, lng: -80.8275 },
      },
      {
        id: "dilworth",
        name: "Dilworth",
        tagline: "Historic charm, walkable streets, top dining",
        scores: {
          walkability: 8,       // Walk Score 78 — Charlotte's 5th most walkable
          transitAccess: 6,
          foodScene: 8,         // 174 restaurants/bars/cafes, upscale dining
          coffeeShops: 7,
          outdoorSpaces: 8,     // Latta Park, Freedom Park nearby
          nightlife: 6,
          familyFriendly: 8,    // Historic neighborhood, community events
          culturalDiversity: 5,
          affordability: 3,     // Among Charlotte's most expensive — avg ~$1,950/mo
          quietResidential: 8,
        },
        rentRange: "$1,800–$2,200/mo (1BR)",
        walkScore: 78,
        highlights: [
          "Charlotte's first suburb (1890) — tree-lined streets, Craftsman bungalows",
          "Latta Park and Freedom Park within walking distance",
          "Strong dining scene (300 East, Sunflour Baking, Ed's Tavern)",
          "Community events year-round (Dilworth Jubilee, Home Tour)",
        ],
        gaps: [
          "Premium pricing — one of Charlotte's most expensive neighborhoods",
          "Quieter nightlife compared to South End or NoDa",
          "Car still needed for some errands",
        ],
        bestFor: ["Families", "Professionals wanting calm + access", "Dog owners", "History buffs"],
        coords: { lat: 35.2015, lng: -80.8548 },
      },
    ],
  },

  montgomery: {
    cityName: "Montgomery County, MD",
    cityNote: "DC suburb corridor along I-270. One of the most diverse counties in the US. MARC train and Metro Red Line connect to DC. Strong schools, biotech/federal job base.",
    neighborhoods: [
      {
        id: "rockville-town-center",
        name: "Rockville Town Center",
        tagline: "Montgomery County's most walkable urban core",
        scores: {
          walkability: 8,       // Best walkability in Rockville — Walk Score ~80 near Town Center
          transitAccess: 9,     // Red Line Metro station at heart of neighborhood
          foodScene: 7,         // Growing restaurant scene — Kusshi Sushi, Little Miner Taco, Fork & Kitchen
          coffeeShops: 7,       // Trader Joe's opened 2025; cafes and chains walkable
          outdoorSpaces: 6,     // Some green space, parks accessible but not abundant
          nightlife: 6,         // More dining-focused than bar scene
          familyFriendly: 7,    // MCPS schools, family amenities nearby
          culturalDiversity: 8, // One of most diverse areas in Montgomery County
          affordability: 5,     // 1BR avg ~$2,031–$2,048/mo — mid-range for area
          quietResidential: 6,
        },
        rentRange: "$1,800–$2,400/mo (1BR)",
        walkScore: 80,
        highlights: [
          "Rockville Metro Station (Red Line) — DC downtown in under 30 minutes",
          "Rockville Town Center / 'The Square' — walkable dining, retail, entertainment hub",
          "Trader Joe's opened summer 2025 — grocery shopping now fully walkable",
          "Montgomery County's highest concentration of restaurants and bars in one area",
          "Direct access to entire DC Metro system for city exploration on weekends",
        ],
        gaps: [
          "Outside Town Center core, car still needed for many errands",
          "Nightlife quieter than DC neighborhoods — more of a dinner-and-home vibe",
          "Premium rents for the area — priced above Germantown and parts of Gaithersburg",
        ],
        bestFor: ["DC commuters", "Young professionals", "Car-free or car-light movers", "Urban suburbanites"],
        coords: { lat: 39.0840, lng: -77.1528 },
      },
      {
        id: "kentlands-gaithersburg",
        name: "Kentlands, Gaithersburg",
        tagline: "America's New Urbanism model — walkable, community-first, beautifully designed",
        scores: {
          walkability: 8,       // Nationally recognized New Urbanist design — daily needs within 5–10 min walk
          transitAccess: 5,     // Bus service + MARC Brunswick Line nearby; no Metro directly
          foodScene: 7,         // Kentlands Market Square, Downtown Crown, RIO — solid suburban dining
          coffeeShops: 7,       // Whole Foods, Giant, Starbucks all walkable within neighborhood
          outdoorSpaces: 8,     // Lake Helene, Inspiration Lake, Little Quarry Park, Seneca Creek State Park nearby
          nightlife: 5,         // Quiet suburban evenings — most people drive to Rockville or Bethesda
          familyFriendly: 10,   // MCPS top-rated schools, pools, community events, design built for families
          culturalDiversity: 7, // Gaithersburg among most diverse cities in Maryland
          affordability: 6,     // More affordable than Rockville Town Center; home prices $600K–$1M+
          quietResidential: 9,  // Quiet, planned community — designed for calm suburban life
        },
        rentRange: "$1,700–$2,200/mo (1BR apt); homes $600K–$1M+",
        walkScore: 72,
        highlights: [
          "Nationally recognized New Urbanism design — walkable streets, front porches, hidden parking",
          "Lake Helene and Inspiration Lake — paved pathways, waterside walks within the neighborhood",
          "Kentlands Market Square — Whole Foods, restaurants, boutiques, movie theater all walkable",
          "Community events year-round: Kentlands 5K, Community Day, Halloween Rocks, holiday festivals",
          "MCPS schools — among the highest-rated public school districts in the nation",
          "25 minutes to downtown DC by car; MARC train option nearby",
        ],
        gaps: [
          "Transit-dependent on bus + MARC — no Metro station within the neighborhood",
          "Nightlife is minimal — evenings are quiet by design",
          "Home prices are high — ownership is expensive even by Montgomery County standards",
        ],
        bestFor: ["Families", "Community-focused movers", "Those valuing walkable suburban design", "Remote workers wanting quiet"],
        coords: { lat: 39.1290, lng: -77.2297 },
      },
      {
        id: "germantown",
        name: "Germantown",
        tagline: "Most affordable in Montgomery County — space, value, and nature access",
        scores: {
          walkability: 5,       // Mostly car-dependent; strip mall commercial corridors
          transitAccess: 5,     // MARC Germantown station; Shady Grove Metro ~9 miles south
          foodScene: 6,         // Scattered international gems — Ethiopian, Peruvian, Latin strip malls
          coffeeShops: 5,       // Chain-heavy; few independent options
          outdoorSpaces: 9,     // Seneca Creek State Park, Black Hill Regional Park, Black Rock Mill
          nightlife: 3,         // Very quiet — limited bar scene; most nightlife is further south
          familyFriendly: 9,    // MCPS schools, community centers, safe, newer homes, parks
          culturalDiversity: 9, // One of Montgomery County's most diverse communities
          affordability: 8,     // 1BR avg ~$1,739/mo — most affordable of the three
          quietResidential: 9,  // Sprawling, newer suburban homes — very quiet
        },
        rentRange: "$1,500–$2,000/mo (1BR)",
        walkScore: 46,
        highlights: [
          "Most affordable option in Montgomery County — $1,000+/mo less than Rockville in some cases",
          "Seneca Creek State Park and Black Hill Regional Park — exceptional outdoor recreation",
          "Lancaster County Dutch Market — beloved farmers market with fresh PA produce and baked goods",
          "Butler's Orchard nearby — apple/pumpkin picking, seasonal activities",
          "Black Rock Center for the Arts — free exhibits, community cultural programming",
          "Highly diverse community — strong international food culture in local strip malls",
        ],
        gaps: [
          "Car is essential — walkability among the lowest of the three",
          "I-270 commute to DC can be brutal — 45–60 minutes in peak traffic",
          "Nightlife essentially non-existent — quiet community by nature",
          "Food scene is good but scattered — requires driving to find the best spots",
        ],
        bestFor: ["Families wanting space and value", "Outdoor enthusiasts", "Those prioritizing affordability", "Remote workers needing quiet"],
        coords: { lat: 39.1732, lng: -77.2717 },
      },
    ],
  },

  chicago: {
    cityName: "Chicago, IL",
    cityNote: "America's most walkable major inland city. World-class food, strong transit, distinct neighborhood personalities.",
    neighborhoods: [
      {
        id: "wicker-park",
        name: "Wicker Park",
        tagline: "Chicago's most walkable creative neighborhood",
        scores: {
          walkability: 10,      // Walk Score 96 — one of highest in all of Chicago
          transitAccess: 9,     // CTA Blue Line, multiple bus routes
          foodScene: 9,         // Dense, diverse, acclaimed restaurant scene
          coffeeShops: 9,       // Strong indie coffee culture (The Wormhole, etc.)
          outdoorSpaces: 7,     // 606 Trail, Wicker Park itself
          nightlife: 9,
          familyFriendly: 6,
          culturalDiversity: 7,
          affordability: 5,     // 1BR avg ~$2,100–$2,400 — mid-to-high Chicago range
          quietResidential: 4,
        },
        rentRange: "$1,900–$2,500/mo (1BR)",
        walkScore: 96,
        highlights: [
          "Walk Score of 96 — second highest in all of Chicago",
          "The 606 Trail — elevated greenway for cycling and walking through the neighborhood",
          "Milwaukee and Damen Avenues — boutiques, record stores, cafes, bars",
          "CTA Blue Line — direct to downtown Loop in ~15 min",
          "Time Out named the area one of the world's coolest neighborhoods (2024)",
        ],
        gaps: [
          "Expensive by Chicago standards — premium for the lifestyle",
          "Can be noisy on weekends — active nightlife spills onto streets",
          "Parking difficult — best approached car-free",
        ],
        bestFor: ["Creatives", "Remote workers", "Foodies", "No-car lifestyle", "Young professionals"],
        coords: { lat: 41.9088, lng: -87.6788 },
      },
      {
        id: "west-loop",
        name: "West Loop",
        tagline: "Chicago's restaurant row and professional powerhouse",
        scores: {
          walkability: 9,       // Walk Score 96
          transitAccess: 9,     // CTA Blue and Green/Pink Lines
          foodScene: 10,        // Randolph Street 'Restaurant Row' — Michelin-starred dining
          coffeeShops: 8,
          outdoorSpaces: 6,     // Mary Bartelme Park, limited green space
          nightlife: 8,
          familyFriendly: 5,
          culturalDiversity: 6,
          affordability: 3,     // Avg rent $2,922 — among Chicago's most expensive
          quietResidential: 4,
        },
        rentRange: "$2,500–$3,400/mo (1BR)",
        walkScore: 96,
        highlights: [
          "Randolph Street 'Restaurant Row' — some of Chicago's best dining",
          "Fulton Market District — Google, McDonald's HQ, major employers nearby",
          "CTA Blue and Green/Pink Lines — excellent downtown access",
          "Loft conversions and high-rises with skyline views",
          "Fastest-growing and most in-demand neighborhood in Chicago",
        ],
        gaps: [
          "Most expensive neighborhood in Chicago — significant premium",
          "Less residential feel — more business/entertainment district energy",
          "Green space limited compared to lakefront neighborhoods",
        ],
        bestFor: ["Finance/tech professionals", "Foodies", "Career-focused movers", "Urbanists"],
        coords: { lat: 41.8831, lng: -87.6478 },
      },
      {
        id: "lincoln-park",
        name: "Lincoln Park",
        tagline: "Chicago's most walkable family-friendly neighborhood",
        scores: {
          walkability: 9,       // Walk Score 94 — top neighborhood in Chicago
          transitAccess: 8,     // Multiple CTA lines and bus routes
          foodScene: 9,         // 400+ restaurants within walking distance
          coffeeShops: 9,       // Every major and indie option represented
          outdoorSpaces: 10,    // Lincoln Park itself — 1,200 acres, zoo, lakefront
          nightlife: 7,
          familyFriendly: 10,   // Top-rated schools, zoo, parks — best in Chicago
          culturalDiversity: 6,
          affordability: 4,     // Premium pricing for the lifestyle
          quietResidential: 7,
        },
        rentRange: "$1,900–$2,800/mo (1BR)",
        walkScore: 94,
        highlights: [
          "Lincoln Park — 1,200-acre park with free zoo, lakefront trails, beach",
          "400+ restaurants within walking distance — every cuisine represented",
          "Top-rated public schools — best family neighborhood in Chicago",
          "Trader Joe's, Whole Foods, Mariano's all walkable",
          "DePaul University adds youthful energy; historic brownstones add character",
        ],
        gaps: [
          "Premium pricing — comparable to West Loop",
          "Can feel too polished / less gritty than Wicker Park or Logan Square",
          "High competition for housing — moves quickly on the market",
        ],
        bestFor: ["Families", "Outdoor enthusiasts", "Dog owners", "Those wanting calm + access"],
        coords: { lat: 41.9214, lng: -87.6513 },
      },
    ],
  },

};

// Lifestyle category definitions — used by scoring.js to match user priorities
const LIFESTYLE_CATEGORIES = [
  { id: "walkability",       label: "Walkability",          description: "Get errands done on foot" },
  { id: "transitAccess",     label: "Public transit",       description: "Buses, trains, light rail" },
  { id: "foodScene",         label: "Food scene",           description: "Restaurants, variety, quality" },
  { id: "coffeeShops",       label: "Coffee shops",         description: "Cafes to work from or meet" },
  { id: "outdoorSpaces",     label: "Outdoor spaces",       description: "Parks, trails, green space" },
  { id: "nightlife",         label: "Nightlife",            description: "Bars, music, evening energy" },
  { id: "familyFriendly",    label: "Family-friendly",      description: "Schools, safety, community" },
  { id: "culturalDiversity", label: "Cultural diversity",   description: "International food, community" },
  { id: "affordability",     label: "Affordability",        description: "Lower rent relative to city" },
  { id: "quietResidential",  label: "Quiet & residential",  description: "Calm streets, less noise" },
];

// Priority weight multipliers — set by user in Step 2
const PRIORITY_WEIGHTS = {
  "must-have":    3,
  "important":    2,
  "nice-to-have": 1,
};

export { NEIGHBORHOODS, LIFESTYLE_CATEGORIES, PRIORITY_WEIGHTS };
