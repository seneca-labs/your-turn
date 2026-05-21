"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { PhoneFrame, ScreenBack } from "@/components/ui";
import { scrambleText } from "@/lib/animations";
import { Sneaker, Wing, Jumpman } from "@/components/icons";

export default function DropUnlocked() {
  const sneakerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const jumpmanRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Jumpman silhouette flies in first
    anime({
      targets: jumpmanRef.current,
      scale: [0.4, 1],
      opacity: [0, 1],
      rotate: [-20, 0],
      duration: 1000,
      easing: "easeOutExpo",
    });

    // Stamp clamps in
    anime({
      targets: stampRef.current,
      scale: [2.4, 1],
      opacity: [0, 1],
      duration: 500,
      delay: 600,
      easing: "easeOutBack",
    });

    // Sneaker scales in after the Jumpman lands
    anime({
      targets: sneakerRef.current,
      scale: [0.5, 1.05, 1],
      rotate: [-12, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: 400,
      easing: "easeOutExpo",
    });

    if (titleRef.current) {
      setTimeout(() => {
        if (titleRef.current)
          scrambleText(titleRef.current, "AIR JORDAN 1 / WEST 4TH", 800);
      }, 1000);
    }

    if (sparkRef.current) {
      for (let i = 0; i < 24; i++) {
        const dot = document.createElement("span");
        dot.className = "absolute rounded-full bg-win-gold pointer-events-none";
        dot.style.width = "3px";
        dot.style.height = "3px";
        dot.style.left = "50%";
        dot.style.top = "50%";
        sparkRef.current.appendChild(dot);
        anime({
          targets: dot,
          translateX: () => anime.random(-180, 180),
          translateY: () => anime.random(-160, 80),
          opacity: [1, 0],
          scale: [0.4, 1.2],
          delay: 600 + i * 22,
          duration: 1400,
          easing: "easeOutExpo",
        });
      }
    }
  }, []);

  return (
    <PhoneFrame bg="#000">
      <ScreenBack />

      {/* Layer 1 — radial gold glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(212,169,56,0.20) 0%, rgba(0,0,0,0) 65%)",
          animation: "pulse-gold 4s ease-in-out infinite",
        }}
      />
      <style>{`@keyframes pulse-gold { 0%, 100% { opacity: 1 } 50% { opacity: 0.6 } }`}</style>

      {/* Layer 2 — scanlines */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Layer 3 — halftone vignette */}
      <div
        className="absolute pointer-events-none halftone"
        style={{
          inset: 0,
          maskImage:
            "radial-gradient(ellipse at center, transparent 25%, black 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, transparent 25%, black 80%)",
        }}
      />

      {/* Layer 4 — massive Jumpman watermark behind everything */}
      <div
        ref={jumpmanRef}
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "44%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Jumpman size={520} className="text-win-gold opacity-[0.08]" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-between py-10 px-6">
        {/* Top stamp */}
        <div className="text-center">
          <div ref={stampRef} className="inline-flex items-center justify-center mb-3">
            <span className="stamp text-win-gold font-mono text-[12px] tracking-label font-bold flex items-center gap-2">
              <Jumpman size={14} className="text-win-gold" />
              Drop Unlocked
              <Jumpman size={14} className="text-win-gold" />
            </span>
          </div>
          <div className="font-mono text-[9px] tracking-hud uppercase text-sweat">
            Earned 2H ago · West 4th · Cert. #00012
          </div>
        </div>

        {/* Sneaker hero */}
        <div className="relative w-full" ref={sparkRef}>
          <div ref={sneakerRef} className="relative px-4">
            <Sneaker
              className="w-full h-auto drop-shadow-[0_0_30px_rgba(212,169,56,0.45)]"
              colorVariant="varsity"
            />
          </div>
        </div>

        {/* Title + reqs */}
        <div className="text-center w-full relative">
          <h1
            ref={titleRef}
            className="display-tight text-bone text-[34px] leading-[0.9]"
          />
          <div className="mt-3 flex items-center justify-center gap-3 font-mono text-[10px] tracking-hud uppercase">
            <span className="text-bone/70">Colorway</span>
            <span className="inline-block h-3 w-3 rounded-full bg-varsity" />
            <span className="inline-block h-3 w-3 rounded-full bg-jordan-black border border-bone/30" />
            <span className="text-bone">Black / Varsity Red</span>
          </div>
          <div className="mt-2 font-mono text-[9px] tracking-label uppercase text-sweat">
            Earned for holding the court 10 days
          </div>

          {/* CTAs */}
          <div className="mt-6 grid grid-cols-2 gap-2">
            <button className="py-3 rounded-xs border border-bone/30 font-mono text-[10px] tracking-hud uppercase text-bone hover:border-bone flex items-center justify-center gap-2">
              <Wing size={12} className="text-bone" />
              Share
            </button>
            <button className="py-3 rounded-xs bg-win-gold text-jordan-black font-mono text-[10px] tracking-hud uppercase font-bold flex items-center justify-center gap-2">
              <Jumpman size={12} className="text-jordan-black" />
              Add to Locker
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
