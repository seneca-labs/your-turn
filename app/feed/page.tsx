"use client";
import { useEffect, useRef } from "react";
import { PhoneFrame, ScreenBack, NicknamePill } from "@/components/ui";
import { highlights } from "@/lib/mockData";
import { Flame, Snow, Skull, Jumpman } from "@/components/icons";

export default function FeedPage() {
  const feedRef = useRef<HTMLDivElement>(null);

  // Up/down arrows scroll the snap feed prev/next card.
  // Captured here at the page level so PhoneFrame's global left/right
  // demo nav stays intact and isn't shadowed.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      const container = feedRef.current;
      if (!container) return;
      e.preventDefault();
      const cardHeight = container.clientHeight;
      const currentIndex = Math.round(container.scrollTop / cardHeight);
      const nextIndex = Math.max(
        0,
        Math.min(
          highlights.length - 1,
          currentIndex + (e.key === "ArrowDown" ? 1 : -1),
        ),
      );
      container.scrollTo({ top: nextIndex * cardHeight, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <PhoneFrame bg="#FFFFFF">
      <ScreenBack />
      <div className="absolute inset-0 asphalt-bg opacity-50" />

      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-3 flex items-center justify-between font-mono text-[10px] tracking-hud uppercase bg-gradient-to-b from-white/85 to-transparent pb-6">
        <div className="flex items-center gap-2 text-jordan-black/80">
          <Jumpman size={14} className="text-varsity" />
          <span>Feed</span>
        </div>
        <div className="flex gap-3 text-jordan-black/60">
          <span>Fresh</span>
          <span className="text-jordan-black">Following</span>
          <span>Hot</span>
        </div>
      </div>

      {/* Feed list (snap) */}
      <div ref={feedRef} className="h-full overflow-y-auto snap-feed no-scrollbar">
        {highlights.map((h, i) => (
          <article
            key={h.id}
            className="relative h-full w-full snap-start flex items-end p-4"
          >
            {/* Video / thumbnail visualization */}
            <div className="absolute inset-0 concrete-bg overflow-hidden">
              {h.video ? (
                <video
                  src={h.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, rgba(206,17,38,${0.10 + i * 0.05}), rgba(0,0,0,0.5)), repeating-linear-gradient(45deg, rgba(10,10,10,0.04) 0px, rgba(10,10,10,0.04) 1px, transparent 1px, transparent 6px)`,
                  }}
                />
              )}
              {/* Bottom legibility scrim — slightly heavier when video is present */}
              <div
                className={`absolute inset-0 ${
                  h.video
                    ? "bg-gradient-to-t from-jordan-black/80 via-jordan-black/15 to-jordan-black/35"
                    : "bg-gradient-to-t from-white via-white/60 to-transparent"
                }`}
              />
              <div
                className={`absolute top-12 left-4 flex items-center gap-2 font-mono text-[9px] tracking-hud uppercase ${
                  h.video ? "text-white/85" : "text-jordan-black/70"
                }`}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-hype animate-live-pulse" />
                Playing · 00:0{i + 4}
              </div>
            </div>

            {/* Bottom left meta — flips to white over video, dark over the textured placeholder */}
            <div className="relative z-10 max-w-[68%] space-y-2">
              <NicknamePill name={h.player} size="sm" variant={h.player.includes("SHADOW") ? "self" : "default"} />
              <div
                className={`font-mono text-[10px] tracking-hud uppercase ${
                  h.video ? "text-white/90" : "text-jordan-black/80"
                }`}
              >
                {h.court.toUpperCase().replace("-", " ")} · {h.timestamp}
              </div>
              <h2
                className={`display-tight text-[36px] leading-[0.9] ${
                  h.video ? "text-white" : "text-jordan-black"
                }`}
              >
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
  const colorClass = color === "hype" ? "text-hype" : color === "pg-dim" ? "text-sweat" : "text-jordan-black";
  return (
    <button className={`flex flex-col items-center gap-1 ${colorClass}`}>
      <span className="h-9 w-9 rounded-xs border border-current/40 flex items-center justify-center bg-white/60">
        {icon}
      </span>
      <span className="font-mono text-[9px] tabular tracking-hud">{count}</span>
    </button>
  );
}
