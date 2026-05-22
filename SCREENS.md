# Screens / Pages reference

Quick brief on every page in the repo. Use this to verify what should exist, what each surface contains, and which file maps to which route.

App router → every route below maps to `app/<route>/page.tsx`. Dynamic segments in brackets.

## Index

- [`/`](app/page.tsx) — landing. Links to every screen + the auto-cycler. Hero, screen grid (Tier 1 + Tier 2), atmospheric details.
- [`/demo`](app/demo/page.tsx) — auto-cycler. Iterates through every screen in `lib/mockData.ts:demoOrder` with a 4s pause each. Pause/prev/next controls.

## Tier 1 — in the video

| # | Screen | Route | File | Purpose |
|---|---|---|---|---|
| 01 | Lock screen / notification | `/notification` | `app/notification/page.tsx` | User gets challenged to a 1v1 on their phone. iOS-style lock screen with TWO-STEP callout card. |
| 02 | Accept challenge screen | `/court/west-4th` | `app/court/[id]/page.tsx` | Court live view. Top-down court SVG with floating nickname pills, live indicator, accept CTA. Test with `west-4th`. |
| 03 | Main character profile | `/player/sweet-shadow` | `app/player/[nickname]/page.tsx` | Sweet Shadow's hooper résumé. Photo, nickname, record, signature stats, rank card (court #1), team, recent highlights. |
| 04 | Opponent profile | `/player/[two-step\|the-jet\|iceman]` | `app/player/[nickname]/page.tsx` | Same component as #3, scout-mode for opponents. Photo, record, intimidation level, signature stats, ranked tiles. |
| 05 | Head-to-head matchup | `/matchup/[two-step\|the-jet\|iceman]` | `app/matchup/[opponent]/page.tsx` | VS view with half-face backdrops (low-opacity), animated score in SS's favor, shot chart, live game stats. Three opponent variants. |
| 06 | Highlights feed | `/feed` | `app/feed/page.tsx` | TikTok-style snap feed. Game clips with reactions + stats overlay. |
| 07 | Crowd as jury | `/jury` | `app/jury/page.tsx` | Disputed-call vote. Scramble-text question, YES/NO contrast buttons, live vote bar fills to consensus. |
| 08 | Leaderboard | `/leaderboard` | `app/leaderboard/page.tsx` | Tabs (court / neighborhood / city / global) + view toggle (list / map). NYC borough SVG with court dots. |
| 09 | Tournament invitation | `/notification/the-one` | `app/notification/the-one/page.tsx` | Jordan-branded invite. Gold-traced animated border, larger Jumpman, dual CTAs (Details / Accept). |

## Tier 2 — deck / static mockups

| # | Screen | Route | File | Purpose |
|---|---|---|---|---|
| 10 | In-game UI | `/game/live` | `app/game/live/page.tsx` | Score overlay above court visualization. Unified scoreboard card (names + grouped score + possession). |
| 11 | Highlight capture | `/capture` | `app/capture/page.tsx` | In-app camera viewfinder. Jumpman silhouette as framed subject, drifting auto-tag, hype meter, REC blink. |
| 12 | Drop unlocked | `/drop/unlocked` | `app/drop/unlocked/page.tsx` | Ceremonial drop reveal. Jumpman watermark lands first, sneaker scales in, scramble title, gold sparks, passport-stamp header. |
| 13 | Nickname creation | `/onboard` | `app/onboard/page.tsx` | 3-frame onboarding: your move → your court → reveal ("YOU ARE SWEET SHADOW"). |
| 14 | Court detail | `/court-detail/west-4th` | `app/court-detail/[id]/page.tsx` | Tap-into court info. Top players, next runs with RSVP, court size/surface/vibe. |
| 15 | Team page | `/team/landlords` | `app/team/[id]/page.tsx` | Crew page. Team name, roster pills, collective record, signature court. |
| 16 | Tournament bracket | `/tournament` | `app/tournament/page.tsx` | Ladder path. Court → Neighborhood → Borough → City. SS's path highlighted, active match marked. |
| 17 | Drops locker | `/locker` | `app/locker/page.tsx` | Drops grid. 3×3 cards: 2 unlocked, 7 locked with requirement text. |

## Character cast

| Nickname | Role | Intimidation | Photo | Half-face |
|---|---|---|---|---|
| **Sweet Shadow** | Main character | — | `/players/sweet-shadow.png` | `/half-faces/sweet-shadow.png` |
| Two-Step | Opponent | low | `/players/two-step.png` | `/half-faces/two-step.png` |
| The Jet | Opponent | medium | `/players/the-jet.png` | `/half-faces/the-jet.png` |
| Iceman | Opponent | high (boro king) | `/players/iceman.png` | `/half-faces/iceman.png` |

Mock matchup scores (SS always slightly favored):
- vs Two-Step: **9 - 6**
- vs The Jet: **11 - 9**
- vs Iceman: **13 - 11**

## What's NOT a page

These are shared building blocks, not routes:

- **`lib/mockData.ts`** — all data. User, opponents (with `matchVsSelf` game data and shot charts), courts, highlights, leaderboard, drops, demo route order.
- **`lib/types.ts`** — TypeScript interfaces, including `GameStats`, `MatchGame`, `ShotMark`.
- **`lib/animations.ts`** — anime.js helpers: `staggerIn`, `countUp`, `flipNumber`, `scrambleText`, `voteBar`, `glowOnce`, `scaleIn`, `slideDown`, `notificationArrive`.
- **`components/ui/`** — primitives: `NicknamePill`, `RecordBadge`, `StatCard`, `HypeIndicator`, `Clock`, `PhoneFrame`, `ScreenBack`, `SpotlightCursor`, `IOSStatusBar`, `IOSHomeIndicator`.
- **`components/icons/`** — `Jumpman` (the user-supplied silhouette), `Wing` (secondary accent), `Ball`, `CourtSVG`, `Flame`/`Snow`/`Skull` (reactions), `HypeDot`, `NYCMap` + `latLngToSVG`, `Sneaker`, `Avatar`.

## Adding a new screen

1. Create `app/<route>/page.tsx` as a client component (`"use client"`).
2. Wrap in `<PhoneFrame>`. Add `<ScreenBack />` for return-to-index.
3. Pull data from `lib/mockData.ts`. Use `findPerson(slug)` for the unified player/opponent profile lookup.
4. Mount-time animation via anime.js. Every screen should have at least one motion moment.
5. Add the route to `lib/mockData.ts:demoOrder` if it should appear in the auto-cycler.
6. Add a row to the landing `SCREENS` array in `app/page.tsx`.

## Conventions

- **Mobile-first, 390 × 844.** Do not build for desktop. `PhoneFrame` clips to that viewport.
- **No em dashes** in copy. Use `·` or `/`.
- **Type stack is mono + display only.** IBM Plex Mono everywhere, Anton for display moments.
- **`rounded-xs` = 2px corners.** Jordan does not round.
- **White background everywhere.** Page bg is `#FFFFFF`. Surfaces use `bg-[#F5F2EB]` (bone) for cards. Dark surfaces only as deliberate single-element contrast (e.g., high-intimidation matchup tier).
- **Mock-only.** No API calls, no real camera/location/notification permissions, no backend.
- **Photos:** `/public/players/<slug>.png` for full portraits, `/public/half-faces/<slug>.png` for matchup backdrops (~0.28 opacity).
