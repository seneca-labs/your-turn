"use client";
import { useEffect, useRef } from "react";
import { notFound, useParams } from "next/navigation";
import anime from "animejs";
import { PhoneFrame, ScreenBack } from "@/components/ui";
import { user, opponents, findOpponent } from "@/lib/mockData";
import { Wing } from "@/components/icons";
import Link from "next/link";

export default function MatchupPage() {
  const params = useParams<{ opponent: string }>();
  const opp = findOpponent(params.opponent);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const vsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!opp) return;
    anime({
      targets: leftRef.current,
      translateX: [-80, 0],
      opacity: [0, 1],
      duration: 500,
      easing: "easeOutExpo",
    });
    anime({
      targets: rightRef.current,
      translateX: [80, 0],
      opacity: [0, 1],
      duration: 500,
      easing: "easeOutExpo",
    });
    anime({
      targets: vsRef.current,
      scale: [0.4, 1.1, 1],
      opacity: [0, 1],
      duration: 700,
      delay: 250,
      easing: "easeOutBack",
    });
  }, [opp]);

  if (!opp) return notFound();

  // Intimidation scales visual weight on opponent side.
  // White theme: low/medium stay light, high flips to dark for max contrast (the only dark surface on the page).
  const oppWeight = {
    low: { size: "text-[56px]", side: "bg-white", accent: "text-jordan-black" },
    medium: { size: "text-[68px]", side: "bg-[#F5F2EB]", accent: "text-jordan-black" },
    high: { size: "text-[84px]", side: "bg-jordan-black", accent: "text-white" },
  }[opp.intimidation];

  return (
    <PhoneFrame bg="#FFFFFF">
      <ScreenBack />
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="pt-10 px-5 hairline-b pb-3 text-center">
          <div className="font-mono text-[9px] tracking-label uppercase text-sweat">
            Tale of the Tape
          </div>
          <div className="mt-1 font-mono text-[10px] tracking-hud uppercase text-jordan-black/70">
            {opp.homeCourt === user.homeCourt ? "HOME COURT · WEST 4TH" : "AWAY · " + opp.homeCourt.toUpperCase()}
          </div>
        </div>

        {/* Body — vertical split */}
        <div className="flex-1 grid grid-cols-2 relative overflow-hidden">
          {/* Left — Sweet Shadow */}
          <div ref={leftRef} className="asphalt-bg p-4 flex flex-col justify-between hairline-r">
            <div>
              <div className="font-mono text-[9px] tracking-label uppercase text-sweat mb-2">
                CHALLENGER
              </div>
              <h2 className="display-tight text-jordan-black text-[44px] leading-[0.85]">
                {user.nickname.split(" ").map((w, i) => (
                  <div key={i}>{w}</div>
                ))}
              </h2>
              <div className="mt-2 font-mono text-[9px] tracking-hud uppercase text-jordan-black/60">
                {user.homeCourt}
              </div>
            </div>
            <div className="space-y-3">
              <StatLine label="Record" value={`${user.record.wins}-${user.record.losses}`} />
              <StatLine label="Streak" value={`W${user.record.currentStreak}`} accent />
              <StatLine label="Fadeaway" value={user.signatureStats.fadeaway} />
              <StatLine label="+/-" value={user.signatureStats.closeOut} />
            </div>
          </div>

          {/* Right — Opponent */}
          <div ref={rightRef} className={`p-4 flex flex-col justify-between ${oppWeight.side}`}>
            <div>
              <div className="font-mono text-[9px] tracking-label uppercase text-sweat mb-2 text-right">
                {opp.intimidation === "high" ? "BORO KING" : opp.intimidation === "medium" ? "VETERAN" : "OPPONENT"}
              </div>
              <h2 className={`display-tight ${oppWeight.accent} ${oppWeight.size} leading-[0.85] text-right`}>
                {opp.nickname.split(" ").map((w, i) => (
                  <div key={i}>{w}</div>
                ))}
              </h2>
              <div className="mt-2 font-mono text-[9px] tracking-hud uppercase text-jordan-black/60 text-right">
                {opp.homeCourt}
              </div>
            </div>
            <div className="space-y-3">
              <StatLine
                label="Record"
                value={`${opp.record.wins}-${opp.record.losses}`}
                align="right"
                accent={opp.intimidation === "high"}
              />
              <StatLine
                label="Streak"
                value={`W${opp.record.currentStreak}`}
                accent={opp.record.currentStreak >= 7}
                align="right"
              />
              {opp.signatureStats && (
                <>
                  <StatLine label="Fadeaway" value={opp.signatureStats.fadeaway} align="right" />
                  <StatLine label="+/-" value={opp.signatureStats.closeOut} align="right" />
                </>
              )}
            </div>
          </div>

          {/* VS centered overlay */}
          <div
            ref={vsRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
          >
            <div className="relative">
              <div
                className="display-tight text-varsity text-[80px] leading-none"
                style={{ textShadow: "0 0 24px rgba(206,17,38,0.6)" }}
              >
                VS
              </div>
              <Wing
                size={48}
                className="text-varsity absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-40"
              />
            </div>
          </div>
        </div>

        {/* Footer CTA + variant nav */}
        <div className="hairline-t p-4 space-y-3">
          <Link
            href="/game/live"
            className="block w-full text-center py-3 rounded-xs bg-varsity font-mono text-[12px] tracking-hud uppercase text-white font-bold"
          >
            Accept the Run
          </Link>
          <div className="flex items-center justify-between font-mono text-[9px] tracking-label uppercase text-sweat">
            <span>Rotate · 3 of 3</span>
            <div className="flex gap-2">
              {opponents.map((o) => (
                <Link
                  key={o.id}
                  href={`/matchup/${o.id}`}
                  className={`h-1.5 w-6 rounded-full ${o.id === opp.id ? "bg-varsity" : "bg-jordan-black/20"}`}
                  aria-label={o.nickname}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
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
    <div className={`flex items-baseline ${align === "right" ? "flex-row-reverse" : ""} justify-between`}>
      <span className="font-mono text-[9px] tracking-label uppercase text-sweat">
        {label}
      </span>
      <span
        className={`display-tight tabular text-[24px] ${accent ? "text-win-gold" : "text-jordan-black"}`}
      >
        {value}
      </span>
    </div>
  );
}
