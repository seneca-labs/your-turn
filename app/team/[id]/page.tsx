"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { PhoneFrame, ScreenBack, NicknamePill } from "@/components/ui";
import { teamRoster, highlights } from "@/lib/mockData";
import { Flame, Jumpman } from "@/components/icons";

export default function TeamPage() {
  const rosterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (rosterRef.current) {
      anime({
        targets: rosterRef.current.querySelectorAll(".member"),
        opacity: [0, 1],
        scale: [0.85, 1],
        duration: 400,
        delay: anime.stagger(70),
        easing: "easeOutExpo",
      });
    }
  }, []);

  return (
    <PhoneFrame bg="#0A0A0A">
      <ScreenBack />
      <div className="relative h-full overflow-y-auto no-scrollbar">
        {/* Hero */}
        <div className="relative asphalt-bg px-5 pt-10 pb-6">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(206,17,38,0.10), rgba(0,0,0,0))",
            }}
          />
          <div className="relative">
            <div className="font-mono text-[10px] tracking-label uppercase text-sweat mb-1">
              Crew · est. 2025
            </div>
            <h1 className="display-tight text-bone text-[64px] leading-[0.85]">
              THE
              <br />
              LANDLORDS
            </h1>
            <div className="mt-3 flex items-center gap-2">
              <Jumpman size={18} className="text-varsity" />
              <span className="font-mono text-[10px] tracking-hud uppercase text-bone/80">
                West 4th · Greenwich Village
              </span>
            </div>
          </div>
        </div>

        {/* Collective record */}
        <div className="grid grid-cols-3 hairline-b">
          <RecordCell label="W" value="34" />
          <RecordCell label="L" value="11" />
          <RecordCell label="Streak" value="W7" accent />
        </div>

        {/* Roster */}
        <div className="px-4 py-5 hairline-b">
          <div className="font-mono text-[9px] tracking-label uppercase text-sweat mb-3">
            Roster · 6 deep
          </div>
          <div ref={rosterRef} className="flex flex-wrap gap-2">
            {teamRoster.map((n) => (
              <div key={n} className="member">
                <NicknamePill
                  name={n}
                  variant={n === "SWEET SHADOW" ? "self" : "default"}
                  size="md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recent highlights */}
        <div className="px-4 py-5 hairline-b">
          <div className="font-mono text-[9px] tracking-label uppercase text-sweat mb-3">
            Recent Team Highlights
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {highlights.map((h) => (
              <div
                key={h.id}
                className="flex-shrink-0 w-32 h-40 hairline rounded-xs concrete-bg relative overflow-hidden"
              >
                <div className="absolute inset-0 asphalt-bg opacity-30" />
                <div className="absolute inset-0 flex items-end p-2">
                  <div className="space-y-1">
                    <div className="font-mono text-[8px] tracking-hud uppercase text-bone/60">
                      {h.player}
                    </div>
                    <div className="display-tight text-bone text-[10px] leading-tight">
                      {h.caption}
                    </div>
                    <div className="flex items-center gap-1 text-hype">
                      <Flame size={10} />
                      <span className="font-mono text-[9px] tabular">{h.fire}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signature court CTA */}
        <div className="px-4 py-5 pb-10 space-y-3">
          <div className="hairline rounded-xs p-4 concrete-bg">
            <div className="font-mono text-[9px] tracking-label uppercase text-sweat mb-1">
              Signature Court
            </div>
            <div className="display-tight text-win-gold text-[24px]">
              WEST 4TH · COURT 3
            </div>
            <div className="mt-1 font-mono text-[10px] tracking-hud uppercase text-bone/60">
              Conquered 14 days · No challenge stands
            </div>
          </div>
          <button className="w-full py-3 rounded-xs border border-bone/30 font-mono text-[11px] tracking-hud uppercase text-bone hover:border-bone">
            Challenge Team
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

function RecordCell({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="px-3 py-4 text-center hairline-r">
      <div className="font-mono text-[8px] tracking-label uppercase text-sweat mb-1">
        {label}
      </div>
      <div
        className={`display-tight text-[34px] tabular ${
          accent ? "text-win-gold" : "text-bone"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
