# Aroos — Design System

> Shell pattern inspired by Deel's platform. Every agent reads this before touching any UI.

---

## Brand

**Name:** Aroos
**Tagline:** Your wedding, beautifully managed.
**Tone:** Warm, trustworthy, organized. Never clinical, never playful to the point of feeling unserious.

---

## Typography

| Role | Value |
|---|---|
| Font family | `Inter, Arial, Helvetica, sans-serif` |
| Base size | `14px` |
| Base weight | `400` |
| Medium weight | `500` |
| Semibold weight | `600` |
| Line height | `1.5` |

**Rules:**
- Inter is loaded via `next/font/google` — never CDN
- Never use system-ui or generic sans as primary
- Page titles: `24px / 600`
- Section headers: `16px / 600`
- Labels / nav items: `14px / 400` (active: `500`)
- Micro labels (section group headers in sidebar): `12px / 400`

---

## Color Palette

All values extracted directly from Deel's live DOM.

### Base
| Token | Hex | Usage |
|---|---|---|
| `--color-text` | `#1B1B1B` | All body text, icons |
| `--color-text-muted` | `rgba(27,27,27,0.5)` | Placeholder, secondary text |
| `--color-white` | `#FFFFFF` | Main content bg, active sub-item bg |
| `--color-bg-page` | `#FFFFFF` | Main content area |

### Sidebar
| Token | Hex | Usage |
|---|---|---|
| `--color-sidebar-bg` | `#F7F5F2` | Left nav background (warm cream) |
| `--color-sidebar-hover` | `rgba(27,27,27,0.05)` | Nav item hover |
| `--color-sidebar-active-module` | `rgba(89,56,183,0.08)` | Active module row bg |
| `--color-sidebar-active-child` | `#FFFFFF` | Active sub-item bg (white pill) |

### Accent (Purple)
| Token | Hex | Usage |
|---|---|---|
| `--color-accent` | `#5938B7` | Active icons, primary buttons, links |
| `--color-accent-light` | `rgba(246,240,254,0.5)` | Purple tint surfaces |
| `--color-accent-hover` | `rgba(89,56,183,0.12)` | Button hover |

### Top Bar
| Token | Hex | Usage |
|---|---|---|
| `--color-topbar-bg` | `#FFFFFF` | Top bar background |
| `--color-topbar-border` | `rgba(0,0,0,0.06)` | Bottom border of top bar |
| `--color-search-bg` | `rgba(0,0,0,0.04)` | Search bar background |
| `--color-search-bg-hover` | `rgba(0,0,0,0.06)` | Search bar hover |

### Utility
| Token | Hex | Usage |
|---|---|---|
| `--color-border` | `rgba(0,0,0,0.06)` | Dividers, card borders |
| `--color-shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | Active sub-item shadow, cards |

---

## Shell Layout

```
┌─────────────────────────────────────────────────────────┐
│  TopNav — 56px tall, full width, white bg               │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  LeftNav     │  Main Content                            │
│  220px wide  │  flex-1, white bg, overflow-y-auto       │
│  #F7F5F2 bg  │                                          │
│              │                                          │
│  (collapses  │                                          │
│  to 60px)    │                                          │
└──────────────┴──────────────────────────────────────────┘
```

---

## TopNav

**Height:** `56px` (`h-14`)
**Background:** `#FFFFFF`
**Bottom border:** `1px solid rgba(0,0,0,0.06)`

### Regions (left → right)
1. **Logo** — `"aroos."` text, `font-semibold`, `text-xl`, fixed width `200px`
2. **Search bar** — centered, `max-w-xl`, `flex-1`
   - Background: `rgba(0,0,0,0.04)`, hover: `rgba(0,0,0,0.06)`
   - Border-radius: `8px` (`rounded-lg`)
   - Height: `36px` (`h-9`)
   - Placeholder: `"Search guests, vendors, tasks..."`
   - Keyboard shortcut badge: `⌘K`
3. **Icon cluster** — right side, `gap-1`
   - Icons: HelpCircle, Settings, Bell — each `size-9` circle button
   - Avatar: `32x32`, `border-radius: 50%`, purple bg tint
   - Avatar shows initials + name + chevron

---

## LeftNav

**Width:** `220px` (expanded) / `60px` (collapsed)
**Background:** `#F7F5F2`
**Transition:** `duration-200` width animation

