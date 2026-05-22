"use client";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { PhoneFrame, ScreenBack } from "@/components/ui";
import { CourtSVG, Jumpman } from "@/components/icons";
import { flipNumber } from "@/lib/animations";

export default function GameLive() {
  const [home, setHome] = useState(7);
  const [away, setAway] = useState(4);
  const [clock, setClock] = useState("12:34");
  const homeRef = useRef<HTMLSpanElement>(null);
  const awayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => {
      if (homeRef.current) flipNumber(homeRef.current, "8");
      setHome(8);
    }, 1600);
    const t2 = setTimeout(() => {
      if (awayRef.current) flipNumber(awayRef.current, "5");
      setAway(5);
    }, 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const [m, s] = clock.split(":").map(Number);
      let next = s - 1;
      let nm = m;
      if (next < 0) {
        next = 59;
        nm -= 1;
      }
      setClock(`${String(nm).padStart(2, "0")}:${String(next).padStart(2, "0")}`);
    }, 1000);
    return () => clearInterval(id);
  }, [clock]);

  useEffect(() => {
    anime({
      targets: ".call-moment",
      scale: [1, 1.04, 1],
      duration: 1600,
      loop: true,
      easing: "easeInOutSine",
    });
  }, []);

  return (
    <PhoneFrame bg="#FFFFFF">
      <ScreenBack />
      <div className="absolute inset-0 asphalt-bg" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(206,17,38,0.06) 0%, rgba(255,255,255,0) 60%)",
        }}
      />
      <div className="absolute inset-0 pt-44 pb-32 px-2 opacity-70">
        <CourtSVG className="w-full h-full" />
      </div>

      {/* Unified scoreboard card */}
      <div className="relative pt-3 px-3 hairline-b pb-3 bg-white/85 backdrop-blur-md">
        <div className="hairline rounded-md bg-white shadow-[0_2px_10px_rgba(10,10,10,0.05)] px-3 py-2.5">
          {/* Meta row */}
          <div className="flex items-center justify-between font-mono text-[9px] tracking-hud uppercase text-sweat mb-2">
            <div className="flex items-center gap-1.5">
              <Jumpman size={11} className="text-varsity" />
              <span className="text-jordan-black/80">Live · Court 3</span>
            </div>
            <span className="tabular text-jordan-black/80">{clock}</span>
          </div>

          {/* Names row */}
          <div className="flex items-center justify-between font-mono text-[10px] tracking-hud uppercase text-jordan-black mb-0.5">
            <span className="font-bold">SWEET SHADOW</span>
            <span className="text-jordan-black/75">TWO-STEP</span>
          </div>

          {/* Centered grouped score */}
          <div className="flex items-center justify-center gap-3 leading-none">
            <span
              ref={homeRef}
              className="display-tight text-jordan-black text-[52px] tabular w-[1.2em] text-right"
            >
              {home}
            </span>
            <span className="display-tight text-jordan-black/30 text-[36px] leading-none">
              —
            </span>
            <span
              ref={awayRef}
              className="display-tight text-jordan-black text-[52px] tabular w-[1.2em] text-left"
            >
              {away}
            </span>
          </div>

          {/* Sub-meta row */}
          <div className="mt-1.5 flex items-center justify-between font-mono text-[9px] tracking-hud uppercase">
            <span className="inline-flex items-center gap-1.5 text-varsity font-bold">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-varsity animate-live-pulse" />
              Possession
            </span>
            <span className="text-sweat">First to 11 · Win by 2</span>
          </div>
        </div>
      </div>

      {/* Subtle player overlays on court */}
      <div className="absolute top-[42%] left-[24%] z-10">
        <span className="px-2 py-1 rounded-xs bg-white/85 border border-varsity font-mono text-[8px] tracking-hud uppercase text-jordan-black shadow-[0_2px_6px_rgba(10,10,10,0.06)]">
          SWEET SHADOW
        </span>
      </div>
      <div className="absolute top-[55%] right-[22%] z-10">
        <span className="px-2 py-1 rounded-xs bg-white/85 border border-jordan-black/40 font-mono text-[8px] tracking-hud uppercase text-jordan-black/80 shadow-[0_2px_6px_rgba(10,10,10,0.06)]">
          TWO-STEP
        </span>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 hairline-t bg-white/90 backdrop-blur-md px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <button className="call-moment flex-1 py-3 rounded-md border border-varsity text-varsity font-mono text-[11px] tracking-hud uppercase font-bold hover:bg-varsity hover:text-white transition-colors">
            Call Moment
          </button>
          <button className="px-4 py-3 rounded-md border border-jordan-black/25 text-jordan-black/75 font-mono text-[11px] tracking-hud uppercase hover:border-jordan-black hover:text-jordan-black">
            Dispute
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
