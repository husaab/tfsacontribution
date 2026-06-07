# Registered Account Calculators — Frontend Redesign

**Date:** 2026-06-07
**Scope:** Frontend only. Full-site visual refresh of the TFSA, FHSA, and RRSP
calculators plus shared chrome (navbar, footer, page wrappers) and the
education sections. **No calculation logic changes** — everything in `src/lib/*`
stays exactly as-is.

---

## 1. Goal

Replace the generic shadcn/AI-default look with a distinctive, "Editorial
Warmth" interface that is:

- **Results-first** — the answer is the hero at the top of every calculator,
  not buried below the inputs.
- **Larger & more legible** — oversized display numerals, generous whitespace.
- **Mobile-first** — single-column by default; desktop is an enhancement.
- **Creative & non-generic** — variable display type, film-grain paper texture,
  nested "double-bezel" cards, a live data donut, tactile sliders, fluid motion.

## 2. Design Language — "Editorial Warmth"

Derived from the *Editorial Luxury* archetype, tuned to the existing warm
(terracotta, hue ≈ 41) palette.

### Typography
- **Display / numerals:** **Bricolage Grotesque** (weights 500/700/800),
  loaded via `next/font/google`. Used for hero figures, stat values, section
  headings, and the nav wordmark fallback.
- **UI / body:** **Geist** (existing). **Geist Mono** retained for any
  fine-print tabular needs.
- Hero figure scale: ~`clamp(3.5rem, 12vw, 6.5rem)`, `letter-spacing:-0.03em`,
  `font-variant-numeric: lining-nums tabular-nums` so digits don't jitter as
  the slider moves.

