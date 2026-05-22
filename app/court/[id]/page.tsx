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
import { findCourt, findOpponent } from "@/lib/mockData";
import { Jumpman } from "@/components/icons";

const CHALLENGER_ID = "two-step";

export default function CourtLivePage() {
  const params = useParams<{ id: string }>();
  const court = findCourt(params.id);

  const headerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!court) return;

    if (headerRef.current) {
      anime({
        targets: headerRef.current.querySelectorAll(".hd-row"),
        opacity: [0, 1],
        translateY: [-8, 0],
        duration: 500,
        delay: anime.stagger(70, { start: 80 }),
        easing: "easeOutExpo",
      });
    }

    if (photoRef.current) {
      anime({
        targets: photoRef.current,
        opacity: [0, 1],
        translateX: [-40, 0],
        duration: 800,
        delay: 200,
        easing: "cubicBezier(0.16, 1, 0.3, 1)",
      });
    }

    if (statsRef.current) {
      anime({
        targets: statsRef.current.querySelectorAll(".stat-row"),
        opacity: [0, 1],
        translateX: [20, 0],
        duration: 520,
        delay: anime.stagger(90, { start: 500 }),
        easing: "cubicBezier(0.16, 1, 0.3, 1)",
      });
    }

    if (calloutRef.current) {
      anime({
        targets: calloutRef.current,
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 600,
        delay: 1100,
        easing: "cubicBezier(0.16, 1, 0.3, 1)",
      });
    }

    if (sheetRef.current) {
      anime({
        targets: sheetRef.current,
        translateY: ["100%", "0%"],
        opacity: [0, 1],
        duration: 700,
        delay: 1300,
        easing: "cubicBezier(0.16, 1, 0.3, 1)",
      });
    }

    if (ctaRef.current) {
      anime({
        targets: ctaRef.current,
        boxShadow: [
          "0 6px 14px rgba(206,17,38,0.18)",
          "0 12px 28px rgba(206,17,38,0.45)",
          "0 6px 14px rgba(206,17,38,0.18)",
        ],
        duration: 2400,
        delay: 2000,
        loop: true,
        easing: "easeInOutSine",
      });
    }
  }, [court]);

  if (!court) return notFound();

  const challenger = findOpponent(CHALLENGER_ID);
  if (!challenger) return notFound();

  return (
    <PhoneFrame bg="#FFFFFF">
      <ScreenBack />
      <div className="absolute inset-0 asphalt-bg opacity-40" />

      <IOSStatusBar tone="light" />

      {/* Header */}
      <div ref={headerRef} className="relative pt-[44px] px-4 pb-3">
        <div className="hd-row flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Jumpman size={12} className="text-varsity" />
            <span className="font-mono text-[9px] tracking-hud uppercase text-jordan-black/60">
              Court Live
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-hype/10 border border-hype/30">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-hype animate-live-pulse" />
            <span className="font-mono text-[9px] tracking-hud uppercase text-hype font-bold">
              Live
            </span>
          </span>
        </div>

        <div className="hd-row">
          <div className="display-tight text-jordan-black text-[32px] leading-[0.9]">
            Court 3
          </div>
          <div className="mt-0.5 font-mono text-[11px] tracking-tight text-jordan-black/70">
            {court.name}
          </div>
          <div className="font-mono text-[9px] tracking-hud uppercase text-sweat mt-0.5">
            {court.neighborhood} · {court.borough}
          </div>
        </div>
      </div>

      {/* Body — photo left, stats right */}
      <div className="relative px-4 mt-1 grid grid-cols-[1.4fr_1fr] gap-3 h-[440px]">
        {/* Photo column */}
        <div
          ref={photoRef}
          className="relative rounded-md overflow-hidden bg-[#F5F2EB]"
          style={{ opacity: 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={challenger.photo}
            alt={challenger.nickname}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          {/* Atmospheric bottom gradient so the nickname pill sits cleanly */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)",
            }}
          />
          {/* Top-left challenger tag */}
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-varsity text-white font-mono text-[8px] tracking-hud uppercase font-bold shadow-[0_4px_10px_rgba(206,17,38,0.4)]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-live-pulse" />
              Challenger
            </span>
          </div>
          {/* Bottom nickname overlay */}
          <div className="absolute bottom-2 left-2 right-2 z-10">
            <h2 className="display-tight text-white text-[28px] leading-[0.9]">
              {challenger.nickname.split(" ").map((word, i) => (
                <div key={i}>{word}</div>
              ))}
            </h2>
            <div className="mt-1 font-mono text-[9px] tracking-hud uppercase text-white/80">
              {challenger.homeCourt}
            </div>
          </div>
        </div>

        {/* Stats column */}
        <div ref={statsRef} className="flex flex-col gap-2">
          <StatRow label="Record" value={`${challenger.record.wins}-${challenger.record.losses}`} />
          <StatRow
            label="Streak"
            value={`W${challenger.record.currentStreak}`}
            accent
          />
          <StatRow
            label="Neighborhood"
            value={`#${challenger.rank.neighborhood}`}
          />
          {challenger.signatureStats && (
            <>
              <StatRow label="Fadeaway" value={challenger.signatureStats.fadeaway} />
              <StatRow
                label="Ankles"
                value={challenger.signatureStats.crossover.split(" ")[0]}
              />
              <StatRow
                label="+/-"
                value={challenger.signatureStats.closeOut}
                accent={challenger.signatureStats.closeOut.startsWith("+")}
              />
            </>
          )}
          <div className="stat-row hairline rounded-md p-2.5 bg-white mt-auto">
            <div className="font-mono text-[8px] tracking-label uppercase text-sweat">
              Reps for
            </div>
            <div className="display-tight text-jordan-black text-[14px] leading-none mt-1">
              {challenger.team.name}
            </div>
          </div>
        </div>
      </div>

      {/* Callout */}
      <div
        ref={calloutRef}
        className="relative px-5 mt-4"
        style={{ opacity: 0 }}
      >
        <div className="hairline rounded-md bg-white p-3 text-center">
          <div className="font-mono text-[9px] tracking-label uppercase text-sweat mb-1">
            Incoming Challenge
          </div>
          <div className="font-mono text-[13px] tracking-tight text-jordan-black leading-snug">
            <span className="font-bold">{challenger.nickname.replace("-", " ")}</span> challenged
            you. Will you answer the call?
          </div>
        </div>
      </div>

      {/* Bottom action sheet */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 left-0 right-0 z-30 px-4 pt-2 pb-7"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          borderTop: "0.5px solid rgba(10,10,10,0.08)",
          boxShadow: "0 -14px 32px rgba(10,10,10,0.08)",
          opacity: 0,
          transform: "translateY(100%)",
        }}
      >
        <div className="flex justify-center mb-2">
          <div className="h-[5px] w-9 rounded-full bg-jordan-black/20" />
        </div>

        <Link
          ref={ctaRef}
          href={`/matchup/${challenger.id}`}
          className="group relative block w-full text-center py-3.5 rounded-md bg-varsity font-mono text-[13px] tracking-hud uppercase text-white font-bold overflow-hidden"
          style={{ boxShadow: "0 6px 14px rgba(206,17,38,0.30)" }}
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
              <path d="M1 5 H12 M9 1 L13 5 L9 9" stroke="currentColor" strokeWidth="1.6" />
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

        <div className="mt-2 text-center font-mono text-[9px] tracking-hud uppercase text-jordan-black/45">
          Tap to lock in · Decline forfeits position
        </div>
      </div>

      <IOSHomeIndicator tone="light" />
    </PhoneFrame>
  );
}

function StatRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="stat-row flex items-center justify-between hairline rounded-md px-2.5 py-1.5 bg-white">
      <span className="font-mono text-[9px] tracking-hud uppercase text-sweat">
        {label}
      </span>
      <span
        className={`display-tight text-[18px] tabular leading-none ${
          accent ? "text-win-gold" : "text-jordan-black"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
