-- Base schema for Wedding-OS (Aros)
-- Run this first before any feature migrations

-- Weddings table — one row per wedding, owned by a user
create table if not exists weddings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade not null,
  partner_1_name text not null,
  partner_2_name text,
  wedding_date date,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table weddings enable row level security;

create policy "Users manage their own wedding"
  on weddings for all
  using (owner_id = auth.uid());

-- Households table — groups of guests who share an invite/RSVP link
create table if not exists households (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid references weddings(id) on delete cascade not null,
  name text not null, -- e.g. "The Smith Family"
  rsvp_token uuid default gen_random_uuid() not null unique, -- unguessable RSVP link token
  created_at timestamptz default now() not null
);

alter table households enable row level security;

create policy "Users manage households for their wedding"
  on households for all
  using (
    wedding_id in (
      select id from weddings where owner_id = auth.uid()
    )
  );
