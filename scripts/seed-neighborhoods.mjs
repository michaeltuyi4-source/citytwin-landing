// scripts/seed-neighborhoods.mjs
// Seeds the Supabase `cities` and `neighborhoods` tables from data/neighborhoods.js.
//
// Run from project root:
//   node scripts/seed-neighborhoods.mjs
//
// Idempotent — fetches existing cities first, only inserts what's missing.
// Safe to re-run.

import { createClient } from '@supabase/supabase-js';
import { NEIGHBORHOODS } from '../data/neighborhoods.js';

// The service role key is required to bypass RLS for writes.
// It must NEVER be committed to git — pass it via environment variable:
//
//   SUPABASE_SERVICE_KEY=your_service_role_key node scripts/seed-neighborhoods.mjs
//
// Find it in: Supabase Dashboard → Settings → API → service_role (secret)
const SUPABASE_URL          = 'https://xdbsimwqyjttfihuvpal.supabase.co';
const SUPABASE_SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error(
    'Missing SUPABASE_SERVICE_KEY.\n' +
    'Run with: SUPABASE_SERVICE_KEY=your_key node scripts/seed-neighborhoods.mjs'
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ── Helpers ───────────────────────────────────────────────────────────────────

// Parse "$1,800–$2,300/mo (1BR)" → { rent_min: 1800, rent_max: 2300 }
// Handles en-dash (–) and hyphen (-). Returns nulls if unparseable.
function parseRent(rentRange) {
  const matches = [...rentRange.matchAll(/\$(\d[\d,]*)/g)];
  if (matches.length < 2) return { rent_min: null, rent_max: null };
  const toInt = m => parseInt(m[1].replace(/,/g, ''), 10);
  return { rent_min: toInt(matches[0]), rent_max: toInt(matches[1]) };
}

// "Charlotte, NC" → { name: "Charlotte", state: "NC" }
// "Montgomery County, MD" → { name: "Montgomery County", state: "MD" }
function parseCityName(cityName) {
  const parts = cityName.split(', ');
  const state = parts.pop();
  return { name: parts.join(', '), state };
}

// Average lat/lng across a city's neighborhoods as a rough center point
function cityCenter(neighborhoods) {
  const lat = neighborhoods.reduce((s, n) => s + n.coords.lat, 0) / neighborhoods.length;
  const lng = neighborhoods.reduce((s, n) => s + n.coords.lng, 0) / neighborhoods.length;
  return { lat: +lat.toFixed(6), lng: +lng.toFixed(6) };
}

// ── Step 1: Upsert cities ─────────────────────────────────────────────────────
// Fetch what's already there so we can match by name and get the real UUID.

console.log('Fetching existing cities from Supabase...');
const { data: existingCities, error: fetchErr } = await supabase
  .from('cities')
  .select('id, name');

if (fetchErr) {
  console.error('Failed to fetch cities:', fetchErr.message);
  process.exit(1);
}

const existingByName = Object.fromEntries((existingCities || []).map(c => [c.name, c.id]));

// Build city rows for any cities not yet in the table
const cityInserts = [];
for (const [, city] of Object.entries(NEIGHBORHOODS)) {
  const { name, state } = parseCityName(city.cityName);
  if (!existingByName[name]) {
    const center = cityCenter(city.neighborhoods);
    cityInserts.push({
      name,
      state,
      status:             'live',
      lat:                center.lat,
      lng:                center.lng,
      neighborhood_count: city.neighborhoods.length,
    });
  }
}

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
    console.log(`  ✓ City inserted: ${c.name} (id: ${c.id})`);
  }
} else {
  console.log('All cities already exist — skipping city inserts.');
}

// ── Step 2: Build and upsert neighborhood rows ────────────────────────────────

const neighborhoodRows = [];

for (const [, city] of Object.entries(NEIGHBORHOODS)) {
  const { name: cityName } = parseCityName(city.cityName);
  const cityId = existingByName[cityName];

  if (!cityId) {
    console.error(`No city id found for "${cityName}" — skipping its neighborhoods.`);
    continue;
  }

  for (const n of city.neighborhoods) {
    const { rent_min, rent_max } = parseRent(n.rentRange);
    const s = n.scores;

    neighborhoodRows.push({
      city_id:            cityId,
      name:               n.name,
      tagline:            n.tagline,
      // Score columns — map camelCase to snake_case
      walkability:        s.walkability        ?? null,
      public_transit:     s.transitAccess      ?? null,
      food_scene:         s.foodScene          ?? null,
      coffee_shops:       s.coffeeShops        ?? null,
      fitness:            s.fitness            ?? null,   // not in current data — null
      faith:              s.faith              ?? null,   // not in current data — null
      outdoor_spaces:     s.outdoorSpaces      ?? null,
      nightlife:          s.nightlife          ?? null,
      cultural_diversity: s.culturalDiversity  ?? null,
      family_friendly:    s.familyFriendly     ?? null,
      affordability:      s.affordability      ?? null,
      // Rent
      rent_min,
      rent_max,
      walk_score:         n.walkScore,
      // Arrays
      highlights:         n.highlights,
      gaps:               n.gaps,
      best_for:           n.bestFor,
      things_to_know:     null,   // not in source data
      // Coords
      lat:                n.coords.lat,
      lng:                n.coords.lng,
    });
  }
}

console.log(`\nUpserting ${neighborhoodRows.length} neighborhoods...`);

// Insert in batches of 10 to make any errors easier to pinpoint
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
    console.log(`  ✓ ${r.name} (city_id: ${r.city_id})`);
    successCount++;
  }
}

console.log(`\nDone. ${successCount} neighborhoods seeded successfully.`);
