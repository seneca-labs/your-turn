"use client";
import { useEffect, useRef } from "react";
import { PhoneFrame, ScreenBack } from "@/components/ui";
import { slideDown } from "@/lib/animations";
import { Jumpman } from "@/components/icons";
import Link from "next/link";

export default function NotificationScreen() {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (cardRef.current) slideDown(cardRef.current, 200);
  }, []);

  return (
    <PhoneFrame bg="#000">
      <ScreenBack />
      {/* Wallpaper — asphalt with subtle vignette */}
      <div className="absolute inset-0 asphalt-bg" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(206,17,38,0.10) 0%, rgba(0,0,0,0) 60%)",
        }}
      />

      <div className="relative h-full flex flex-col items-center pt-20">
        {/* Time */}
        <div className="display-tight text-bone text-[88px] leading-none tabular">
          8:42
        </div>
        <div className="mt-2 font-mono text-[12px] tracking-hud uppercase text-bone/80">
          Saturday, May 21
        </div>

        {/* Notification card */}
        <div
          ref={cardRef}
          className="mt-12 w-[342px] rounded-xs hairline bg-[rgba(20,20,20,0.85)] backdrop-blur-md p-4"
          style={{ borderColor: "rgba(206,17,38,0.45)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-xs bg-varsity flex items-center justify-center">
                <Jumpman size={18} className="text-bone" />
              </div>
              <span className="font-mono text-[11px] tracking-hud uppercase text-bone">
                Your Turn
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-hud uppercase text-sweat">
              Now
            </span>
          </div>

          <div className="display-tight text-bone text-[22px] leading-tight mb-2">
            TWO-STEP CALLED YOU OUT
          </div>

          <div className="font-mono text-[11px] tracking-hud uppercase text-pg-slate mb-3">
            Court 3 · West 4th · Today
          </div>

          <Link
            href="/court/west-4th"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-hud uppercase text-varsity hover:text-bone transition-colors"
          >
            Tap to accept
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="animate-nudge-right">
              <path d="M1 4 H9 M6 1 L9 4 L6 7" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </Link>
        </div>

        <div className="absolute bottom-12 left-0 right-0 text-center">
          <div className="font-mono text-[10px] tracking-label uppercase text-bone/40">
            Swipe up to open
          </div>
          <div className="mt-3 mx-auto h-1 w-32 rounded-full bg-bone/60" />
        </div>
      </div>
    </PhoneFrame>
  );
}
