-- CityTwin — supabase/001_create_neighborhoods.sql
-- Reference schema for the cities and neighborhoods tables.
-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- Skip if tables already exist — this is kept in sync with the seed script
-- so the column names here are the source of truth.

-- ── Cities ────────────────────────────────────────────────────────────────────

create table if not exists public.cities (
  id                 uuid        primary key default gen_random_uuid(),
  name               text        not null,                  -- e.g. "Charlotte"
  state              text        not null,                  -- e.g. "NC"
  status             text        not null default 'live',   -- 'live' | 'coming_soon'
  lat                double precision,
  lng                double precision,
  neighborhood_count integer     not null default 0,
  created_at         timestamptz not null default now()
);

create unique index if not exists cities_name_idx on public.cities (name);

-- ── Neighborhoods ─────────────────────────────────────────────────────────────

create table if not exists public.neighborhoods (
  id                 uuid        primary key default gen_random_uuid(),
  city_id            uuid        not null references public.cities (id) on delete cascade,
  name               text        not null,
  tagline            text,

  -- Lifestyle scores (1–10, integer)
  walkability        integer,
  public_transit     integer,
  food_scene         integer,
  coffee_shops       integer,
  fitness            integer,
  faith              integer,
  outdoor_spaces     integer,
  nightlife          integer,
  cultural_diversity integer,
  family_friendly    integer,
  affordability      integer,

  -- Rent
  rent_min           integer,    -- monthly, USD (e.g. 1800)
  rent_max           integer,    -- monthly, USD (e.g. 2300)

  walk_score         integer,    -- Walk Score (0–100)

  -- Arrays of descriptive strings
  highlights         text[]      not null default '{}',
  gaps               text[]      not null default '{}',
  best_for           text[]      not null default '{}',
  things_to_know     text,

  -- Coordinates
  lat                double precision,
  lng                double precision,

  created_at         timestamptz not null default now()
);

create index if not exists neighborhoods_city_id_idx on public.neighborhoods (city_id);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Public read via anon key. Writes require service role key (server-side only).

alter table public.cities        enable row level security;
alter table public.neighborhoods enable row level security;

create policy "public read cities"
  on public.cities for select using (true);

create policy "public read neighborhoods"
  on public.neighborhoods for select using (true);
