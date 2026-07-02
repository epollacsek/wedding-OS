-- Add address and preferred language to profiles
alter table profiles
  add column if not exists address      text,
  add column if not exists city         text,
  add column if not exists postcode     text,
  add column if not exists country      text,
  add column if not exists preferred_language text default 'English';
