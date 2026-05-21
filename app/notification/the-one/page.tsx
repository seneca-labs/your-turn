"use client";
import { useEffect, useRef } from "react";
import { PhoneFrame, ScreenBack } from "@/components/ui";
import { slideDown } from "@/lib/animations";
import anime from "animejs";
import { Jumpman } from "@/components/icons";

export default function TheOneInvite() {
  const cardRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (cardRef.current) slideDown(cardRef.current, 200);
    if (borderRef.current) {
      const len = borderRef.current.getTotalLength();
      borderRef.current.style.strokeDasharray = `${len}`;
      borderRef.current.style.strokeDashoffset = `${len}`;
      anime({
        targets: borderRef.current,
        strokeDashoffset: [len, 0],
        duration: 1600,
        delay: 600,
        easing: "easeOutExpo",
      });
    }
  }, []);

  return (
    <PhoneFrame bg="#000">
      <ScreenBack />
      <div className="absolute inset-0 asphalt-bg" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(212,169,56,0.20) 0%, rgba(0,0,0,0) 60%)",
        }}
      />

      <div className="relative h-full flex flex-col items-center pt-16">
        <div className="display-tight text-bone text-[88px] leading-none tabular">
          8:42
        </div>
        <div className="mt-2 font-mono text-[12px] tracking-hud uppercase text-bone/80">
          Saturday, May 21
        </div>

        <div
          ref={cardRef}
          className="relative mt-10 w-[358px] rounded-xs bg-[rgba(20,20,20,0.92)] backdrop-blur-md p-5 overflow-hidden"
          style={{ border: "1px solid rgba(212,169,56,0.55)" }}
        >
          {/* Traced border */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 358 220"
            preserveAspectRatio="none"
          >
            <path
              ref={borderRef}
              d="M1 1 L357 1 L357 219 L1 219 Z"
              stroke="#D4A938"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>

          <div className="flex items-center justify-between mb-3 relative">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xs bg-win-gold flex items-center justify-center">
                <Jumpman size={20} className="text-jordan-black" />
              </div>
              <span className="font-mono text-[11px] tracking-hud uppercase text-bone">
                Jordan Brand
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-hud uppercase text-sweat">
              Now
            </span>
          </div>

          <div className="font-mono text-[10px] tracking-label uppercase text-win-gold mb-2 relative">
            You&apos;ve been invited
          </div>

          <div className="display-tight text-bone text-[34px] leading-[0.9] mb-3 relative">
            THE ONE
            <br />
            <span className="text-win-gold text-[22px]">REGIONAL QUALIFIER</span>
          </div>

          <div className="font-mono text-[10px] tracking-hud uppercase text-pg-dim mb-4 relative">
            June 15 · NYC · Pier 17
          </div>

          <div className="flex items-center gap-3 relative">
            <button className="flex-1 py-2 px-3 rounded-xs border border-bone/30 font-mono text-[10px] tracking-hud uppercase text-bone hover:border-bone transition-colors">
              Details
            </button>
            <button className="flex-1 py-2 px-3 rounded-xs bg-win-gold font-mono text-[10px] tracking-hud uppercase text-jordan-black font-bold">
              Accept
            </button>
          </div>
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