### Module list (Aroos)
| Module | Icon | Sub-items |
|---|---|---|
| Home | `Home` | — |
| Attendance | `Users` | Guests, Communications, Accommodation, Transportation |
| Vendors | `Store` | *(empty for now)* |
| Finance | `CreditCard` | *(empty for now)* |
| Website | `Globe` | *(empty for now)* |
| More | `MoreHorizontal` | — |

### Nav item anatomy
```
[icon 16px]  [label text]  [chevron — only if has children]
```

**Default state:**
- Padding: `7px 12px` (`py-[7px] px-3`)
- Margin: `0 8px` (`mx-2`)
- Border-radius: `8px` (`rounded-lg`)
- Color: `#1B1B1B`, weight `400`
- Icon color: `rgba(27,27,27,0.6)`

**Hover state:**
- Background: `rgba(27,27,27,0.05)`

**Active module (has children, expanded):**
- Background: `rgba(89,56,183,0.08)`
- Icon color: `#5938B7`
- Label weight: `500`

**Active module (no children):**
- Background: `#FFFFFF` (white pill)
- Box shadow: subtle `0 1px 3px rgba(0,0,0,0.08)`
- Label weight: `500`
- Icon color: `#5938B7`

### Sub-items
- Indented: `pl-9` (aligns with label text of parent)
- Padding: `6px 12px`
- Border-radius: `8px`
- Font: `14px / 400`
- Color: `rgba(27,27,27,0.7)`

**Active sub-item:**
- Background: `#FFFFFF` (white pill)
- Color: `#1B1B1B`
- Weight: `500`
- Shadow: `0 1px 3px rgba(0,0,0,0.08)`

### Collapse button
- Bottom of sidebar, above a `1px` divider
- `32x32` icon button — ChevronLeft (expanded) / ChevronRight (collapsed)
- Color: `rgba(27,27,27,0.4)`

---

## Spacing Scale

| Name | Value | Usage |
|---|---|---|
| xs | `4px` | Tight padding inside badges |
| sm | `8px` | Gap between icon and label |
| md | `12px` | Nav item horizontal padding |
| lg | `16px` | Card internal padding |
| xl | `24px` | Section gaps |
| 2xl | `32px` | Page content padding |

---

## Border Radius

| Name | Value | Usage |
|---|---|---|
| sm | `6px` | Badges, tags |
| DEFAULT | `8px` | Nav items, inputs, cards |
| lg | `12px` | Modals, large cards |
| pill | `9999px` | Full-pill buttons |

---

## Buttons

**Primary:**
- Background: `#5938B7`
- Color: `#FFFFFF`
- Height: `40px`
- Border-radius: `8px`
- Font: `14px / 500`
- Hover: `#4A2FA0`

**Secondary:**
- Background: `rgba(27,27,27,0.06)`
- Color: `#1B1B1B`
- Same sizing as primary

**Icon button:**
- Size: `36x36px`
- Border-radius: `8px`
- Hover: `rgba(27,27,27,0.05)`

---

## Data Table (Deel "People" pattern)

Every list view follows this exact structure:

```
┌─────────────────────────────────────────────────────┐
│  Page title + primary action button (top right)     │
├─────────────────────────────────────────────────────┤
│  Stats row: [Total] [RSVP'd] [Pending] [Declined]   │
├─────────────────────────────────────────────────────┤
│  Filter bar: [Search] [Filter chips] [View toggle]  │
├─────────────────────────────────────────────────────┤
│  Table (shadcn Table)                               │
│  — Checkbox | Name/avatar | Group | Tags | Status   │
│  — Row hover: rgba(0,0,0,0.02)                      │
│  — Row actions on hover (right side)                │
└─────────────────────────────────────────────────────┘
```

Use `shadcn/ui Table` as the base. Never build a raw `<table>`.

---

## Modals

- Use `shadcn/ui Dialog`
- Border-radius: `12px`
- Padding: `24px`
- Multi-step flows: stepped modal with a progress indicator at the top — not separate pages
- Backdrop: `rgba(0,0,0,0.4)`

---

## Icons

Library: `lucide-react` (already installed)
Default size: `16px` (`size-4`)
Nav icons: `16px` (`size-4`)
Topbar icons: `20px` (`size-5`)
Action icons: `16px` (`size-4`)

---

## Implementation Files

| Component | Path |
|---|---|
| TopNav | `src/components/layout/top-nav.tsx` |
| LeftNav | `src/components/layout/left-nav.tsx` |
| Dashboard shell | `src/app/(dashboard)/layout.tsx` |
| Global CSS tokens | `src/app/globals.css` |
| Font (Inter) | `src/app/layout.tsx` via `next/font/google` |
