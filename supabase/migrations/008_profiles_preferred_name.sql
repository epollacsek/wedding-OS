-- Add preferred name to profiles (display name distinct from legal name)
alter table profiles add column if not exists preferred_name text;
