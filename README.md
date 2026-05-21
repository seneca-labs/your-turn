# Your Turn / Jordan

Mobile-first capabilities prototype. 17 surfaces. Streetball identity, scored.

Fan/concept project. Not affiliated with Nike, Inc. or Jordan Brand.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Built and verified at 390 × 844 (iPhone 14 Pro).

The landing index links to every screen. `/demo` auto-cycles all 17 surfaces with a 4s pause each.

## Stack

- Next.js 14 (app router) + TypeScript
- Tailwind CSS
- anime.js for motion
- IBM Plex Mono + Anton (Google Fonts via `next/font`)
- Custom SVG icons (Jumpman silhouette as the brand mark, geometric Wing as secondary accent)
- No backend, no API, no auth — all data lives in `lib/mockData.ts`

## Surfaces

**Tier 1 (in video)**
`/notification` · `/court/west-4th` · `/player/sweet-shadow` · `/matchup/[two-step|the-landlord|black-jesus]` · `/game/live` · `/jury` · `/capture` · `/feed` · `/leaderboard` · `/drop/unlocked` · `/notification/the-one`

**Tier 2 (deck)**
`/onboard` · `/court-detail/west-4th` · `/team/landlords` · `/tournament` · `/locker`

## Design system

- **Palette:** Jordan Black `#0A0A0A`, Bone `#F5F2EB`, Varsity Red `#CE1126`, Hype Red `#FF2D2D`, Win Gold `#D4A938`, Sweat slate, asphalt + concrete surfaces
- **Type:** IBM Plex Mono (HUD/labels/body) + Anton (display, condensed, uppercase, `-0.02em`/`0.9` line-height)
- **Surface rules:** 2px corner radius (`rounded-xs`), 1px hairlines at 10% bone, asphalt/concrete CSS noise textures, halftone vignettes, grain overlay, scanlines on ceremony surfaces
- **Motion:** anime.js with `easeOutExpo` enters, staggered reveals, scramble-text moments, number flips on stat updates
- **Cursor:** spotlight invert (`mix-blend-mode: difference`) on desktop
