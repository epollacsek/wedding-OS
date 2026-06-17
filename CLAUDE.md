# Wedding-OS (Aros) — Project Guide for Agents

## What this app is
A wedding planning super app branded "Aros". Couples use it to manage guests, communications, vendors, budget, and their wedding website. The flagship module is **Guest OS** (attendance management). Think Deel's UI/UX applied to wedding planning.

## Stack
- **Framework**: Next.js 16 (App Router, `src/` directory)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Database / Auth**: Supabase (Postgres + Row Level Security + Supabase Auth)
- **Email**: Resend
- **Testing**: Vitest + Testing Library

## File structure conventions
```
src/
  app/                    # Next.js App Router — route segments only
    (auth)/               # Auth pages (login, signup)
    (dashboard)/          # Authenticated app shell
      home/
      attendance/
        guests/
        comms/
      vendors/
      finance/
      website/
  components/
    ui/                   # shadcn/ui primitives (never edit these directly)
    [feature]/            # Feature-specific components, co-located with their route
  lib/
    supabase/             # Supabase client helpers (server.ts, client.ts, middleware.ts)
    utils.ts              # shadcn/ui utility (cn())
  types/                  # Shared TypeScript types
```

## UX/UI rules — follow these on every screen

### Layout & navigation
- Top-level macro navigation uses **tab-style nav** (inspired by Deel): Home, Attendance, Vendors, Finance, Website, More
- Each macro module has **sub-tabs** for its microservices
- Never use a sidebar for primary navigation — always top tabs

### Data tables
- All list/table views follow the **Deel "People" table pattern**: clean table with a filter bar above, header stats row above that, and a primary action button (e.g. "Add guests") top-right
- Use shadcn/ui `Table` component as the base
- Every table row must support: click to open detail view, row-level action menu (three-dot or hover actions)

### Forms & modals
- Use shadcn/ui `Dialog` for modals
- Multi-step flows use a stepped modal (progress indicator at top), not separate pages
- Inline progressive disclosure preferred over multiple screens (e.g. "+ Add plus one" expands inline)

### Color & typography
- Follow the shadcn/ui default theme — do not introduce custom color variables without updating `globals.css`
- Use `text-muted-foreground` for secondary/supporting text
- Status badges: use shadcn/ui `Badge` with semantic variants (default/secondary/destructive/outline)

### Component rules
- Always use shadcn/ui primitives when one exists (Button, Input, Select, Dialog, Table, Badge, Card, etc.)
- Never use inline styles — Tailwind classes only
- Client components (`"use client"`) only when strictly necessary (event handlers, hooks). Default to Server Components.

## Supabase patterns
- Server-side: use `createServerClient` from `@/lib/supabase/server`
- Client-side: use `createBrowserClient` from `@/lib/supabase/client`
- All DB queries go through Supabase client — no raw SQL outside of migrations
- Row Level Security is always on — never bypass with service role key in app code

## Testing conventions
- Test files live alongside the code they test: `component.test.tsx` next to `component.tsx`
- Use Vitest + Testing Library
- Test behavior (what the user sees/does), not implementation details
- Mock Supabase calls in unit tests

## Agent pipeline
This project uses a 4-stage pipeline via `/ship`. Agents hand off via `.pipeline/` folder files.
See `.claude/agents/` for individual agent definitions.
