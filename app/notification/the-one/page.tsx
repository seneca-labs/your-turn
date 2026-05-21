"use client";
import { useEffect, useRef } from "react";
import {
  PhoneFrame,
  ScreenBack,
  IOSStatusBar,
  IOSHomeIndicator,
  LockScreenAffordances,
} from "@/components/ui";
import { notificationArrive } from "@/lib/animations";
import anime from "animejs";
import { Jumpman } from "@/components/icons";

export default function TheOneInvite() {
  const cardRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<SVGRectElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    anime({
      targets: [clockRef.current, dateRef.current],
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 700,
      delay: anime.stagger(80, { start: 80 }),
      easing: "easeOutExpo",
    });
    if (cardRef.current) notificationArrive(cardRef.current, 520);
    if (borderRef.current) {
      const len = borderRef.current.getTotalLength();
      borderRef.current.style.strokeDasharray = `${len}`;
      borderRef.current.style.strokeDashoffset = `${len}`;
      anime({
        targets: borderRef.current,
        strokeDashoffset: [len, 0],
        duration: 1600,
        delay: 1100,
        easing: "easeOutExpo",
      });
    }
  }, []);

  return (
    <PhoneFrame bg="#FFFFFF">
      <ScreenBack />

      {/* Wallpaper — light asphalt with gold warmth */}
      <div className="absolute inset-0 asphalt-bg" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 32%, rgba(245,242,235,0.7) 0%, rgba(255,255,255,0) 55%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(212,169,56,0.14) 0%, rgba(255,255,255,0) 60%)",
        }}
      />

      <IOSStatusBar tone="light" />
      <LockScreenAffordances tone="light" />

      <div className="relative h-full flex flex-col items-center pt-[92px]">
        <div
          ref={clockRef}
          className="display-tight text-jordan-black text-[92px] leading-none tabular tracking-[-0.03em]"
        >
          8:42
        </div>
        <div
          ref={dateRef}
          className="mt-1 font-mono text-[13px] tracking-tight text-jordan-black/70"
        >
          Saturday, May 21
        </div>

        {/* Invite card — iOS vibrancy on light with traced gold border */}
        <div
          ref={cardRef}
          className="relative mt-10 w-[358px] rounded-2xl p-4 backdrop-blur-xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.88)",
            border: "0.5px solid rgba(184,144,42,0.45)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.6) inset, 0 14px 32px rgba(184,144,42,0.18), 0 6px 14px rgba(10,10,10,0.08)",
          }}
        >
          {/* Traced gold border */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 358 240"
            preserveAspectRatio="none"
          >
            <rect
              ref={borderRef}
              x="3"
              y="3"
              width="352"
              height="234"
              rx="14"
              stroke="#B8902A"
              strokeWidth="1"
              fill="none"
            />
          </svg>

          {/* Header */}
          <div className="flex items-center justify-between mb-3 relative">
            <div className="flex items-center gap-2">
              <div className="h-[28px] w-[28px] rounded-md bg-jordan-black flex items-center justify-center shadow-[inset_0_0_0_0.5px_rgba(212,169,56,0.6)]">
                <Jumpman size={18} className="text-win-gold" />
              </div>
              <span className="font-mono text-[10px] tracking-hud uppercase text-jordan-black/75">
                Jordan Brand
              </span>
            </div>
            <span className="font-mono text-[11px] text-jordan-black/55 lowercase">
              now
            </span>
          </div>

          {/* Kicker */}
          <div
            className="font-mono text-[10px] tracking-hud uppercase mb-2 relative"
            style={{ color: "#8E6B1F" }}
          >
            You&apos;ve been invited
          </div>

          {/* Headline */}
          <div className="display-tight text-jordan-black text-[34px] leading-[0.9] mb-1 relative">
            THE ONE
          </div>
          <div
            className="display-tight text-[20px] leading-[0.95] mb-3 relative"
            style={{ color: "#8E6B1F" }}
          >
            REGIONAL QUALIFIER
          </div>

          {/* Body */}
          <div className="font-mono text-[11px] tracking-tight text-jordan-black/65 mb-4 relative">
            June 15 · NYC · Pier 17
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-2 relative">
            <button className="flex-1 py-2.5 px-3 rounded-md border border-jordan-black/20 font-mono text-[11px] tracking-hud uppercase text-jordan-black/80 hover:border-jordan-black/50 hover:text-jordan-black transition-colors">
              Details
            </button>
            <button
              className="flex-1 py-2.5 px-3 rounded-md font-mono text-[11px] tracking-hud uppercase text-jordan-black font-bold transition-transform active:scale-95"
              style={{
                background:
                  "linear-gradient(180deg, #E8C054 0%, #C99B2B 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.4), 0 6px 14px rgba(184,144,42,0.35)",
              }}
            >
              Accept
            </button>
          </div>
        </div>
      </div>

      <IOSHomeIndicator tone="light" />
    </PhoneFrame>
  );
}
