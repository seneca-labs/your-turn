"use client";
import { forwardRef, useEffect, useRef } from "react";
import { notFound, useParams } from "next/navigation";
import anime from "animejs";
import Link from "next/link";
import {
  PhoneFrame,
  ScreenBack,
  IOSStatusBar,
  IOSHomeIndicator,
} from "@/components/ui";
import { user, opponents, findOpponent } from "@/lib/mockData";
import { Flame } from "@/components/icons";
import type { ShotMark } from "@/lib/types";

type Intim = "low" | "medium" | "high";

const RANK_LABEL: Record<Intim, string> = {
  low: "Opponent",
  medium: "Veteran",
  high: "Boro King",
};

export default function MatchupPage() {
  const params = useParams<{ opponent: string }>();
  const opp = findOpponent(params.opponent);

  const headerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const vsRef = useRef<HTMLDivElement>(null);
  const scoreSelfRef = useRef<HTMLSpanElement>(null);
  const scoreOppRef = useRef<HTMLSpanElement>(null);
  const courtRef = useRef<SVGSVGElement>(null);
  const statRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!opp) return;
    statRefs.current = [];

    anime({
      targets: headerRef.current,
      translateY: [-12, 0],
      opacity: [0, 1],
      duration: 500,
      easing: "cubicBezier(0.16, 1, 0.3, 1)",
    });
    anime({
      targets: leftRef.current,
      translateX: [-40, 0],
      opacity: [0, 1],
      duration: 700,
      easing: "cubicBezier(0.16, 1, 0.3, 1)",
    });
    anime({
      targets: rightRef.current,
      translateX: [40, 0],
      opacity: [0, 1],
      duration: 700,
      easing: "cubicBezier(0.16, 1, 0.3, 1)",
    });
    anime({
      targets: vsRef.current,
      scale: [0.4, 1.15, 1],
      opacity: [0, 1],
      duration: 700,
      delay: 280,
      easing: "easeOutBack",
    });

    // Score tickers — animate up in SS favor.
    const finalSelf = opp.matchVsSelf.finalScoreSelf;
    const finalOpp = opp.matchVsSelf.finalScoreOpp;
    if (scoreSelfRef.current) {
      animateNumber(scoreSelfRef.current, finalSelf, 1800, 500);
    }
    if (scoreOppRef.current) {
      animateNumber(scoreOppRef.current, finalOpp, 1800, 500);
    }

    // Shot chart — fade in dots progressively
    if (courtRef.current) {
      const dots = courtRef.current.querySelectorAll(".shot-dot");
      anime({
        targets: dots,
        opacity: [0, 1],
        scale: [0, 1],
        delay: anime.stagger(50, { start: 1000 }),
        duration: 320,
        easing: "easeOutBack",
      });
    }

    // Stat line — number count-up
    statRefs.current.forEach((el, i) => {
      if (!el) return;
      const target = parseFloat(el.dataset.value || "0");
      const fmt = el.dataset.fmt || "num";
      animateStat(el, target, fmt, 800, 1400 + i * 60);
    });
  }, [opp]);

  if (!opp) return notFound();

  const intim = opp.intimidation as Intim;
  const m = opp.matchVsSelf;

  return (
    <PhoneFrame bg="#FFFFFF">
      <ScreenBack />
      <IOSStatusBar tone="light" />

      <div className="relative h-full flex flex-col pt-[44px]">
        {/* Header */}
        <div
          ref={headerRef}
          className="px-5 pt-2 pb-2.5 hairline-b flex items-center justify-between"
        >
          <div>
            <div className="font-mono text-[9px] tracking-label uppercase text-sweat">
              Tale of the Tape
            </div>
            <div className="mt-0.5 font-mono text-[10px] tracking-hud uppercase text-jordan-black/75">
              {opp.homeCourt === user.homeCourt
                ? "Home Court · West 4th"
                : `Away · ${opp.homeCourt}`}
            </div>
          </div>
          <span
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full font-mono text-[9px] tracking-hud uppercase font-bold"
            style={{
              background:
                intim === "high"
                  ? "linear-gradient(135deg, #CE1126 0%, #8A0A18 100%)"
                  : intim === "medium"
                  ? "rgba(206,17,38,0.12)"
                  : "rgba(10,10,10,0.06)",
              color:
                intim === "high"
                  ? "#FFFFFF"
                  : intim === "medium"
                  ? "#CE1126"
                  : "#0A0A0A",
              border:
                intim === "high"
                  ? "0.5px solid rgba(255,255,255,0.4)"
                  : intim === "medium"
                  ? "0.5px solid rgba(206,17,38,0.25)"
                  : "0.5px solid rgba(10,10,10,0.10)",
            }}
          >
            {intim === "high" && <Flame size={10} />}
            {RANK_LABEL[intim]}
          </span>
        </div>

        {/* VS / Face-off section — half-face backdrops + animated score */}
        <div className="relative h-[260px] flex-shrink-0 overflow-hidden hairline-b">
          {/* Left half — Sweet Shadow backdrop */}
          <div
            ref={leftRef}
            className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.halfFace}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-right"
              style={{ opacity: 0.28 }}
              aria-hidden
            />
            {/* Inner-edge fade so VS stays clean */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.85) 100%)",
              }}
            />
            {/* Outer-edge fade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 35%)",
              }}
            />
            {/* Nickname */}
            <div className="absolute top-3 left-3 z-10">
              <div className="font-mono text-[9px] tracking-label uppercase text-win-gold mb-0.5 font-bold">
                Challenger
              </div>
              <h2 className="display-tight text-jordan-black text-[26px] leading-[0.9]">
                {user.nickname.split(" ").map((word, i) => (
                  <div key={i}>{word}</div>
                ))}
              </h2>
            </div>
            {/* Score */}
            <div className="absolute bottom-3 left-4 z-10">
              <div className="font-mono text-[8px] tracking-label uppercase text-sweat mb-0.5">
                Score
              </div>
              <span
                ref={scoreSelfRef}
                className="display-tight text-jordan-black text-[64px] leading-none tabular"
                data-value={m.finalScoreSelf}
              >
                0
              </span>
            </div>
          </div>

          {/* Right half — Opponent backdrop */}
          <div
            ref={rightRef}
            className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={opp.halfFace}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-left"
              style={{ opacity: 0.28 }}
              aria-hidden
            />
            {/* Inner-edge fade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.85) 100%)",
              }}
            />
            {/* Outer-edge fade + intimidation tint */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  intim === "high"
                    ? "linear-gradient(270deg, rgba(206,17,38,0.10) 0%, rgba(255,255,255,0) 35%)"
                    : "linear-gradient(270deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 35%)",
              }}
            />
            {/* Nickname */}
            <div className="absolute top-3 right-3 z-10 text-right">
              <div className="font-mono text-[9px] tracking-label uppercase text-sweat mb-0.5 font-bold">
                {RANK_LABEL[intim]}
              </div>
              <h2 className="display-tight text-jordan-black text-[26px] leading-[0.9]">
                {opp.nickname.split(" ").map((word, i) => (
                  <div key={i}>{word}</div>
                ))}
              </h2>
            </div>
            {/* Score */}
            <div className="absolute bottom-3 right-4 z-10 text-right">
              <div className="font-mono text-[8px] tracking-label uppercase text-sweat mb-0.5">
                Score
              </div>
              <span
                ref={scoreOppRef}
                className="display-tight text-jordan-black text-[64px] leading-none tabular"
                data-value={m.finalScoreOpp}
              >
                0
              </span>
            </div>
          </div>

          {/* VS — centered, no squiggle */}
          <div
            ref={vsRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center"
          >
            <div
              className="display-tight text-varsity text-[64px] leading-none"
              style={{ textShadow: "0 4px 24px rgba(206,17,38,0.45)" }}
            >
              VS
            </div>
            <div className="mt-1 font-mono text-[8px] tracking-label uppercase text-sweat">
              First to 11
            </div>
          </div>
        </div>

        {/* Shot chart */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="font-mono text-[9px] tracking-label uppercase text-sweat flex items-center gap-2">
              <span className="inline-block h-px w-3 bg-sweat" />
              Shot Chart
            </div>
            <div className="flex items-center gap-3 font-mono text-[8px] tracking-hud uppercase">
              <span className="flex items-center gap-1.5 text-jordan-black/70">
                <span className="inline-block h-2 w-2 rounded-full bg-win-gold" />
                {user.nickname.split(" ")[0]}
              </span>
              <span className="flex items-center gap-1.5 text-jordan-black/70">
                <span className="inline-block h-2 w-2 rounded-full bg-varsity" />
                {opp.nickname.split(" ")[0]}
              </span>
            </div>
          </div>
          <div className="relative bg-[#F5F2EB] hairline rounded-md p-2">
            <ShotChart
              ref={courtRef}
              selfShots={m.shotChartSelf}
              oppShots={m.shotChartOpp}
            />
          </div>
        </div>

        {/* Game stats */}
        <div className="px-4 pb-3 flex-1">
          <div className="font-mono text-[9px] tracking-label uppercase text-sweat flex items-center gap-2 mb-2">
            <span className="inline-block h-px w-3 bg-sweat" />
            Game · Live
          </div>
          <div className="grid grid-cols-2 gap-2">
            <StatBox
              label={user.nickname.split(" ")[0]}
              accent="win-gold"
              stats={[
                ["PTS", m.selfStats.pts, "num"],
                ["FG", m.selfStats.fg, "str"],
                ["REB", m.selfStats.reb, "num"],
                ["STL", m.selfStats.stl, "num"],
              ]}
              statRefs={statRefs}
            />
            <StatBox
              label={opp.nickname.split(" ")[0]}
              accent="varsity"
              stats={[
                ["PTS", m.oppStats.pts, "num"],
                ["FG", m.oppStats.fg, "str"],
                ["REB", m.oppStats.reb, "num"],
                ["STL", m.oppStats.stl, "num"],
              ]}
              statRefs={statRefs}
            />
          </div>
        </div>

        {/* Footer / CTA */}
        <div className="hairline-t px-4 pt-3 pb-4 bg-white relative">
          <Link
            href="/game/live"
            className="group relative block w-full text-center py-3 rounded-md bg-varsity font-mono text-[12px] tracking-hud uppercase text-white font-bold overflow-hidden"
            style={{ boxShadow: "0 6px 14px rgba(206,17,38,0.30)" }}
          >
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
              Accept The Run
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="group-hover:translate-x-1 transition-transform">
                <path d="M1 5 H12 M9 1 L13 5 L9 9" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
          </Link>

          <div className="mt-2.5 flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-label uppercase text-sweat">
              Rotate · {opponents.findIndex((o) => o.id === opp.id) + 1} of{" "}
              {opponents.length}
            </span>
            <div className="flex gap-1.5">
              {opponents.map((o) => (
                <Link
                  key={o.id}
                  href={`/matchup/${o.id}`}
                  aria-label={o.nickname}
                  className={`h-1.5 rounded-full transition-all ${
                    o.id === opp.id ? "w-7 bg-varsity" : "w-5 bg-jordan-black/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <IOSHomeIndicator tone="light" />
    </PhoneFrame>
  );
}

const ShotChart = forwardRef<
  SVGSVGElement,
  { selfShots: ShotMark[]; oppShots: ShotMark[] }
>(function ShotChart({ selfShots, oppShots }, ref) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 200 140"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-[150px]"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="6"
        width="188"
        height="128"
        fill="none"
        stroke="rgba(10,10,10,0.35)"
        strokeWidth="1.2"
      />
      <line x1="86" y1="10" x2="114" y2="10" stroke="rgba(10,10,10,0.55)" strokeWidth="1.6" />
      <circle cx="100" cy="16" r="3" fill="none" stroke="rgba(10,10,10,0.55)" strokeWidth="1.4" />
      <rect x="82" y="10" width="36" height="50" fill="none" stroke="rgba(10,10,10,0.30)" strokeWidth="1" />
      <path d="M82 60 A18 18 0 0 0 118 60" fill="none" stroke="rgba(10,10,10,0.30)" strokeWidth="1" />
      <path
        d="M82 60 A18 18 0 0 1 118 60"
        fill="none"
        stroke="rgba(10,10,10,0.30)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <path
        d="M30 10 V32 A42 42 0 0 0 170 32 V10"
        fill="none"
        stroke="rgba(10,10,10,0.28)"
        strokeWidth="1"
      />
      <line x1="6" y1="134" x2="194" y2="134" stroke="rgba(10,10,10,0.30)" strokeWidth="1" />
      <path d="M82 134 A18 18 0 0 0 118 134" fill="none" stroke="rgba(10,10,10,0.30)" strokeWidth="1" />

      {selfShots.map((s, i) => {
        const cx = 6 + s.x * 188;
        const cy = 6 + s.y * 128;
        return (
          <circle
            key={`s-${i}`}
            cx={cx}
            cy={cy}
            r="3.6"
            className="shot-dot"
            fill={s.made ? "#D4A938" : "none"}
            stroke="#D4A938"
            strokeWidth={s.made ? 0 : 1.4}
            style={{ opacity: 0 }}
          />
        );
      })}
      {oppShots.map((s, i) => {
        const cx = 6 + s.x * 188;
        const cy = 6 + s.y * 128;
        return (
          <circle
            key={`o-${i}`}
            cx={cx}
            cy={cy}
            r="3.2"
            className="shot-dot"
            fill={s.made ? "#CE1126" : "none"}
            stroke="#CE1126"
            strokeWidth={s.made ? 0 : 1.4}
            style={{ opacity: 0 }}
          />
        );
      })}
    </svg>
  );
});

function StatBox({
  label,
  accent,
  stats,
  statRefs,
}: {
  label: string;
  accent: "varsity" | "win-gold";
  stats: Array<[string, string | number, "num" | "str"]>;
  statRefs: React.MutableRefObject<HTMLSpanElement[]>;
}) {
  const color = accent === "varsity" ? "text-varsity" : "text-win-gold";
  const dot = accent === "varsity" ? "bg-varsity" : "bg-win-gold";
  return (
    <div className="hairline rounded-md bg-white p-2.5">
      <div className="flex items-center gap-1.5 mb-2">
        <span className={`inline-block h-2 w-2 rounded-full ${dot}`} />
        <span className={`font-mono text-[9px] tracking-hud uppercase font-bold ${color}`}>
          {label}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-1">
        {stats.map(([k, v, fmt]) => (
          <div key={k} className="text-center">
            <div className="font-mono text-[8px] tracking-label uppercase text-sweat">
              {k}
            </div>
            <span
              ref={(el) => {
                if (el) statRefs.current.push(el);
              }}
              data-value={String(v)}
              data-fmt={fmt}
              className="display-tight text-jordan-black text-[20px] tabular leading-none mt-0.5 block"
            >
              {fmt === "str" ? v : 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function animateNumber(el: HTMLElement, to: number, durationMs = 1200, delay = 0) {
  const obj = { v: 0 };
  anime({
    targets: obj,
    v: to,
    round: 1,
    duration: durationMs,
    delay,
    easing: "easeOutExpo",
    update: () => {
      el.textContent = String(obj.v);
    },
  });
}

function animateStat(el: HTMLElement, to: number | string, fmt: string, durationMs = 800, delay = 0) {
  if (fmt === "str") {
    // For "5/9" type, parse the made part and animate it counting up to final
    const target = String(to);
    const parts = target.split("/");
    if (parts.length === 2) {
      const num = parseInt(parts[0], 10);
      const denom = parts[1];
      const obj = { v: 0 };
      anime({
        targets: obj,
        v: num,
        round: 1,
        duration: durationMs,
        delay,
        easing: "easeOutExpo",
        update: () => {
          el.textContent = `${obj.v}/${denom}`;
        },
      });
      return;
    }
    el.textContent = target;
    return;
  }
  const numericTarget = typeof to === "number" ? to : parseFloat(String(to));
  animateNumber(el, numericTarget, durationMs, delay);
}