### Color tokens (added to `globals.css`, light theme only)
Built on the current OKLCH primary. New semantic vars:
- `--cream` (#FDFBF7) page canvas, `--paper` (#F6F0E7) raised surfaces
- `--ink` (#2A1A10) primary text, `--espresso` (#3D2515) headings
- `--terra` (#B5683C) / `--terra-deep` (#8A4A2B) accent + gradient stops
- `--sage` (#7C8471) optional secondary accent
- `--hairline` (#E7DDCF) borders
- Background = layered warm radial gradients bleeding from the corners over
  `--cream`, not a flat fill.

### Texture & depth
- **Film grain:** a single `position:fixed; inset:0; pointer-events:none;
  z-index` SVG-noise pseudo-element at ~4% opacity (`mix-blend-mode:multiply`).
  Fixed only — never on scrolling containers (performance guardrail).
- **Double-bezel (Doppelrand) cards:** every major card = an outer translucent
  "tray" (`rounded-[2rem]`, hairline ring, `p-1.5–2`, soft diffused shadow)
  wrapping an inner core (own background, `inset 0 1px` highlight,
  `rounded-[calc(2rem-…)]` concentric radius). No flat 1px-gray rectangles, no
  harsh dark drop shadows.
- Squircle radii throughout (`rounded-[1.25rem]`+).

### Motion (respects `prefers-reduced-motion`)
- Custom easing `cubic-bezier(0.32,0.72,0,1)` for all transitions; no `linear`
  / `ease-in-out`.
- Scroll-entry reveals (fade-up + slight blur) via `IntersectionObserver` —
  never scroll listeners.
- Magnetic CTA: `active:scale-[0.98]`, nested icon circle translates on hover.
- Animate `transform`/`opacity` only.

## 3. Layout — Results Hero

Each calculator page (mobile-first, single column, `max-w` centered):

```
[ Glass pill nav — floating, detached from top ]

┌─ HERO ────────────────────────────────────────────┐
│  • eyebrow pill: "TFSA · 2026"                     │
│  • kicker (Bricolage): "You can still contribute"  │
│  • FIGURE (huge): $95,500                          │
│  • context line: "of your $109,000 lifetime room"  │
│  • RoomDonut (used / limit, % in center)           │
│  • StatCard row (3): projected / contributed / …   │
└────────────────────────────────────────────────────┘

┌─ INPUTS (double-bezel panel) ──────────────────────┐
│  selects + RangeField rows (the redesigned slider) │
└────────────────────────────────────────────────────┘

[ Education sections — editorial cards ]
[ Warm footer ]
```

- **Desktop enhancement:** hero becomes a 2-column lede (figure left, donut
  card right); stat cards in a 3-up row. Inputs panel full width below.
- **Mobile:** figure → donut → stats (stacked / 2-up) → inputs. Nav collapses
  to the glass pill with a morphing hamburger → full-screen glass overlay with
  staggered link reveal.

## 4. Shared Components (new) — `src/components/ui/` + `src/components/calc/`

The current `SliderField` is **copy-pasted in all three calculators**. This
redesign consolidates shared UI into reusable pieces so the three calculators
become thin compositions:

| Component | Purpose | Key props |
|-----------|---------|-----------|
| `Bezel` | Double-bezel wrapper (outer tray + inner core) | `tone`, `radius`, `className` |
| `ResultsHero` | Hero shell: eyebrow, kicker, figure, context, donut slot, stat row | `eyebrow`, `kicker`, `figure`, `context`, `donut`, `stats[]`, `state` |
| `RoomDonut` | Conic-gradient donut showing `used/limit` + center % | `used`, `limit`, `label`, `centerValue` |
| `StatCard` | Double-bezel mini stat | `label`, `value`, `hint?`, `accent?` |
| `RangeField` | Redesigned slider + dollar input row (replaces 3× `SliderField`) | `label`, `value`, `max`, `step`, `onChange`, `subtitle?` |
| `Eyebrow` | Pill tag | `children` |
| `Field` | Labeled select/row wrapper for consistent input rhythm | `label`, children |

`RangeField` wraps the existing Radix `Slider` (keeps keyboard a11y) but
restyles the track (thick warm gradient fill, tactile knob) and shows the
current value in Bricolage tabular numerals. A shared `formatCurrency` helper
moves to `src/lib/format.ts` (currently duplicated per file).

## 5. Per-calculator hero mapping (data already exists in `lib/*`)

**TFSA** (`calculateTFSA` → `TFSAResult`)
- Figure: `room2026`; context: `of your {cumulativeLimit} cumulative room`
- Donut: `totalContributions / cumulativeLimit`
- Stats: Projected 2027 (`room2027`), Contributed to date, Withdrawn
- **Not-eligible state:** hero swaps to an informational variant showing
  `eligibilityYear` ("You'll start accumulating room in 2030") — no donut/stats.

**FHSA** (`calculateFHSA` → `FHSAResult`)
- Figure: `remainingRoom` (current year); context: `of $40,000 lifetime`
- Donut: `lifetimeContributions / FHSA_LIFETIME_LIMIT`
- Stats: Projected next year (`projectedRoomNextYear`), Lifetime contributed,
  Lifetime remaining
- Inputs: existing per-year contribution `RangeField`s (variable count).

**RRSP** (`calculateRRSP`) — an *optimizer*, not a room counter
- Figure: `maxContribution`; context: `limited by your RRSP room`
- Donut: `maxContribution / rrspRoom` (share of room used)
- Stats: Total net benefit, Tax savings, Benefit increase
- **Empty state** (income or room = 0): hero shows a prompt to enter inputs.
- METR breakdown tables move below the inputs, restyled as editorial tables
  inside a `Bezel` (no logic change).

## 6. Chrome

- **Navbar:** existing `tfsa-logo-official.png` placed inside the floating glass
  pill (`backdrop-blur`, hairline, detached `mt`). Active link uses
  `--terra-deep`. Mobile: morphing hamburger → full-screen glass overlay with
  staggered reveal. `backdrop-blur` only here (it's fixed/sticky).
- **Footer:** reworked from the flat solid-primary block to a warm espresso
  surface matching the system; same links/contact/about content.
- **Education sections** (`*-education.tsx`): restyle cards to `Bezel`,
  headings to Bricolage, tables to the editorial table style. Content
  unchanged.

## 7. Accessibility & guardrails

- Maintain label/`htmlFor` associations and Radix Slider keyboard support.
- Contrast: `--ink`/`--espresso` on `--cream` exceeds AA.
- `prefers-reduced-motion`: disable scroll reveals / transforms.
- No `h-screen` (use `min-h-[100dvh]`); no layout-triggering animations;
  `backdrop-blur` confined to fixed nav/overlay.

## 8. Out of scope

- Calculation logic (`src/lib/*`), routing, dark mode, data persistence,
  the "Save my result" CTA behavior (visual only / can link to print for now),
  and any backend/analytics work.

## 9. Build sequence (for the implementation plan)

1. Add Bricolage font + color/texture tokens to `globals.css` + `layout.tsx`.
2. Build shared primitives: `Bezel`, `Eyebrow`, `StatCard`, `RoomDonut`,
   `RangeField`, `Field`, `lib/format.ts`, reveal hook.
3. Build `ResultsHero` (with not-eligible / empty states).
4. Refit TFSA calculator → hero-first composition.
5. Refit FHSA, then RRSP (incl. editorial METR tables).
6. Restyle navbar, footer, page wrappers, education sections.
7. Pass: mobile QA, reduced-motion, contrast, slider keyboard check.
