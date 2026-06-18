# Aroos — Design System

> Read this before touching any UI. It tells you the rules and where to look — not how to re-implement what already exists.

---

## Brand

**Name:** Aroos  
**Tagline:** Your wedding, beautifully managed.  
**Tone:** Warm, trustworthy, organized. Never clinical, never playful to the point of feeling unserious.

---

## Palette — one place to change everything

All color values live in **`src/app/globals.css`** under `:root` as CSS custom properties prefixed `--aroos-*`.  
Tailwind token classes (`bg-aroos-chrome`, `bg-aroos-content`, etc.) are mapped from those variables in `@theme inline`.

**To retheme the platform: change the variables in `globals.css`. Do not touch components.**  
Never hardcode hex values in components — always use the token classes.

---

## Typography

Inter (loaded via `next/font/google` in `src/app/layout.tsx`). Never CDN, never system-ui.  
Base: `14px / 400`. Page titles: `37px / 700` (Bagoss with Inter fallback).  
The exact sizes for each context are visible in the reference components below.

---

## Shell — never rebuild this inside a page

The TopNav + Sidebar are fixed and shared. They are owned by:

- `src/components/layout/dashboard-shell.tsx` — layout + collapse state
- `src/components/layout/top-nav.tsx` — top bar
- `src/components/layout/left-nav.tsx` — sidebar (expanded + collapsed + hover flyouts)

Every route inside `src/app/(dashboard)/` inherits the shell automatically through `src/app/(dashboard)/layout.tsx`. Do not add nav, headers, or wrappers that duplicate shell elements inside a page.

---

## Reference components — copy these, don't invent

Before building any new page or component, read the relevant reference first.

| What you're building | Reference to read |
|---|---|
| Any dashboard page | `src/app/(dashboard)/attendance/guests/page.tsx` |
| Breadcrumb + page title | Same file — top of the JSX |
| Data table with filter bar | Same file — full pattern |
| Empty state | Same file — inside the table |

If a pattern you need doesn't exist yet, build it in the most obvious location and add it to this table.

---

## Rules every agent must follow

1. **Token classes only** — `bg-aroos-chrome`, `bg-aroos-content`, etc. Never `bg-[#CBBDEA]`.
2. **No `"use client"` on pages** — pages are Server Components. Only leaf components that need interactivity get it.
3. **No raw `<table>`** — use `shadcn/ui Table`.
4. **No modals outside `shadcn/ui Dialog`**.
5. **No inline styles** — Tailwind classes only.
6. **No `any` in TypeScript** — use `unknown` or define the type.
7. **No editing `src/components/ui/`** — those are shadcn primitives, treat as read-only.
8. **No scope creep** — build exactly what was asked. A page spec does not imply building sub-components that weren't requested.
9. **Every new DB table needs RLS** — `enable row level security` + at least one policy, always.
10. **`select('*')` is forbidden on tables with sensitive data** — name the columns you need.
