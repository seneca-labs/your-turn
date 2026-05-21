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
import { Jumpman } from "@/components/icons";
import anime from "animejs";
import Link from "next/link";

export default function NotificationScreen() {
  const cardRef = useRef<HTMLDivElement>(null);
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
  }, []);

  return (
    <PhoneFrame bg="#FFFFFF">
      <ScreenBack />

      {/* Wallpaper — light asphalt with soft bone vignette */}
      <div className="absolute inset-0 asphalt-bg" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(245,242,235,0.6) 0%, rgba(255,255,255,0) 55%)",
        }}
      />
      {/* Subtle brand warmth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 25%, rgba(206,17,38,0.06) 0%, rgba(255,255,255,0) 55%)",
        }}
      />

      {/* iOS chrome */}
      <IOSStatusBar tone="light" />
      <LockScreenAffordances tone="light" />

      <div className="relative h-full flex flex-col items-center pt-[92px]">
        {/* Lock-screen clock */}
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

        {/* Notification card — iOS vibrancy on light */}
        <div
          ref={cardRef}
          className="mt-12 w-[358px] rounded-2xl p-3.5 backdrop-blur-xl"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "0.5px solid rgba(10,10,10,0.06)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.6) inset, 0 12px 28px rgba(10,10,10,0.10), 0 2px 6px rgba(10,10,10,0.06)",
          }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="h-[26px] w-[26px] rounded-md bg-varsity flex items-center justify-center shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]">
                <Jumpman size={16} className="text-white" />
              </div>
              <span className="font-mono text-[12px] tracking-tight text-jordan-black/75 lowercase">
                <span className="uppercase tracking-hud text-[10px]">Your Turn</span>
              </span>
            </div>
            <span className="font-mono text-[11px] text-jordan-black/55 lowercase">
              now
            </span>
          </div>

          {/* Title */}
          <div className="display-tight text-jordan-black text-[22px] leading-[1.05] mb-1.5">
            TWO-STEP CALLED YOU OUT
          </div>

          {/* Body */}
          <div className="font-mono text-[12px] tracking-tight text-jordan-black/65 leading-snug mb-3">
            Court 3 · West 4th · Today
          </div>

          {/* CTA */}
          <Link
            href="/court/west-4th"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-hud uppercase text-varsity hover:text-hype transition-colors"
          >
            <span>Tap to accept</span>
            <svg
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
              className="animate-nudge-right"
            >
              <path
                d="M1 4 H9 M6 1 L9 4 L6 7"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </Link>
        </div>
      </div>

      <IOSHomeIndicator tone="light" />
    </PhoneFrame>
  );
}
