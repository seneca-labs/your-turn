"use client";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { PhoneFrame, ScreenBack, NicknamePill } from "@/components/ui";
import { highlights } from "@/lib/mockData";
import { Flame, Snow, Skull, Jumpman } from "@/components/icons";
import { flipNumber } from "@/lib/animations";

export default function FeedPage() {
  const [showStats, setShowStats] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const recordRef = useRef<HTMLSpanElement>(null);
  const rankRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowStats(true);
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showStats || !overlayRef.current) return;
    anime({
      targets: overlayRef.current,
      translateY: [120, 0],
      opacity: [0, 1],
      duration: 600,
      easing: "easeOutExpo",
    });
    setTimeout(() => {
      if (recordRef.current) flipNumber(recordRef.current, "13-3");
      if (rankRef.current) flipNumber(rankRef.current, "#44");
    }, 500);
  }, [showStats]);

  return (
    <PhoneFrame bg="#000">
      <ScreenBack />
      <div className="absolute inset-0 asphalt-bg opacity-50" />

      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-3 flex items-center justify-between font-mono text-[10px] tracking-hud uppercase bg-gradient-to-b from-jordan-black/80 to-transparent pb-6">
        <div className="flex items-center gap-2 text-bone/80">
          <Jumpman size={14} className="text-varsity" />
          <span>Feed</span>
        </div>
        <div className="flex gap-3 text-bone/60">
          <span>Fresh</span>
          <span className="text-bone">Following</span>
          <span>Hot</span>
        </div>
      </div>

      {/* Feed list (snap) */}
      <div className="h-full overflow-y-auto snap-feed no-scrollbar">
        {highlights.map((h, i) => (
          <article
            key={h.id}
            className="relative h-full w-full snap-start flex items-end p-4"
          >
            {/* Video / thumbnail visualization */}
            <div className="absolute inset-0 concrete-bg">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, rgba(206,17,38,${0.10 + i * 0.05}), rgba(0,0,0,0.5)), repeating-linear-gradient(45deg, rgba(245,242,235,0.04) 0px, rgba(245,242,235,0.04) 1px, transparent 1px, transparent 6px)`,
                }}
              />
              {/* Ken-burns motion vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-jordan-black via-jordan-black/40 to-transparent" />
              {/* "playing" indicator */}
              <div className="absolute top-12 left-4 flex items-center gap-2 font-mono text-[9px] tracking-hud uppercase text-bone/70">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-hype animate-live-pulse" />
                Playing · 00:0{i + 4}
              </div>
            </div>

            {/* Bottom left meta */}
            <div className="relative z-10 max-w-[68%] space-y-2">
              <NicknamePill name={h.player} size="sm" variant={h.player.includes("SHADOW") ? "self" : "default"} />
              <div className="font-mono text-[10px] tracking-hud uppercase text-bone/80">
                {h.court.toUpperCase().replace("-", " ")} · {h.timestamp}
              </div>
              <h2 className="display-tight text-bone text-[36px] leading-[0.9]">
                {h.caption}
              </h2>
            </div>

            {/* Right reaction stack */}
            <div className="absolute right-3 bottom-24 z-10 space-y-3">
              <ReactionButton icon={<Flame size={18} />} count={h.fire} color="hype" />
              <ReactionButton icon={<Snow size={18} />} count={h.cold} color="pg-dim" />
              <ReactionButton icon={<Skull size={18} />} count={h.hype} color="bone" />
            </div>
          </article>
        ))}
      </div>

      {/* Stats live update overlay */}
      {showStats && (
        <div
          ref={overlayRef}
          className="absolute bottom-0 left-0 right-0 z-40 hairline-t bg-jordan-black/95 backdrop-blur-md p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Jumpman size={14} className="text-win-gold" />
              <span className="font-mono text-[10px] tracking-label uppercase text-win-gold">
                Record Updated
              </span>
            </div>
            <button
              onClick={() => setShowStats(false)}
              className="font-mono text-[10px] tracking-hud uppercase text-sweat hover:text-bone"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <StatChip label="Record" valueRef={recordRef} initial="12-3" />
            <StatChip label="Rank" valueRef={rankRef} initial="#47" accent />
            <StatChip label="Streak" initial="W5" accent />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xs border border-win-gold bg-win-gold/10">
            <span className="display-tight text-win-gold text-[14px]">NEW DROP</span>
            <span className="font-mono text-[10px] tracking-hud uppercase text-bone">
              AIR JORDAN 1 / WEST 4TH unlocked
            </span>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}

function ReactionButton({
  icon,
  count,
  color,
}: {
  icon: React.ReactNode;
  count: number;
  color: "hype" | "bone" | "pg-dim";
}) {
  const colorClass = color === "hype" ? "text-hype" : color === "pg-dim" ? "text-pg-dim" : "text-bone";
  return (
    <button className={`flex flex-col items-center gap-1 ${colorClass}`}>
      <span className="h-9 w-9 rounded-xs border border-current/40 flex items-center justify-center bg-jordan-black/60">
        {icon}
      </span>
      <span className="font-mono text-[9px] tabular tracking-hud">{count}</span>
    </button>
  );
}

function StatChip({
  label,
  initial,
  accent = false,
  valueRef,
}: {
  label: string;
  initial: string;
  accent?: boolean;
  valueRef?: React.RefObject<HTMLSpanElement>;
}) {
  return (
    <div className="concrete-bg hairline rounded-xs p-2">
      <div className="font-mono text-[8px] tracking-label uppercase text-sweat mb-1">
        {label}
      </div>
      <span
        ref={valueRef}
        className={`display-tight text-[22px] tabular ${accent ? "text-win-gold" : "text-bone"}`}
      >
        {initial}
      </span>
    </div>
  );
}
