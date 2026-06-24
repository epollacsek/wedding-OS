-- Drop the old weddings-based schema.
-- Replaced by events + event_members (migration 003).
-- households will be recreated with event_id FK in migration 003.

drop table if exists households;
drop table if exists weddings;
