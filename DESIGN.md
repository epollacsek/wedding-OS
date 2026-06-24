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
Base: `14px / 400`. Page titles: `43px / 700` (Bagoss with Inter fallback).  
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
| Login / auth entry page | `src/app/(auth)/login/page.tsx` |

If a pattern you need doesn't exist yet, build it in the most obvious location and add it to this table.

---

## Login Page — Preserve The Gamma-Style Card Wall

The login page is an intentionally custom auth experience. It is owned by:

- `src/app/(auth)/login/page.tsx` — layout, form, placeholder card data, responsive positioning
- `src/app/globals.css` — `login-card-drift` keyframes and `.login-card-track*` animation classes

Do not replace it with a centered auth card, split panel, dashboard shell, or generic shadcn login screen.

Required behavior:

1. The page uses the same global Aroos lavender-to-warm-off-white background gradient as the rest of the product.
2. The left side contains the login session: `Sign in` title, email input, password input, forgot password link, sign-in button, sign-up link, and placeholder brand mark.
3. The right side is a continuous tilted wall of placeholder event/template cards. It should feel like one flowing canvas, not a divided right panel.
4. Cards move upward continuously using the shared CSS animation classes in `globals.css`. Do not rely on inline styles for animation timing.
5. The card wall fades under the login side using a mask so the form remains readable. Do not add a hard vertical divider.
6. At split-screen/tablet widths, keep the same composition but reduce card size and push the wall visually right so the login session does not become crowded.
7. Card data is placeholder content. It can be replaced later with generated event cards, but preserve the layout and animation system.

When adjusting this page, prefer small positional changes to the existing wrapper classes. Do not rebuild the page from scratch.

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
