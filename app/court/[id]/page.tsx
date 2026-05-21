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
import {
  findCourt,
  findOpponent,
  courtActiveNicknames,
  user,
} from "@/lib/mockData";
import { CourtSVG, Jumpman, Avatar } from "@/components/icons";
import { countUp } from "@/lib/animations";

const CHALLENGER_ID = "two-step";

interface PillPos {
  top: string;
  left?: string;
  right?: string;
  role?: "challenger" | "self";
}

export default function CourtLivePage() {
  const params = useParams<{ id: string }>();
  const court = findCourt(params.id);

  const courtRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroPillRef = useRef<HTMLDivElement>(null);
  const sidePillsRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!court) return;

    // 1. Header lands first
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

    // 2. Active player count ticks up
    if (countRef.current) {
      countUp(countRef.current, court.activePlayers, 1100);
    }

    // 3. Court lines fade in (stagger across primitives)
    if (courtRef.current) {
      const lines = courtRef.current.querySelectorAll(
        "svg rect, svg line, svg path, svg circle",
      );
      anime({
        targets: lines,
        opacity: [0, 1],
        delay: anime.stagger(35, { start: 250 }),
        duration: 500,
        easing: "easeOutQuad",
      });
    }

    // 4. Background opponent pills filter in
    if (sidePillsRef.current) {
      anime({
        targets: sidePillsRef.current.querySelectorAll(".pill"),
        opacity: [0, 1],
        scale: [0.85, 1],
        delay: anime.stagger(90, { start: 700 }),
        duration: 420,
        easing: "easeOutExpo",
      });
    }

    // 5. Hero challenger pill drops with weight
    if (heroPillRef.current) {
      anime({
        targets: heroPillRef.current,
        opacity: [0, 1],
        translateY: [-10, 0],
        scale: [0.94, 1],
        duration: 620,
        delay: 1100,
        easing: "cubicBezier(0.16, 1, 0.3, 1)",
      });
    }

    // 6. Action sheet slides up
    if (sheetRef.current) {
      anime({
        targets: sheetRef.current,
        translateY: ["100%", "0%"],
        opacity: [0, 1],
        duration: 700,
        delay: 1400,
        easing: "cubicBezier(0.16, 1, 0.3, 1)",
      });
    }

    // 7. CTA pulses while waiting for accept
    if (ctaRef.current) {
      anime({
        targets: ctaRef.current,
        boxShadow: [
          "0 6px 14px rgba(206,17,38,0.18)",
          "0 12px 28px rgba(206,17,38,0.45)",
          "0 6px 14px rgba(206,17,38,0.18)",
        ],
        duration: 2400,
        delay: 2100,
        loop: true,
        easing: "easeInOutSine",
      });
    }
  }, [court]);

  if (!court) return notFound();

  const challenger = findOpponent(CHALLENGER_ID);
  const otherNicks = (courtActiveNicknames[court.id] || [])
    .filter((n) => n !== challenger?.nickname && n !== user.nickname)
    .slice(0, 5);

  // Background opponent positions — leaves a clear band around the hero (25–50%)
  // and the self pill (78–90%). Pills cluster at the top wings and mid-baseline.
  const sidePositions: PillPos[] = [
    { top: "6%", right: "10%" },   // top-right wing
    { top: "14%", left: "10%" },   // top-left wing
    { top: "54%", left: "6%" },    // mid-left baseline
    { top: "58%", right: "8%" },   // mid-right baseline
    { top: "70%", left: "16%" },   // backcourt left
  ];

  // Hero challenger pill — center-court forward
  const heroPos: PillPos = { top: "32%", left: "50%", role: "challenger" };

  // Self pill — bottom of court, near halfcourt circle
  const selfPos: PillPos = { top: "82%", left: "50%", role: "self" };

  return (
    <PhoneFrame bg="#FFFFFF">
      <ScreenBack />

      {/* Wallpaper */}
      <div className="absolute inset-0 asphalt-bg" />

      <IOSStatusBar tone="light" />

      {/* Screen header */}
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

        <div className="hd-row flex items-end justify-between">
          <div>
            <div className="display-tight text-jordan-black text-[34px] leading-[0.9]">
              Court 3
            </div>
            <div className="mt-0.5 font-mono text-[11px] tracking-tight text-jordan-black/70">
              {court.name}
            </div>
            <div className="font-mono text-[9px] tracking-hud uppercase text-sweat mt-0.5">
              {court.neighborhood} · {court.borough}
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[9px] tracking-hud uppercase text-jordan-black/60">
              Playing now
            </div>
            <div className="flex items-baseline justify-end gap-1 mt-0.5">
              <span
                ref={countRef}
                className="display-tight text-jordan-black text-[28px] leading-none tabular"
              >
                0
              </span>
              <span className="font-mono text-[10px] tracking-hud uppercase text-jordan-black/50">
                / 10
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Court area */}
      <div
        ref={courtRef}
        className="relative mx-2 mt-1 h-[440px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(245,242,235,0.6) 0%, rgba(255,255,255,0) 100%)",
          borderRadius: "4px",
        }}
      >
        <CourtSVG className="absolute inset-0 w-full h-full" />

        {/* Subtle rim accent (warm) */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "calc(11% - 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: 32,
            height: 32,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(206,17,38,0.18) 0%, rgba(206,17,38,0) 70%)",
          }}
        />

        {/* Background opponent avatars */}
        <div ref={sidePillsRef} className="absolute inset-0 pointer-events-none">
          {otherNicks.map((nick, i) => {
            const p = sidePositions[i];
            if (!p) return null;
            return (
              <div
                key={nick}
                className="pill absolute flex flex-col items-center gap-0.5"
                style={{
                  top: p.top,
                  ...("left" in p ? { left: p.left } : {}),
                  ...("right" in p ? { right: p.right } : {}),
                }}
              >
                <Avatar size={30} tone="default" />
                <span className="font-mono text-[8px] tracking-hud uppercase text-jordan-black/55 leading-none">
                  {nick}
                </span>
              </div>
            );
          })}
        </div>

        {/* Hero challenger avatar */}
        <div
          ref={heroPillRef}
          className="absolute pointer-events-none"
          style={{
            top: heroPos.top,
            left: heroPos.left,
            transform: "translateX(-50%)",
            opacity: 0,
          }}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-[8px] tracking-label uppercase text-varsity font-bold">
              Challenger
            </span>
            <div className="relative">
              <Avatar size={52} tone="challenger" />
              <span
                className="absolute -top-0.5 -right-0.5 inline-block h-2.5 w-2.5 rounded-full bg-hype animate-live-pulse"
                style={{ boxShadow: "0 0 0 2px #FFFFFF" }}
              />
              <span
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow:
                    "0 0 0 4px rgba(206,17,38,0.12), 0 6px 16px rgba(206,17,38,0.22)",
                }}
              />
            </div>
            <span className="font-mono text-[10px] tracking-hud uppercase text-jordan-black font-bold leading-none mt-0.5">
              {challenger?.nickname || "TWO-STEP"}
            </span>
          </div>
        </div>

        {/* Self avatar */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: selfPos.top,
            left: selfPos.left,
            transform: "translateX(-50%)",
          }}
        >
          <div className="flex flex-col items-center gap-1">
            <div className="relative">
              <Avatar size={44} tone="self" />
              <span
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow:
                    "0 0 0 3px rgba(184,144,42,0.18), 0 4px 12px rgba(184,144,42,0.25)",
                }}
              />
            </div>
            <span className="font-mono text-[9px] tracking-hud uppercase text-jordan-black font-bold leading-none">
              {user.nickname}
            </span>
            <span
              className="font-mono text-[8px] tracking-label uppercase font-bold leading-none"
              style={{ color: "#8E6B1F" }}
            >
              You
            </span>
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
        {/* Drag handle */}
        <div className="flex justify-center mb-2">
          <div className="h-[5px] w-9 rounded-full bg-jordan-black/20" />
        </div>

        {/* Opponent preview row */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2.5">
            <Avatar size={38} tone="challenger" />
            <div>
              <div className="display-tight text-jordan-black text-[18px] leading-none">
                {challenger?.nickname || "TWO-STEP"}
              </div>
              <div className="mt-0.5 font-mono text-[9px] tracking-hud uppercase text-sweat">
                {challenger?.record.wins}-{challenger?.record.losses} ·{" "}
                Neighborhood #{challenger?.rank.neighborhood}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[8px] tracking-label uppercase text-jordan-black/50">
              Fadeaway
            </div>
            <div className="font-mono text-[12px] tabular text-jordan-black font-bold">
              {challenger?.signatureStats.fadeaway}
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          ref={ctaRef}
          href={`/matchup/${challenger?.id || "two-step"}`}
          className="group relative block w-full text-center py-3.5 rounded-md bg-varsity font-mono text-[13px] tracking-hud uppercase text-white font-bold overflow-hidden"
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
          {/* Inner highlight */}
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
