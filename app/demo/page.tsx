"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import anime from "animejs";
import { Jumpman } from "@/components/icons";
import { demoOrder } from "@/lib/mockData";

const PAUSE_MS = 4000;

export default function Demo() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    if (progressRef.current) {
      progressRef.current.style.width = "0%";
      anime({
        targets: progressRef.current,
        width: ["0%", "100%"],
        duration: PAUSE_MS,
        easing: "linear",
      });
    }
    const t = setTimeout(() => setIdx((i) => (i + 1) % demoOrder.length), PAUSE_MS);
    return () => clearTimeout(t);
  }, [idx, paused]);

  const route = demoOrder[idx];

  return (
    <div className="min-h-dvh bg-[#EAE7E0] flex flex-col">
      {/* HUD bar */}
      <header className="flex items-center justify-between px-4 py-3 hairline-b">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-hud uppercase">
          <Jumpman size={14} className="text-varsity" />
          <span className="text-jordan-black/80">Demo Cycle</span>
          <span className="text-sweat tabular">
            {String(idx + 1).padStart(2, "0")} / {String(demoOrder.length).padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-hud uppercase text-jordan-black/60 hidden sm:inline">
            {route}
          </span>
          <button
            onClick={() => setPaused((p) => !p)}
            className="px-2 py-1 rounded-xs border border-jordan-black/30 font-mono text-[10px] tracking-hud uppercase text-jordan-black hover:border-jordan-black"
          >
            {paused ? "Play" : "Pause"}
          </button>
          <button
            onClick={() => setIdx((i) => (i + demoOrder.length - 1) % demoOrder.length)}
            className="px-2 py-1 rounded-xs border border-jordan-black/30 font-mono text-[10px] tracking-hud uppercase text-jordan-black hover:border-jordan-black"
          >
            Prev
          </button>
          <button
            onClick={() => setIdx((i) => (i + 1) % demoOrder.length)}
            className="px-2 py-1 rounded-xs border border-jordan-black/30 font-mono text-[10px] tracking-hud uppercase text-jordan-black hover:border-jordan-black"
          >
            Next
          </button>
          <Link
            href="/"
            className="px-2 py-1 rounded-xs border border-jordan-black/30 font-mono text-[10px] tracking-hud uppercase text-jordan-black hover:border-jordan-black"
          >
            Exit
          </Link>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-0.5 bg-jordan-black/10 relative">
        <div ref={progressRef} className="h-full bg-varsity" style={{ width: "0%" }} />
      </div>

      {/* Iframe stage */}
      <div className="flex-1 flex items-center justify-center p-4">
        <iframe
          key={route}
          src={route}
          className="phone hairline shadow-card"
          title={route}
        />
      </div>
    </div>
  );
}
