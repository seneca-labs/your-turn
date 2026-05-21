# Screens / Pages reference

Quick brief on every page in the repo. Use this to verify what should exist, what each surface contains, and which file maps to which route.

App router → every route below maps to `app/<route>/page.tsx`. Dynamic segments in brackets.

## Index

- [`/`](app/page.tsx) — landing. Links to every screen + the auto-cycler. Hero, screen grid (Tier 1 + Tier 2), atmospheric details.
- [`/demo`](app/demo/page.tsx) — auto-cycler. Iterates through every screen in `lib/mockData.ts:demoOrder` with a 4s pause each. Pause/prev/next controls.

## Tier 1 — in the video

| # | Route | File | Purpose |
|---|---|---|---|
| 01 | `/notification` | `app/notification/page.tsx` | Opener and closer. Simulated iOS lock screen with the "TWO-STEP CALLED YOU OUT" callout card. |
| 02 | `/court/[id]` | `app/court/[id]/page.tsx` | Court 3 at West 4th. Top-down court SVG with floating nickname pills positioned where players "stand." Live indicator, Accept CTA. Test with `west-4th`. |
| 03 | `/player/[nickname]` | `app/player/[nickname]/page.tsx` | Hooper résumé. Nickname huge, record badge, signature stats grid, rank card (court #1 dominant), team affiliation, recent highlights row. Test with `sweet-shadow`. |
| 04 | `/matchup/[opponent]` | `app/matchup/[opponent]/page.tsx` | Tale-of-the-tape. 50/50 split: Sweet Shadow vs opponent. Visual weight scales with `intimidation`. Three IDs: `two-step` (low), `the-landlord` (medium), `black-jesus` (high). |
| 05 | `/game/live` | `app/game/live/page.tsx` | In-game overlay. Score + clock top, court visualization underneath, Call Moment / Dispute CTAs at bottom. |
| 06 | `/jury` | `app/jury/page.tsx` | Crowd jury vote. "WAS IT A FOUL?" scramble text, YES/NO buttons, live vote bar fills to consensus, voter count ticks up. |
| 07 | `/capture` | `app/capture/page.tsx` | In-app camera. Stylized viewfinder with Jumpman silhouette as the framed subject. Auto-tag pill drifts, hype meter pulses, REC blinks. |
| 08 | `/feed` | `app/feed/page.tsx` | TikTok-style snap feed. Three highlight cards. Stats-update overlay slides up after 1.8s showing record flip + new drop unlocked. |
| 10 | `/leaderboard` | `app/leaderboard/page.tsx` | Tabs (court / neighborhood / city / global) + view toggle (list / map). Map is a stylized NYC borough SVG with court dots animated by status. |
| 11 | `/drop/unlocked` | `app/drop/unlocked/page.tsx` | Ceremonial drop reveal. Jumpman watermark lands first, sneaker scales in, scramble title, gold sparks, passport-stamp header. |
| 12 | `/notification/the-one` | `app/notification/the-one/page.tsx` | Jordan Brand invite. Heavier than scene 01: gold-traced animated border, larger Jumpman in card, dual CTAs. |

## Tier 2 — deck mockups (not in video)

| # | Route | File | Purpose |
|---|---|---|---|
| 13 | `/onboard` | `app/onboard/page.tsx` | Nickname creation flow. 3 frames: your move → your court → reveal ("YOU ARE SWEET SHADOW"). |
| 14 | `/court-detail/[id]` | `app/court-detail/[id]/page.tsx` | Tap-into court info. Top players this month, next runs with RSVP, court size/surface/vibe. |
| 15 | `/team/[id]` | `app/team/[id]/page.tsx` | Crew page. Team name, roster pills, collective record, signature court. Test with `landlords`. |
| 16 | `/tournament` | `app/tournament/page.tsx` | Ladder path. Court → Neighborhood → Borough → City. Sweet Shadow's path highlighted, active match marked. |
| 17 | `/locker` | `app/locker/page.tsx` | Drops grid. 3×3 cards: 2 unlocked, 7 locked with requirement text. |

## What's NOT a page

These are shared building blocks, not routes:

- **`lib/mockData.ts`** — all data. User, opponents, courts, highlights, leaderboard, drops, demo route order. Single source of truth.
- **`lib/types.ts`** — TypeScript interfaces for the above.
- **`lib/animations.ts`** — anime.js helpers: `staggerIn`, `countUp`, `flipNumber`, `scrambleText`, `voteBar`, `glowOnce`, `scaleIn`, `slideDown`.
- **`components/ui/`** — primitives reused across screens: `NicknamePill`, `RecordBadge`, `StatCard`, `HypeIndicator`, `Clock`, `PhoneFrame` (the 390×844 viewport sim), `ScreenBack`, `SpotlightCursor`.
- **`components/icons/`** — `Jumpman` (the user-supplied silhouette), `Wing` (geometric secondary accent), `Ball`, `CourtSVG` (half-court diagram), `Flame`/`Snow`/`Skull` (reactions), `HypeDot`, `NYCMap` + `latLngToSVG`, `Sneaker`.

## Adding a new screen

1. Create `app/<route>/page.tsx` as a client component (`"use client"`)
2. Wrap in `<PhoneFrame>` from `components/ui`
3. Add `<ScreenBack />` so you can get back to the index
4. Pull data from `lib/mockData.ts`
5. Mount-time animation via anime.js (every screen should have at least one motion moment)
6. Add the route to `lib/mockData.ts:demoOrder` if it should appear in the cycler
7. Add a row to the landing `SCREENS` array in `app/page.tsx`

## Conventions

- **Mobile-first, 390 × 844.** Do not build for desktop. `PhoneFrame` clips to that viewport.
- **No em dashes** in copy. Use `·` or `/`.
- **No real Jumpman beyond the supplied SVG.** The geometric `Wing` is the secondary accent.
- **Type stack is mono + display only.** IBM Plex Mono everywhere, Anton for display moments. No Inter, no system sans.
- **`rounded-xs` = 2px corners.** Jordan does not round.
- **Mock-only.** No API calls, no real camera/location/notification permissions, no backend.
