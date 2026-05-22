"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { PhoneFrame, ScreenBack } from "@/components/ui";
import { Jumpman } from "@/components/icons";

export default function CapturePage() {
  const hypeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hype meter fluctuate
    if (hypeRef.current) {
      anime({
        targets: hypeRef.current,
        height: ["40%", "82%"],
        duration: 900,
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
      });
    }
  }, []);

  return (
    <PhoneFrame bg="#000000">
      <ScreenBack />

      {/* Live viewfinder — looping video */}
      <video
        src="/capture-backdrop.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Subtle top/bottom darkening so HUD chrome stays legible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 18%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* HUD chrome — top */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between font-mono text-[10px] tracking-hud uppercase">
        <div className="flex items-center gap-2">
          <Jumpman size={14} className="text-varsity" />
          <span className="text-white/90">Capture</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 rounded-xs border border-hype bg-jordan-black/40 backdrop-blur-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-hype animate-rec-blink" />
          <span className="text-hype tabular">REC · 00:08</span>
        </div>
      </div>

      <FrameBrackets />

      {/* Hype meter (right vertical bar) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-44 w-2 rounded-xs bg-white/15 overflow-hidden">
        <div
          ref={hypeRef}
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-varsity via-hype to-win-gold"
          style={{ height: "60%" }}
        />
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 translate-y-28 z-20 font-mono text-[8px] tracking-label uppercase text-white/70">
        HYPE
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-6 pt-3 bg-gradient-to-t from-jordan-black/80 to-transparent">
        <div className="flex items-end justify-between mb-4">
          <button className="font-mono text-[10px] tracking-hud uppercase text-white/80">
            Album
          </button>
          <button className="h-16 w-16 rounded-full border-4 border-white bg-varsity flex items-center justify-center">
            <span className="h-12 w-12 rounded-full bg-varsity ring-2 ring-white" />
          </button>
          <button className="font-mono text-[10px] tracking-hud uppercase text-white/80">
            Flip
          </button>
        </div>
        <button className="w-full py-3 rounded-xs bg-jordan-black/60 backdrop-blur-sm border border-varsity font-mono text-[11px] tracking-hud uppercase text-varsity hover:bg-varsity hover:text-white transition-colors">
          Tag Highlight
        </button>
      </div>
    </PhoneFrame>
  );
}

function FrameBrackets() {
  const corner = "absolute h-6 w-6 border-white/70";
  return (
    <>
      <span className={`${corner} top-12 left-3 border-l border-t`} />
      <span className={`${corner} top-12 right-3 border-r border-t`} />
      <span className={`${corner} bottom-32 left-3 border-l border-b`} />
      <span className={`${corner} bottom-32 right-3 border-r border-b`} />
    </>
  );
}
