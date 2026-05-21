"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import anime from "animejs";
import { Jumpman } from "@/components/icons";
import { demoOrder } from "@/lib/mockData";

const PAUSE_MS = 4000;

export default function Demo() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const goPrev = useCallback(() => {
    setPaused(true);
    setIdx((i) => (i + demoOrder.length - 1) % demoOrder.length);
  }, []);
  const goNext = useCallback(() => {
    setPaused(true);
    setIdx((i) => (i + 1) % demoOrder.length);
  }, []);

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

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
            onClick={goPrev}
            className="px-2 py-1 rounded-xs border border-jordan-black/30 font-mono text-[10px] tracking-hud uppercase text-jordan-black hover:border-jordan-black"
          >
            Prev
          </button>
          <button
            onClick={goNext}
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
      <div className="flex-1 relative flex items-center justify-center p-4">
        <button
          onClick={goPrev}
          aria-label="Previous screen"
          className="group absolute left-4 top-1/2 -translate-y-1/2 z-10 h-16 w-16 rounded-xs hairline bg-white/80 backdrop-blur-sm flex items-center justify-center text-jordan-black/70 hover:text-jordan-black hover:bg-white hover:border-jordan-black/40 transition-all"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M14 4 L7 11 L14 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
          </svg>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-hud uppercase text-jordan-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            ←
          </span>
        </button>

        <iframe
          key={route}
          src={route}
          className="phone hairline shadow-card relative z-0"
          title={route}
        />

        <button
          onClick={goNext}
          aria-label="Next screen"
          className="group absolute right-4 top-1/2 -translate-y-1/2 z-10 h-16 w-16 rounded-xs hairline bg-white/80 backdrop-blur-sm flex items-center justify-center text-jordan-black/70 hover:text-jordan-black hover:bg-white hover:border-jordan-black/40 transition-all"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M8 4 L15 11 L8 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
          </svg>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-hud uppercase text-jordan-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </span>
        </button>
      </div>

      <div className="px-4 pb-3 font-mono text-[9px] tracking-hud uppercase text-jordan-black/40 text-center">
        ← / → to navigate · Space to pause
      </div>
    </div>
  );
}
