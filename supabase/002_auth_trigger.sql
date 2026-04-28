-- CityTwin — supabase/002_auth_trigger.sql
-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- Creates the profiles table and an auth trigger that automatically inserts
-- a free-tier profile row whenever a user signs up via email or OAuth.

-- ── Profiles table ────────────────────────────────────────────────────────────

create table if not exists public.profiles (
  id         uuid        primary key references auth.users (id) on delete cascade,
  tier       text        not null default 'free' check (tier in ('free', 'premium')),
  created_at timestamptz not null default now()
);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Users may read only their own row.
-- Inserts are handled exclusively by the trigger (service definer context).
-- Upgrades are handled server-side with the service role key.

alter table public.profiles enable row level security;

create policy "users read own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

-- ── Trigger function ──────────────────────────────────────────────────────────
-- SECURITY DEFINER: executes with postgres-level privileges so it can write
-- to profiles regardless of RLS.  set search_path = public prevents
-- search-path injection attacks.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, tier)
  values (new.id, 'free');
  return new;
end;
$$;

-- ── Trigger ───────────────────────────────────────────────────────────────────
-- Fires AFTER INSERT on auth.users — covers email signup and all OAuth providers.

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
