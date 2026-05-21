"use client";
import { useEffect, useRef } from "react";
import { useParams, notFound } from "next/navigation";
import anime from "animejs";
import { PhoneFrame, ScreenBack, HypeIndicator } from "@/components/ui";
import { findCourt, leaderboardCourt } from "@/lib/mockData";
import { CourtSVG, Jumpman } from "@/components/icons";

export default function CourtDetail() {
  const params = useParams<{ id: string }>();
  const court = findCourt(params.id);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!court) return;
    if (containerRef.current) {
      anime({
        targets: containerRef.current.querySelectorAll(".section"),
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 500,
        delay: anime.stagger(120),
        easing: "easeOutExpo",
      });
    }
  }, [court]);

  if (!court) return notFound();

  return (
    <PhoneFrame bg="#FFFFFF">
      <ScreenBack />
      <div ref={containerRef} className="relative h-full overflow-y-auto no-scrollbar">
        {/* Hero court visual */}
        <div className="section relative h-[220px] asphalt-bg">
          <CourtSVG className="absolute inset-0 w-full h-full opacity-50" />
          <div
            className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent"
          />
          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <Jumpman size={14} className="text-varsity" />
              <span className="font-mono text-[10px] tracking-label uppercase text-jordan-black/70">
                {court.borough} · {court.neighborhood}
              </span>
            </div>
            <h1 className="display-tight text-jordan-black text-[36px] leading-[0.85]">
              {court.name.toUpperCase()}
            </h1>
            <div className="mt-2">
              <HypeIndicator count={court.activePlayers} label={court.status === "live" ? "playing now" : "court idle"} />
            </div>
          </div>
        </div>

        {/* Court info row */}
        <div className="section grid grid-cols-3 hairline-b">
          <Cell label="Size" value="HALF" />
          <Cell label="Surface" value="ASPHALT" />
          <Cell label="Vibe" value="FAST" accent />
        </div>

        {/* Top players */}
        <div className="section px-4 py-5 hairline-b">
          <div className="font-mono text-[9px] tracking-label uppercase text-sweat mb-3">
            Top this month
          </div>
          <div className="space-y-2">
            {leaderboardCourt.slice(0, 5).map((row) => (
              <div
                key={row.rank}
                className={`flex items-center gap-3 px-3 py-2 rounded-xs ${
                  row.highlight ? "bg-varsity/10 border-l-2 border-l-varsity" : "hairline"
                }`}
              >
                <span className="display-tight text-jordan-black/60 text-[20px] tabular w-6">
                  {row.rank}
                </span>
                <span className="flex-1 font-mono text-[11px] tracking-hud uppercase text-jordan-black">
                  {row.nickname}
                </span>
                <span className="font-mono text-[10px] tabular text-jordan-black/80">
                  {row.record}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next runs */}
        <div className="section px-4 py-5 hairline-b">
          <div className="font-mono text-[9px] tracking-label uppercase text-sweat mb-3">
            Next runs
          </div>
          <div className="space-y-2">
            {[
              { time: "TONIGHT · 7:30 PM", note: "RUN 5-on-5 · 6 OPEN" },
              { time: "TOMORROW · 11:00 AM", note: "OPEN GYM · 14 RSVP" },
              { time: "SUNDAY · 2:00 PM", note: "TOURNEY QUALIFIER" },
            ].map((r) => (
              <div
                key={r.time}
                className="flex items-center justify-between hairline rounded-xs px-3 py-3"
              >
                <div>
                  <div className="font-mono text-[10px] tracking-hud uppercase text-jordan-black">
                    {r.time}
                  </div>
                  <div className="font-mono text-[9px] tracking-hud uppercase text-sweat">
                    {r.note}
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-xs border border-jordan-black/30 text-jordan-black/80 font-mono text-[9px] tracking-hud uppercase hover:border-jordan-black">
                  RSVP
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="section px-4 py-5 pb-10">
          <button className="w-full py-4 rounded-xs bg-varsity font-mono text-[12px] tracking-hud uppercase text-white font-bold">
            Got Next
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Cell({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="px-3 py-3 hairline-r">
      <div className="font-mono text-[8px] tracking-label uppercase text-sweat mb-1">
        {label}
      </div>
      <div className={`display-tight text-[18px] ${accent ? "text-win-gold" : "text-jordan-black"}`}>
        {value}
      </div>
    </div>
  );
}
