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

  // Simulate point ticks
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
            "radial-gradient(circle at 50% 35%, rgba(206,17,38,0.08) 0%, rgba(0,0,0,0) 60%)",
        }}
      />
      {/* Court visualization underneath */}
      <div className="absolute inset-0 pt-20 pb-32 px-2 opacity-70">
        <CourtSVG className="w-full h-full" />
      </div>

      {/* Top score bar */}
      <div className="relative pt-3 px-4 hairline-b pb-3 bg-white/60 backdrop-blur-sm">
        <div className="flex items-center justify-between font-mono text-[9px] tracking-label uppercase text-sweat mb-2">
          <div className="flex items-center gap-2">
            <Jumpman size={12} className="text-varsity" />
            <span>Live · Court 3</span>
          </div>
          <span className="tabular text-jordan-black">{clock}</span>
        </div>
        <div className="flex items-stretch justify-between">
          <ScoreSide name="SWEET SHADOW" value={home} sideRef={homeRef} isHome />
          <div className="display-tight text-sweat text-[28px] self-center px-2">
            —
          </div>
          <ScoreSide name="TWO-STEP" value={away} sideRef={awayRef} />
        </div>
        <div className="mt-2 flex items-center justify-between font-mono text-[8px] tracking-hud uppercase text-jordan-black/60">
          <span className="text-varsity">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-varsity mr-1 align-middle" />
            POSSESSION
          </span>
          <span>First to 11 · Win by 2</span>
        </div>
      </div>

      {/* Subtle player overlays on court */}
      <div className="absolute top-[40%] left-[28%] z-10">
        <span className="px-2 py-1 rounded-xs bg-white/80 border border-varsity font-mono text-[8px] tracking-hud uppercase text-jordan-black">
          SWEET SHADOW
        </span>
      </div>
      <div className="absolute top-[50%] right-[24%] z-10">
        <span className="px-2 py-1 rounded-xs bg-white/80 border border-jordan-black/40 font-mono text-[8px] tracking-hud uppercase text-jordan-black/80">
          TWO-STEP
        </span>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 hairline-t bg-white/80 backdrop-blur-sm px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <button className="call-moment flex-1 py-3 rounded-xs border border-varsity text-varsity font-mono text-[11px] tracking-hud uppercase hover:bg-varsity hover:text-white transition-colors">
            Call Moment
          </button>
          <button className="px-4 py-3 rounded-xs border border-jordan-black/30 text-jordan-black/70 font-mono text-[11px] tracking-hud uppercase hover:border-jordan-black hover:text-jordan-black">
            Dispute
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScoreSide({
  name,
  value,
  sideRef,
  isHome = false,
}: {
  name: string;
  value: number;
  sideRef: React.RefObject<HTMLSpanElement>;
  isHome?: boolean;
}) {
  return (
    <div className={`flex-1 ${isHome ? "text-left" : "text-right"}`}>
      <div className="font-mono text-[9px] tracking-hud uppercase text-jordan-black/70 truncate">
        {name}
      </div>
      <span
        ref={sideRef}
        className={`display-tight text-[56px] leading-none tabular block ${
          isHome ? "text-jordan-black" : "text-jordan-black"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
