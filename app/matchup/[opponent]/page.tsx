"use client";
import { useEffect, useRef } from "react";
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
import { Wing, Avatar, Flame } from "@/components/icons";

type Intim = "low" | "medium" | "high";

const RANK_LABEL: Record<Intim, string> = {
  low: "Opponent",
  medium: "Veteran",
  high: "Boro King",
};

const OPP_WEIGHT: Record<
  Intim,
  {
    avatar: number;
    name: string;
    bg: string;
    halo: string;
    flame: boolean;
  }
> = {
  low: {
    avatar: 80,
    name: "text-[34px]",
    bg: "#FFFFFF",
    halo: "0 0 0 3px rgba(206,17,38,0.08)",
    flame: false,
  },
  medium: {
    avatar: 96,
    name: "text-[42px]",
    bg: "linear-gradient(180deg, #FFFFFF 0%, #FAF4E5 100%)",
    halo: "0 0 0 4px rgba(206,17,38,0.14), 0 8px 22px rgba(206,17,38,0.18)",
    flame: false,
  },
  high: {
    avatar: 116,
    name: "text-[54px]",
    bg: "linear-gradient(135deg, #FFFFFF 0%, #F4E6D6 60%, #ECCFB8 100%)",
    halo:
      "0 0 0 5px rgba(206,17,38,0.18), 0 0 0 10px rgba(206,17,38,0.06), 0 14px 38px rgba(206,17,38,0.30)",
    flame: true,
  },
};

