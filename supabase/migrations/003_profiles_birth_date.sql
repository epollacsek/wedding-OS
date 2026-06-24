-- Add birth_date to profiles for future upsell/reminder features
alter table profiles add column if not exists birth_date date;
