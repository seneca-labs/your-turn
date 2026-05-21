"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { PhoneFrame, ScreenBack } from "@/components/ui";
import { Jumpman } from "@/components/icons";

export default function CapturePage() {
  const tagRef = useRef<HTMLDivElement>(null);
  const hypeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Tag drift
    if (tagRef.current) {
      anime({
        targets: tagRef.current,
        translateX: [-8, 8],
        duration: 2400,
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
      });
    }
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
    <PhoneFrame bg="#000">
      <ScreenBack />
      {/* Viewfinder — stylized basketball court scene */}
      <div className="absolute inset-0 asphalt-bg" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      {/* "Player" silhouette as geometric body shape */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Court ground perspective lines */}
        <g stroke="rgba(245,242,235,0.06)" strokeWidth="1">
          <line x1="0" y1="660" x2="390" y2="660" />
          <line x1="60" y1="660" x2="-80" y2="844" />
          <line x1="130" y1="660" x2="80" y2="844" />
          <line x1="200" y1="660" x2="195" y2="844" />
          <line x1="270" y1="660" x2="320" y2="844" />
          <line x1="330" y1="660" x2="460" y2="844" />
        </g>
      </svg>

      {/* Hooper subject — actual Jumpman silhouette centered in viewfinder */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{ left: "50%", top: "44%", transform: "translate(-50%, -50%)" }}
      >
        <Jumpman size={260} className="text-jordan-black drop-shadow-[0_0_2px_rgba(245,242,235,0.4)]" />
      </div>

      {/* HUD chrome */}
      {/* Top */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between font-mono text-[10px] tracking-hud uppercase">
        <div className="flex items-center gap-2">
          <Jumpman size={14} className="text-varsity" />
          <span className="text-bone/80">Capture</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 rounded-xs border border-hype">
          <span className="inline-block h-2 w-2 rounded-full bg-hype animate-rec-blink" />
          <span className="text-hype tabular">REC · 00:08</span>
        </div>
      </div>

      {/* Corner frame brackets */}
      <FrameBrackets />

      {/* Tag overlay */}
      <div
        ref={tagRef}
        className="absolute top-[33%] left-1/2 -translate-x-1/2 z-20"
      >
        <div className="relative">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-jordan-black border-l border-t border-varsity" />
          <span className="inline-flex items-center gap-1 rounded-xs border border-varsity bg-jordan-black px-2 py-1 font-mono text-[10px] tracking-hud uppercase text-bone">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-varsity" />
            SWEET SHADOW
          </span>
        </div>
      </div>

      {/* Hype meter (right vertical bar) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-44 w-2 rounded-xs bg-bone/10 overflow-hidden">
        <div
          ref={hypeRef}
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-varsity via-hype to-win-gold"
          style={{ height: "60%" }}
        />
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 translate-y-28 z-20 font-mono text-[8px] tracking-label uppercase text-sweat">
        HYPE
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-6 pt-3 bg-gradient-to-t from-jordan-black to-transparent">
        <div className="flex items-end justify-between mb-4">
          <button className="font-mono text-[10px] tracking-hud uppercase text-bone/70">
            Album
          </button>
          <button className="h-16 w-16 rounded-full border-4 border-bone bg-varsity flex items-center justify-center">
            <span className="h-12 w-12 rounded-full bg-varsity ring-2 ring-jordan-black" />
          </button>
          <button className="font-mono text-[10px] tracking-hud uppercase text-bone/70">
            Flip
          </button>
        </div>
        <button className="w-full py-3 rounded-xs bg-jordan-black border border-varsity font-mono text-[11px] tracking-hud uppercase text-varsity hover:bg-varsity hover:text-bone transition-colors">
          Tag Highlight
        </button>
      </div>
    </PhoneFrame>
  );
}

function FrameBrackets() {
  const corner = "absolute h-6 w-6 border-bone/50";
  return (
    <>
      <span className={`${corner} top-12 left-3 border-l border-t`} />
      <span className={`${corner} top-12 right-3 border-r border-t`} />
      <span className={`${corner} bottom-32 left-3 border-l border-b`} />
      <span className={`${corner} bottom-32 right-3 border-r border-b`} />
    </>
  );
}
