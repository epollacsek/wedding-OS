@DESIGN.md

# Aroos — CLAUDE.md

## Project Overview

Aroos is a wedding planning super app. Couples use it to manage every aspect of their wedding in one place — guests, communications, vendors, budget, and their wedding website.

**Core goal:** Be the Deel of wedding planning. One product that replaces 10 disconnected spreadsheets and tools.

**Who uses it:** Engaged couples (and optionally their wedding planner or MOH as co-admins).

**6 macro modules:**
1. **Home** — dashboard/hub, surfaces what needs attention today
2. **Attendance** — guest list, communications, RSVP, accommodation, transportation
3. **Vendors** — vendor discovery, contracts, communication log
4. **Finance** — budget, expense tracking, document centralization
5. **Website** — wedding website builder, gift registry
6. **More** — upsell module, surfaces point solutions relevant to the couple's current planning stage

**Flagship module:** Attendance (Guest OS) — this is what gets built first and most deeply.

**Non-goals:**
- Not a social network (yet)
- Not a marketplace (yet — vendors are managed, not discovered through Aroos initially)
- Not a mobile app (web-first)
- Never hardcode couple-specific data — everything is multi-tenant from day one

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server Components, file-based routing, streaming |
| Language | TypeScript (strict) | No `any`, ever |
| Styling | Tailwind CSS v4 + shadcn/ui | We own the component code, fully customizable |
| Database | Supabase (Postgres + RLS) | Row Level Security enforces multi-tenancy at DB level |
| Auth | Supabase Auth | Integrated with RLS — auth uid maps directly to data access |
| Email | Resend | Transactional email for invitations, RSVP confirmations, reminders |
| Testing | Vitest + Testing Library | Fast, native ESM, works with React 19 |

**Package manager:** npm
**Node version:** 20+

---

## Development Workflow

```bash
npm run dev          # Start local dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Vitest in watch mode
npm run test:run     # Vitest single run (used by the Tester agent)
```

**Supabase:**
```bash
supabase start              # Start local Supabase (Docker required)
supabase db reset           # Wipe local DB and re-run all migrations
supabase db push            # Push migrations to remote project
supabase migration new      # Create a new migration file
```

**Testing philosophy:** Unit tests for UI behavior (what the user sees). Mock all Supabase calls. No integration tests against a real DB in CI.

**Commit convention:** conventional commits — `feat:`, `fix:`, `chore:`, `docs:`

**Branch convention:** `feature/[slug]` for all feature work. Never commit directly to `main`.

---

## Project Structure

```
src/
  app/                        # Next.js App Router — route segments only, no logic
    (auth)/                   # Public auth pages: /login, /signup
    (dashboard)/              # Authenticated shell — all protected routes live here
      layout.tsx              # Dashboard layout: top nav + module tabs
      home/
      attendance/
        guests/
        comms/
        accommodation/
        transportation/
      vendors/
      finance/
      website/
    rsvp/[token]/             # Public guest-facing RSVP flow (no auth required)
  components/
    ui/                       # shadcn/ui primitives — NEVER edit these directly
    layout/                   # Shell components: TopNav, ModuleTabs, etc.
    [feature]/                # Feature components co-located with their route
  lib/
    supabase/
      server.ts               # createServerClient — use in Server Components + Route Handlers
      client.ts               # createBrowserClient — use in Client Components only
    utils.ts                  # cn() utility from shadcn
  types/                      # Shared TypeScript interfaces
  middleware.ts               # Auth guard — redirects unauthenticated users to /login
supabase/
  migrations/                 # All schema changes as sequential SQL files
.claude/
  agents/                     # Planner, Coder, Tester, Security, Reviewer
  commands/                   # /ship orchestrator
  security-rules.md           # Security checklist used by the Security agent
```

---

## Coding Conventions & Rules

### Hard rules
- **Never use `any` in TypeScript** — use `unknown` and narrow it, or define the type
- **Never use inline styles** — Tailwind classes only
- **Never use a shadcn/ui component** — wrong, always USE shadcn/ui when one exists
- **Never use `"use client"`** unless the component genuinely needs browser APIs, event handlers, or hooks. Default is Server Component.
- **Never bypass RLS** with the service role key in application code — service role key is for migrations and admin scripts only
- **Never commit `.env.local`** — it is gitignored for a reason
- **Never add a feature the spec did not ask for** — scope is sacred

### Naming conventions
- Files: `kebab-case.tsx` for components, `camelCase.ts` for utilities
- Components: `PascalCase`
- Database tables: `snake_case` (plural: `guests`, `weddings`, `households`)
- TypeScript types: `PascalCase` in `src/types/`

### Error handling
- Server Components: use `try/catch`, return meaningful error UI — never let errors bubble to a blank screen
- Never expose Postgres error codes or stack traces to the user

### Performance
- Fetch data in Server Components — avoid waterfalls in Client Components
- Use `loading.tsx` for route-level suspense boundaries

---

## Architecture & Design Principles

### UI patterns
- **Left sidebar navigation** (Deel pattern) for macro modules — see `DESIGN.md` for exact specs
- **Deel "People" table pattern** for all data lists: header stats row → filter bar → table with row actions. Use shadcn `Table` as the base.
- **Deel "People" table pattern** for all data lists: header stats row → filter bar → table with row actions. Use shadcn `Table` as the base.
- **shadcn `Dialog`** for all modals. Multi-step flows use a stepped modal with a progress indicator — not separate pages.
- **Inline progressive disclosure** for optional fields (e.g. "+ Add plus one" expands inline)

### Data patterns
- Every table has a `wedding_id` foreign key — multi-tenancy is enforced at the DB level via RLS
- Household-level RSVP tokens: `gen_random_uuid()` — never sequential IDs in URLs
- Guest contact info (phone, address) never appears in URLs, page titles, or open graph tags

### Forbidden patterns
- No raw HTML when a shadcn component exists
- No `select('*')` on tables with sensitive data — always name the columns you need
- No client-side data fetching for initial page load — use Server Components

---

## Critical Gotchas / Anti-Patterns

These are mistakes Claude commonly makes in this codebase. Avoid them.

1. **Using `(dashboard)` as a URL path** — it's a Next.js route group (folder naming only). It never appears in the actual URL. Protect real paths like `/attendance`, `/home`, etc.
2. **Forgetting RLS on new tables** — every `create table` migration must be followed by `alter table [name] enable row level security` and at least one policy.
3. **Using `createBrowserClient` in a Server Component** — it will throw. Server Components always use `createServerClient` from `@/lib/supabase/server`.
4. **Adding `"use client"` at the top of a page file** — pages should be Server Components. Only leaf components that need interactivity get `"use client"`.
5. **Building outside the spec scope** — if the spec says "guest list table", do not also build the guest profile detail view. One feature per `/ship` run.
6. **Shadcn components in `src/components/ui/`** — never edit these. They are owned by shadcn and will be overwritten on updates. Build feature components in `src/components/[feature]/`.

---

## References

Read these files when relevant — do not duplicate their content here:

- `DESIGN.md` — brand identity, color palette, typography, tone of voice
- `.claude/security-rules.md` — full security checklist (read on every `/ship` run)
- `.claude/agents/` — individual agent definitions for the `/ship` pipeline
- `supabase/migrations/` — current DB schema (always read before writing a new migration)
