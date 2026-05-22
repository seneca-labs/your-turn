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

const IOS_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';

export default function TheOneInvite() {
  const cardRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<SVGRectElement>(null);
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
    if (borderRef.current) {
      const len = borderRef.current.getTotalLength();
      borderRef.current.style.strokeDasharray = `${len}`;
      borderRef.current.style.strokeDashoffset = `${len}`;
      anime({
        targets: borderRef.current,
        strokeDashoffset: [len, 0],
        duration: 2100,
        delay: 1400,
        easing: "easeOutExpo",
      });
    }
  }, []);

  return (
    <PhoneFrame bg="#0F1A24">
      <ScreenBack />

      {/* Wallpaper — same Jumpman dunk shot as the standard lockscreen */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/wallpapers/lockscreen.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Top + bottom darkening so iOS chrome stays legible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.30) 100%)",
        }}
      />
      {/* Gold halo behind the invite card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 62%, rgba(212,169,56,0.18) 0%, rgba(212,169,56,0) 45%)",
        }}
      />

      <IOSStatusBar tone="dark" />
      <LockScreenAffordances tone="dark" />

      <div
        className="relative h-full flex flex-col items-center pt-[92px]"
        style={{ fontFamily: IOS_FONT }}
      >
        <div
          ref={clockRef}
          className="text-white text-[88px] leading-none tabular tracking-[-0.04em]"
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

        {/* Invite card — dark-mode iOS vibrancy with traced gold border */}
        <div
          ref={cardRef}
          className="relative mt-10 w-[358px] rounded-2xl p-4 backdrop-blur-2xl overflow-hidden"
          style={{
            background: "rgba(20,24,32,0.62)",
            border: "0.5px solid rgba(212,169,56,0.55)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.08) inset, 0 14px 32px rgba(184,144,42,0.22), 0 6px 14px rgba(0,0,0,0.30)",
            fontFamily: IOS_FONT,
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
              stroke="#E8C054"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>

          {/* Header */}
          <div className="flex items-center justify-between mb-3 relative">
            <div className="flex items-center gap-2">
              <div className="h-[28px] w-[28px] rounded-md bg-jordan-black flex items-center justify-center shadow-[inset_0_0_0_0.5px_rgba(212,169,56,0.6)]">
                <Jumpman size={18} className="text-win-gold" />
              </div>
              <span
                className="text-[13px] tracking-tight text-white/95 font-semibold"
                style={{ fontFamily: IOS_FONT }}
              >
                JORDAN BRAND
              </span>
            </div>
            <span
              className="text-[12px] text-white/55"
              style={{ fontFamily: IOS_FONT }}
            >
              now
            </span>
          </div>

          {/* Kicker */}
          <div
            className="text-[12px] tracking-wide uppercase mb-2 relative font-medium"
            style={{ color: "#E8C054", fontFamily: IOS_FONT }}
          >
            You&apos;ve been invited
          </div>

          {/* Headline — keeps the display font as a deliberate brand moment */}
          <div className="display-tight text-white text-[34px] leading-[0.9] mb-1 relative">
            THE ONE
          </div>
          <div
            className="display-tight text-[20px] leading-[0.95] mb-3 relative"
            style={{ color: "#E8C054" }}
          >
            REGIONAL QUALIFIER
          </div>

          {/* Body */}
          <div
            className="text-[14px] tracking-tight text-white/80 mb-4 relative"
            style={{ fontFamily: IOS_FONT }}
          >
            June 15 · NYC · Pier 17
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-2 relative">
            <button
              className="flex-1 py-2.5 px-3 rounded-md border border-white/20 text-[13px] text-white/85 hover:border-white/40 hover:text-white transition-colors font-medium"
              style={{ fontFamily: IOS_FONT }}
            >
              Details
            </button>
            <button
              className="flex-1 py-2.5 px-3 rounded-md text-[13px] text-jordan-black font-semibold transition-transform active:scale-95"
              style={{
                background:
                  "linear-gradient(180deg, #E8C054 0%, #C99B2B 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.4), 0 6px 14px rgba(184,144,42,0.45)",
                fontFamily: IOS_FONT,
              }}
            >
              Accept
            </button>
          </div>
        </div>
      </div>

      <IOSHomeIndicator tone="dark" />
    </PhoneFrame>
  );
}
