"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { Wing, Jumpman } from "@/components/icons";
import { Clock, SpotlightCursor } from "@/components/ui";

interface ScreenLink {
  href: string;
  title: string;
  tier: 1 | 2;
  num: number;
  note?: string;
  variants?: { href: string; label: string }[];
}

const SCREENS: ScreenLink[] = [
  // Tier 1 — in the video
  { href: "/notification", title: "Lock screen / notification", tier: 1, num: 1, note: "User gets challenged on phone" },
  { href: "/court/west-4th", title: "Accept challenge screen", tier: 1, num: 2, note: "Court live · matchup acceptance" },
  { href: "/player/sweet-shadow", title: "Main character profile", tier: 1, num: 3, note: "Sweet Shadow · stats + record" },
  {
    href: "/player/the-jet",
    title: "Opponent profile",
    tier: 1,
    num: 4,
    note: "Side character profile · stats",
    variants: [
      { href: "/player/two-step", label: "Two-Step" },
      { href: "/player/the-jet", label: "The Jet" },
      { href: "/player/iceman", label: "Iceman" },
    ],
  },
  {
    href: "/matchup/the-jet",
    title: "Head-to-head matchup",
    tier: 1,
    num: 5,
    note: "Half-face VS · shot chart · live score",
    variants: [
      { href: "/matchup/two-step", label: "vs Two-Step" },
      { href: "/matchup/the-jet", label: "vs The Jet" },
      { href: "/matchup/iceman", label: "vs Iceman" },
    ],
  },
  { href: "/feed", title: "Highlights feed", tier: 1, num: 6, note: "Game clips · scroll" },
  { href: "/jury", title: "Crowd as jury", tier: 1, num: 7, note: "Disputed-call vote" },
  { href: "/leaderboard", title: "Leaderboard", tier: 1, num: 8, note: "Rankings · list + map" },
  { href: "/notification/the-one", title: "Tournament invitation", tier: 1, num: 9, note: "App invite to The One" },

  // Tier 2 — deck / static
  { href: "/game/live", title: "In-game UI", tier: 2, num: 10 },
  { href: "/capture", title: "Highlight capture", tier: 2, num: 11 },
  { href: "/drop/unlocked", title: "Drop unlocked", tier: 2, num: 12 },
  { href: "/onboard", title: "Nickname creation", tier: 2, num: 13 },
  { href: "/court-detail/west-4th", title: "Court detail", tier: 2, num: 14 },
  { href: "/team/landlords", title: "Team page", tier: 2, num: 15 },
  { href: "/tournament", title: "Tournament bracket", tier: 2, num: 16 },
  { href: "/locker", title: "Drops locker", tier: 2, num: 17 },
];

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      anime({
        targets: heroRef.current.querySelectorAll(".hero-stagger"),
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 900,
        delay: anime.stagger(140),
        easing: "easeOutExpo",
      });
    }
    if (watermarkRef.current) {
      anime({
        targets: watermarkRef.current,
        opacity: [0, 1],
        scale: [1.15, 1],
        duration: 1600,
        delay: 200,
        easing: "easeOutExpo",
      });
    }
    if (listRef.current) {
      anime({
        targets: listRef.current.querySelectorAll(".screen-row"),
        opacity: [0, 1],
        translateX: [-12, 0],
        duration: 400,
        delay: anime.stagger(28, { start: 900 }),
        easing: "easeOutExpo",
      });
    }
  }, []);

  const tier1 = SCREENS.filter((s) => s.tier === 1);
  const tier2 = SCREENS.filter((s) => s.tier === 2);

  return (
    <main className="relative min-h-dvh overflow-hidden grain">
      <SpotlightCursor />

      <div
        ref={watermarkRef}
        className="absolute pointer-events-none select-none"
        style={{
          right: "-8%",
          top: "-4%",
          transform: "rotate(8deg)",
          opacity: 0,
        }}
      >
        <Jumpman size={720} className="text-varsity opacity-[0.07]" />
      </div>

      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: "-10%",
          width: "120%",
          height: "120%",
          background:
            "linear-gradient(118deg, transparent 0%, transparent 62%, rgba(206,17,38,0.06) 62.3%, rgba(206,17,38,0.06) 63%, transparent 63.3%, transparent 100%)",
        }}
      />

      <div
        className="absolute pointer-events-none halftone"
        style={{
          bottom: 0,
          right: 0,
          width: "60%",
          height: "60%",
          maskImage: "radial-gradient(ellipse at bottom right, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at bottom right, black 0%, transparent 70%)",
        }}
      />

      <div className="relative px-6 py-10 max-w-3xl mx-auto z-10">
        <header className="flex items-center justify-between mb-16 font-mono text-[10px] tracking-hud uppercase">
          <div className="flex items-center gap-2">
            <Jumpman size={18} className="text-varsity" />
            <span className="text-jordan-black/80">Your Turn / Jordan</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sweat hidden sm:inline">NYC · 8:42</span>
            <Clock className="text-jordan-black/60 text-[10px]" />
          </div>
        </header>

        <div ref={heroRef} className="mb-16">
          <div className="hero-stagger font-mono text-[10px] tracking-label uppercase text-win-gold mb-4 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-win-gold" />
            BD Concept · Capabilities Prototype
          </div>

          <h1 className="display-tight text-jordan-black text-[96px] sm:text-[128px] leading-[0.82] mb-2">
            <div className="hero-stagger">YOUR</div>
            <div className="hero-stagger relative inline-block">
              <span className="text-varsity">TURN</span>
              <span
                className="absolute -right-3 top-1 text-win-gold display-tight text-[18px]"
                style={{ transform: "rotate(12deg)" }}
              >
                ★
              </span>
            </div>
          </h1>

          <div className="hero-stagger mt-4 max-w-md">
            <div className="font-mono text-[13px] tracking-hud uppercase text-jordan-black/85 leading-relaxed">
              Streetball identity, scored.
              <br />
              Court-to-city ladder. Crowd-judged.
              <br />
              <span className="text-win-gold">Drops earned, never bought.</span>
            </div>
          </div>

          <div className="hero-stagger mt-3 font-mono text-[10px] tracking-label uppercase text-sweat">
            17 surfaces · Mobile 390 × 844 · No backend, no API, no auth
          </div>

          <div className="hero-stagger mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/demo"
              className="group inline-flex items-center justify-between gap-4 px-5 py-3 rounded-xs bg-varsity font-mono text-[11px] tracking-hud uppercase text-white font-bold"
            >
              <span>Run Demo Cycle</span>
              <Jumpman size={18} className="text-jordan-black group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/notification"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xs border border-jordan-black/30 font-mono text-[11px] tracking-hud uppercase text-jordan-black hover:border-jordan-black"
            >
              <span>Enter Scene 1</span>
              <svg width="12" height="9" viewBox="0 0 14 10" fill="none">
                <path d="M1 5 H12 M9 1 L13 5 L9 9" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </Link>
          </div>
        </div>

        <div ref={listRef} className="space-y-10">
          <ScreenGroup title="Tier 1 / In Video" count={tier1.length} screens={tier1} />
          <ScreenGroup title="Tier 2 / Deck" count={tier2.length} screens={tier2} />
        </div>

        <footer className="mt-20 grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[9px] tracking-label uppercase text-sweat hairline-t pt-4">
          <div>Lat 40.7311 · Lng -74.0019</div>
          <div className="text-right">Court 3 / W4 / NYC</div>
          <div>Fan concept · Not affiliated</div>
          <div className="text-right text-win-gold/70">v0.2 · 2026.05.21</div>
        </footer>
      </div>
    </main>
  );
}

