"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { PhoneFrame, ScreenBack } from "@/components/ui";
import { drops } from "@/lib/mockData";
import { Sneaker, Jumpman } from "@/components/icons";

export default function LockerPage() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      anime({
        targets: ref.current.querySelectorAll(".drop"),
        opacity: [0, 1],
        scale: [0.9, 1],
        delay: anime.stagger(70),
        duration: 400,
        easing: "easeOutExpo",
      });
    }
  }, []);

  return (
    <PhoneFrame bg="#0A0A0A">
      <ScreenBack />
      <div className="relative h-full overflow-y-auto no-scrollbar">
        <div className="pt-3 px-4 flex items-center justify-between font-mono text-[10px] tracking-hud uppercase">
          <div className="flex items-center gap-2">
            <Jumpman size={14} className="text-varsity" />
            <span className="text-bone/80">Locker</span>
          </div>
          <span className="text-sweat tabular">2 / 9 EARNED</span>
        </div>

        <div className="px-4 mt-4 mb-5">
          <div className="font-mono text-[9px] tracking-label uppercase text-sweat">
            Sweet Shadow&apos;s drops
          </div>
          <h1 className="display-tight text-bone text-[34px] leading-[0.9] mt-1">
            EARNED ON COURT
          </h1>
        </div>

        <div ref={ref} className="px-4 pb-12 grid grid-cols-2 gap-3">
          {drops.map((d) => (
            <div
              key={d.id}
              className={`drop hairline rounded-xs concrete-bg p-3 flex flex-col ${
                d.status === "locked" ? "opacity-60" : ""
              }`}
              style={
                d.status === "unlocked"
                  ? { borderColor: "rgba(212,169,56,0.40)" }
                  : {}
              }
            >
              <div className="aspect-[5/3] flex items-center justify-center mb-2 relative">
                <Sneaker
                  className={`w-full h-auto ${d.status === "locked" ? "grayscale" : ""}`}
                  colorVariant={
                    d.id === "d1"
                      ? "varsity"
                      : d.id === "d2"
                      ? "bone"
                      : "concrete"
                  }
                />
                {d.status === "locked" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="5"
                        y="11"
                        width="14"
                        height="10"
                        rx="1"
                        stroke="#F5F2EB"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8 11 V7 A4 4 0 0 1 16 7 V11"
                        stroke="#F5F2EB"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div
                className={`display-tight text-[13px] leading-tight mb-1 ${
                  d.status === "unlocked" ? "text-win-gold" : "text-bone/80"
                }`}
              >
                {d.name}
              </div>
              <div className="font-mono text-[8px] tracking-hud uppercase text-sweat">
                {d.status === "unlocked" ? `EARNED · ${d.earnedFor}` : `LOCKED · ${d.requirement}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
