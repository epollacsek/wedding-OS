# Wedding-OS Security Rules

Used by the Security agent on every /ship run. Any single failure = BLOCK.

## Authentication & Authorization
- Every new page or API route must verify the user is authenticated before rendering or responding
- Guest RSVP links must use the `rsvp_token` UUID from the households table — never guest IDs, names, or sequential numbers in URLs
- A logged-in user may only access data where `wedding_id` matches their own wedding — never another couple's data
- Admin-only actions (editing guest tags, internal notes, budget entries) must be gated server-side, not just hidden in the UI
- The `rsvp_token` must be generated with `gen_random_uuid()` in the DB or `crypto.randomUUID()` in code — never manually constructed

## Supabase / Database
- Every new table must have `alter table [name] enable row level security;` in its migration file
- Every RLS policy must be explicit — no table may have an implicit "allow all" policy
- The Supabase service role key (`SUPABASE_SERVICE_ROLE_KEY`) must never appear in client-side code or any `NEXT_PUBLIC_` env variable
- `createServerClient` from `@/lib/supabase/server` is used server-side only
- `createBrowserClient` from `@/lib/supabase/client` is used client-side only — never crossed

## Data Exposure
- No private keys, API tokens, or secrets may be prefixed with `NEXT_PUBLIC_`
- API routes and server actions must return only the fields the UI needs — no `select('*')` on tables with sensitive data
- Guest contact info (phone, address) must never appear in public-facing URLs, page titles, or open graph tags
- Error messages shown to users must not expose internal details (table names, stack traces, Postgres error codes)

## Input Validation
- All user-submitted fields must be validated server-side before any database write
- File uploads (spreadsheet import) must be checked for file type (CSV/XLSX only) and size limit (max 5MB) server-side
- Free-text fields (guest names, notes, announcements) must be sanitized — no raw HTML accepted

## RSVP Link Security
- Expired RSVP tokens must be rejected — check the wedding's RSVP deadline before accepting a response
- A guest must not be able to modify another household's RSVP by guessing or altering the token
- RSVP form submissions must validate that the household token matches the guests being updated