function ScreenGroup({
  title,
  count,
  screens,
}: {
  title: string;
  count: number;
  screens: ScreenLink[];
}) {
  return (
    <section>
      <div className="flex items-center justify-between hairline-b pb-2 mb-4">
        <div className="font-mono text-[9px] tracking-label uppercase text-win-gold flex items-center gap-2">
          <Wing size={14} className="text-win-gold" />
          {title}
        </div>
        <div className="font-mono text-[9px] tracking-label uppercase text-sweat tabular">
          {String(count).padStart(2, "0")} / SURFACES
        </div>
      </div>
      <div className="grid gap-1">
        {screens.map((s) => (
          <div key={s.href} className="group/row">
            <Link
              href={s.href}
              className="screen-row group flex items-center gap-4 px-3 py-3 hairline rounded-xs hover:border-varsity hover:bg-varsity/5 transition-colors relative overflow-hidden"
            >
              <span
                className="absolute -right-4 -top-2 text-varsity opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
                style={{ transform: "rotate(-12deg)" }}
              >
                <Jumpman size={64} />
              </span>

              <span className="display-tight text-jordan-black/40 text-[26px] tabular w-10 text-center group-hover:text-varsity transition-colors">
                {String(s.num).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0 relative">
                <div className="font-mono text-[12px] tracking-hud uppercase text-jordan-black">
                  {s.title}
                </div>
                {s.note && (
                  <div className="font-mono text-[9px] tracking-hud uppercase text-sweat">
                    {s.note}
                  </div>
                )}
              </div>
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                className="text-jordan-black/40 group-hover:text-varsity group-hover:animate-nudge-right relative"
              >
                <path d="M1 5 H12 M9 1 L13 5 L9 9" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </Link>
            {s.variants && (
              <div className="ml-14 mr-3 -mt-px px-3 py-2 hairline border-t-0 rounded-b-xs flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[9px] tracking-label uppercase text-sweat">
                  Variants
                </span>
                {s.variants.map((v) => (
                  <Link
                    key={v.href}
                    href={v.href}
                    className="font-mono text-[9px] tracking-hud uppercase text-jordan-black/70 hover:text-varsity px-1.5 py-0.5 rounded-xs border border-jordan-black/15 hover:border-varsity transition-colors"
                  >
                    {v.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