export default function MatchupPage() {
  const params = useParams<{ opponent: string }>();
  const opp = findOpponent(params.opponent);

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const vsRef = useRef<HTMLDivElement>(null);
  const oppAvatarRef = useRef<HTMLDivElement>(null);
  const selfAvatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!opp) return;
    anime({
      targets: leftRef.current,
      translateX: [-60, 0],
      opacity: [0, 1],
      duration: 600,
      easing: "cubicBezier(0.16, 1, 0.3, 1)",
    });
    anime({
      targets: rightRef.current,
      translateX: [60, 0],
      opacity: [0, 1],
      duration: 600,
      easing: "cubicBezier(0.16, 1, 0.3, 1)",
    });
    anime({
      targets: [selfAvatarRef.current, oppAvatarRef.current],
      scale: [0.6, 1],
      opacity: [0, 1],
      delay: anime.stagger(60, { start: 100 }),
      duration: 700,
      easing: "cubicBezier(0.16, 1, 0.3, 1)",
    });
    anime({
      targets: vsRef.current,
      scale: [0.4, 1.12, 1],
      opacity: [0, 1],
      duration: 700,
      delay: 320,
      easing: "easeOutBack",
    });
  }, [opp]);

  if (!opp) return notFound();

  const intim = opp.intimidation as Intim;
  const w = OPP_WEIGHT[intim];

  return (
    <PhoneFrame bg="#FFFFFF">
      <ScreenBack />

      <IOSStatusBar tone="light" />

      <div className="relative h-full flex flex-col pt-[44px]">
        {/* Header */}
        <div className="px-5 pb-3 hairline-b flex items-center justify-between">
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
            {w.flame && <Flame size={10} />}
            {RANK_LABEL[intim]}
          </span>
        </div>

        {/* Body — vertical split */}
        <div className="flex-1 grid grid-cols-2 relative overflow-hidden">
          {/* LEFT — Sweet Shadow */}
          <div
            ref={leftRef}
            className="asphalt-bg p-4 flex flex-col justify-between hairline-r"
          >
            <div className="flex flex-col items-start">
              <div className="font-mono text-[9px] tracking-label uppercase text-sweat mb-3">
                Challenger
              </div>
              <div ref={selfAvatarRef} className="relative mb-3" style={{ opacity: 0 }}>
                <Avatar size={80} tone="self" />
                <span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    boxShadow:
                      "0 0 0 3px rgba(184,144,42,0.16), 0 6px 18px rgba(184,144,42,0.20)",
                  }}
                />
              </div>
              <h2 className="display-tight text-jordan-black text-[34px] leading-[0.9]">
                {user.nickname.split(" ").map((word, i) => (
                  <div key={i}>{word}</div>
                ))}
              </h2>
              <div className="mt-2 font-mono text-[9px] tracking-hud uppercase text-jordan-black/55">
                {user.homeCourt}
              </div>
            </div>
            <div className="space-y-2.5">
              <StatLine
                label="Record"
                value={`${user.record.wins}-${user.record.losses}`}
              />
              <StatLine
                label="Streak"
                value={`W${user.record.currentStreak}`}
                accent
              />
              <StatLine
                label="Fadeaway"
                value={user.signatureStats.fadeaway}
              />
              <StatLine label="+/-" value={user.signatureStats.closeOut} />
            </div>
          </div>

          {/* RIGHT — Opponent */}
          <div
            ref={rightRef}
            className="p-4 flex flex-col justify-between relative overflow-hidden"
            style={{ background: w.bg }}
          >
            {/* High-intimidation atmospheric vignette */}
            {intim === "high" && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 80% 30%, rgba(206,17,38,0.18) 0%, rgba(206,17,38,0) 60%)",
                }}
              />
            )}

            <div className="flex flex-col items-end relative">
              <div className="font-mono text-[9px] tracking-label uppercase text-sweat mb-3 text-right">
                {RANK_LABEL[intim]}
              </div>
              <div
                ref={oppAvatarRef}
                className="relative mb-3"
                style={{ opacity: 0 }}
              >
                <Avatar size={w.avatar} tone="challenger" />
                <span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ boxShadow: w.halo }}
                />
                {w.flame && (
                  <span
                    className="absolute -top-1 -right-1 inline-flex items-center justify-center h-6 w-6 rounded-full bg-varsity text-white shadow-[0_2px_10px_rgba(206,17,38,0.5)]"
                    style={{ boxShadow: "0 0 0 2px #FFFFFF" }}
                  >
                    <Flame size={11} />
                  </span>
                )}
              </div>
              <h2
                className={`display-tight text-jordan-black ${w.name} leading-[0.9] text-right`}
              >
                {opp.nickname.split(" ").map((word, i) => (
                  <div key={i}>{word}</div>
                ))}
              </h2>
              <div className="mt-2 font-mono text-[9px] tracking-hud uppercase text-jordan-black/55 text-right">
                {opp.homeCourt}
              </div>
            </div>
            <div className="space-y-2.5 relative">
              <StatLine
                label="Record"
                value={`${opp.record.wins}-${opp.record.losses}`}
                align="right"
                accent={intim === "high"}
              />
              <StatLine
                label="Streak"
                value={`W${opp.record.currentStreak}`}
                accent={opp.record.currentStreak >= 7}
                align="right"
              />
              {opp.signatureStats && (
                <>
                  <StatLine
                    label="Fadeaway"
                    value={opp.signatureStats.fadeaway}
                    align="right"
                  />
                  <StatLine
                    label="+/-"
                    value={opp.signatureStats.closeOut}
                    align="right"
                  />
                </>
              )}
            </div>
          </div>

          {/* VS overlay */}
          <div
            ref={vsRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
          >
            <div className="relative">
              <div
                className="display-tight text-varsity text-[88px] leading-none"
                style={{ textShadow: "0 0 28px rgba(206,17,38,0.55)" }}
              >
                VS
              </div>
              <Wing
                size={44}
                className="text-varsity absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="hairline-t px-4 pt-3 pb-5 bg-white relative">
          <div className="flex items-center justify-between font-mono text-[9px] tracking-hud uppercase text-sweat mb-2.5">
            <span>First to 21 · Crowd judged</span>
            <span className="text-varsity font-bold">
              Win → climb 1 spot
            </span>
          </div>
          <Link
            href="/game/live"
            className="group relative block w-full text-center py-3.5 rounded-md bg-varsity font-mono text-[12px] tracking-hud uppercase text-white font-bold overflow-hidden"
            style={{
              boxShadow: "0 6px 14px rgba(206,17,38,0.30)",
            }}
          >
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
              Accept The Run
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path
                  d="M1 5 H12 M9 1 L13 5 L9 9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </span>
            <span
              className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)",
              }}
            />
          </Link>

          <div className="mt-3 flex items-center justify-between">
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

function StatLine({
  label,
  value,
  align = "left",
  accent = false,
}: {
  label: string;
  value: string;
  align?: "left" | "right";
  accent?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline ${
        align === "right" ? "flex-row-reverse" : ""
      } justify-between`}
    >
      <span className="font-mono text-[9px] tracking-label uppercase text-sweat">
        {label}
      </span>
      <span
        className={`display-tight tabular text-[22px] ${
          accent ? "text-win-gold" : "text-jordan-black"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
