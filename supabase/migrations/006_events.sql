create type event_type as enum ('wedding', 'corporate', 'birthday', 'social');

create table events (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  name          text not null,
  type          event_type not null,
  ceremony_date date,
  created_at    timestamptz default now() not null
);

alter table events enable row level security;

create policy "Users manage their own events"
  on events for all
  using (user_id = auth.uid());
