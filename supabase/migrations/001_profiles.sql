-- User profiles — extends auth.users with persona type and contact info
-- CPF is Brazil's individual taxpayer registry number (11 digits, validated client-side)
-- When expanding to other countries, add tax_id_type column alongside cpf

create type persona_type as enum ('organizer', 'planner', 'vendor', 'worker');

create table profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  persona_type persona_type not null,
  full_name    text not null,
  whatsapp     text not null,
  cpf          text,          -- organizer only; null for planner/vendor/worker
  created_at   timestamptz default now() not null
);

alter table profiles enable row level security;

create policy "Users manage their own profile"
  on profiles for all
  using (id = auth.uid());
