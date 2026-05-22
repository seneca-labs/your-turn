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

// iOS system font stack — uses SF Pro Display/Text on Apple devices.
const IOS_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';

export default function NotificationScreen() {
  const cardRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    anime({
      targets: [clockRef.current, dateRef.current],
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 900,
      delay: anime.stagger(120, { start: 120 }),
      easing: "easeOutExpo",
    });
    if (cardRef.current) notificationArrive(cardRef.current, 700);
  }, []);

  return (
    <PhoneFrame bg="#0F1A24">
      <ScreenBack />

      {/* Wallpaper — user-supplied Jumpman dunk shot */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/wallpapers/lockscreen.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Subtle top darken so the white iOS clock stays legible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.30) 100%)",
        }}
      />

      {/* iOS chrome */}
      <IOSStatusBar tone="dark" />
      <LockScreenAffordances tone="dark" />

      <div
        className="relative h-full flex flex-col items-center pt-[92px]"
        style={{ fontFamily: IOS_FONT }}
      >
        {/* Lock-screen clock */}
        <div
          ref={clockRef}
          className="text-white text-[88px] leading-none tabular tracking-[-0.04em] font-thin"
          style={{ fontFamily: IOS_FONT, fontWeight: 200 }}
        >
          8:42
        </div>
        <div
          ref={dateRef}
          className="mt-1 text-[15px] tracking-tight text-white/85 font-medium"
          style={{ fontFamily: IOS_FONT }}
        >
          Saturday, May 21
        </div>

        {/* Notification card — iOS dark-mode vibrancy */}
        <div
          ref={cardRef}
          className="mt-12 w-[358px] rounded-2xl p-3.5 backdrop-blur-2xl"
          style={{
            background: "rgba(20,24,32,0.55)",
            border: "0.5px solid rgba(255,255,255,0.10)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.06) inset, 0 12px 28px rgba(0,0,0,0.30), 0 2px 6px rgba(0,0,0,0.18)",
            fontFamily: IOS_FONT,
          }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="h-[26px] w-[26px] rounded-md bg-varsity flex items-center justify-center shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]">
                <Jumpman size={16} className="text-white" />
              </div>
              <span
                className="text-[13px] tracking-tight text-white/95 font-semibold"
                style={{ fontFamily: IOS_FONT }}
              >
                YOUR TURN
              </span>
            </div>
            <span
              className="text-[12px] text-white/55"
              style={{ fontFamily: IOS_FONT }}
            >
              now
            </span>
          </div>

          {/* Title */}
          <div
            className="text-white text-[15px] leading-[1.25] mb-0.5 font-semibold"
            style={{ fontFamily: IOS_FONT }}
          >
            TWO-STEP called you out
          </div>

          {/* Body */}
          <div
            className="text-[14px] tracking-tight text-white/80 leading-[1.3] mb-3"
            style={{ fontFamily: IOS_FONT }}
          >
            Court 3 · West 4th · Today
          </div>

          {/* CTA */}
          <Link
            href="/court/west-4th"
            className="inline-flex items-center gap-1.5 text-[13px] text-varsity hover:text-hype transition-colors font-medium"
            style={{ fontFamily: IOS_FONT }}
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

      <IOSHomeIndicator tone="dark" />
    </PhoneFrame>
  );
}
