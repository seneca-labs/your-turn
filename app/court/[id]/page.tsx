"use client";
import { useEffect, useRef } from "react";
import { notFound, useParams } from "next/navigation";
import anime from "animejs";
import Link from "next/link";
import { PhoneFrame, ScreenBack, HypeIndicator } from "@/components/ui";
import { findCourt, courtActiveNicknames } from "@/lib/mockData";
import { CourtSVG, Jumpman } from "@/components/icons";

export default function CourtLivePage() {
  const params = useParams<{ id: string }>();
  const court = findCourt(params.id);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const courtRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!court) return;
    anime({ targets: courtRef.current, opacity: [0, 1], duration: 600, easing: "easeOutExpo" });
    if (pillsRef.current) {
      anime({
        targets: pillsRef.current.querySelectorAll(".pill"),
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: anime.stagger(100, { start: 300 }),
        duration: 400,
        easing: "easeOutExpo",
      });
    }
    anime({
      targets: ctaRef.current,
      boxShadow: [
        "0 0 0 rgba(206,17,38,0.0)",
        "0 0 24px rgba(206,17,38,0.5)",
        "0 0 0 rgba(206,17,38,0.0)",
      ],
      duration: 2000,
      loop: true,
      easing: "easeInOutSine",
    });
  }, [court]);

  if (!court) return notFound();

  const nicks = courtActiveNicknames[court.id] || [
    "TWO-STEP",
    "CROSSCITY",
    "SHAKE",
    "TALL MIKE",
    "JET",
    "WORKBOOT",
  ];

  // Hand-tuned positions around the court SVG (top half, court area).
  const positions = [
    { top: "12%", left: "10%", variant: "challenger" as const },
    { top: "22%", right: "8%" },
    { top: "38%", left: "6%" },
    { top: "45%", right: "10%" },
    { top: "58%", left: "30%" },
    { top: "60%", right: "28%" },
  ];

  return (
    <PhoneFrame bg="#FFFFFF">
      <ScreenBack />
      <div className="absolute inset-0 asphalt-bg" />
      {/* Status bar / hud */}
      <div className="relative pt-3 px-4 flex items-center justify-between font-mono text-[10px] tracking-hud uppercase">
        <div className="flex items-center gap-2">
          <Jumpman size={14} className="text-varsity" />
          <span className="text-jordan-black/80">Court Live</span>
        </div>
        <HypeIndicator count={court.activePlayers} label="playing now" />
      </div>

      {/* Hero court area */}
      <div ref={courtRef} className="relative mt-3 h-[460px] mx-2">
        <CourtSVG className="absolute inset-0 w-full h-full" />

        {/* Center title overlay */}
        <div className="absolute top-[42%] left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <div className="display-tight text-jordan-black text-[32px] leading-[0.85]">
            COURT 3
          </div>
          <div className="mt-1 font-mono text-[10px] tracking-hud uppercase text-jordan-black/70">
            {court.name}
          </div>
          <div className="font-mono text-[9px] tracking-label uppercase text-sweat">
            {court.neighborhood} · {court.borough}
          </div>
        </div>

        {/* Floating nickname pills */}
        <div ref={pillsRef} className="absolute inset-0">
          {nicks.slice(0, positions.length).map((nick, i) => {
            const p = positions[i];
            const isChallenger = "variant" in p && p.variant === "challenger";
            return (
              <span
                key={nick}
                className={`pill absolute inline-flex items-center gap-1 rounded-xs border ${
                  isChallenger
                    ? "border-varsity text-jordan-black bg-white"
                    : "border-jordan-black/40 text-jordan-black/80 bg-white/80"
                } px-2 py-1 font-mono text-[9px] tracking-hud uppercase`}
                style={{
                  top: p.top,
                  ...("left" in p ? { left: p.left } : {}),
                  ...("right" in p ? { right: p.right } : {}),
                }}
              >
                {isChallenger && (
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-hype animate-live-pulse" />
                )}
                {nick}
              </span>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 p-4 hairline-t bg-white/80 backdrop-blur-sm">
        <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-hud uppercase">
          <span className="text-sweat">CHALLENGER</span>
          <span className="text-varsity">TWO-STEP · NEIGHBORHOOD #12</span>
        </div>
        <Link
          ref={ctaRef}
          href="/matchup/two-step"
          className="block w-full text-center py-4 rounded-xs bg-varsity font-mono text-[13px] tracking-hud uppercase text-white font-bold"
        >
          Accept The Run
        </Link>
        <div className="mt-2 text-center font-mono text-[9px] tracking-label uppercase text-sweat">
          Tap to lock in — Decline forfeits position
        </div>
      </div>
    </PhoneFrame>
  );
}
