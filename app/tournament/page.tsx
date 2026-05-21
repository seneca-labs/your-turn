"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { PhoneFrame, ScreenBack } from "@/components/ui";
import { Wing, Jumpman } from "@/components/icons";

interface Match {
  a: string;
  b: string;
  winner?: "a" | "b" | null;
  active?: boolean;
}

const ROUNDS: { label: string; matches: Match[] }[] = [
  {
    label: "COURT · WEST 4TH",
    matches: [
      { a: "SWEET SHADOW", b: "TWO-STEP", winner: "a" },
    ],
  },
  {
    label: "NEIGHBORHOOD · GREENWICH",
    matches: [
      { a: "SWEET SHADOW", b: "CROSSCITY", active: true },
    ],
  },
  {
    label: "BOROUGH · MANHATTAN",
    matches: [{ a: "TBD", b: "THE LANDLORD" }],
  },
  {
    label: "CITY · NYC",
    matches: [{ a: "TBD", b: "BLACK JESUS" }],
  },
];

export default function TournamentPage() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      anime({
        targets: ref.current.querySelectorAll(".round"),
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 500,
        delay: anime.stagger(120),
        easing: "easeOutExpo",
      });
    }
  }, []);

  return (
    <PhoneFrame bg="#FFFFFF">
      <ScreenBack />
      <div className="relative h-full overflow-y-auto no-scrollbar">
        <div className="pt-3 px-4 flex items-center justify-between font-mono text-[10px] tracking-hud uppercase">
          <div className="flex items-center gap-2">
            <Jumpman size={14} className="text-varsity" />
            <span className="text-jordan-black/80">Bracket</span>
          </div>
          <span className="text-sweat">SPRING · 2026</span>
        </div>

        <div className="px-4 mt-4 mb-6">
          <div className="font-mono text-[9px] tracking-label uppercase text-sweat">
            Path to The One
          </div>
          <h1 className="display-tight text-jordan-black text-[34px] leading-[0.9] mt-1">
            COURT TO CITY
          </h1>
        </div>

        <div ref={ref} className="px-4 pb-12 space-y-5">
          {ROUNDS.map((round, i) => (
            <div key={round.label} className="round relative">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`display-tight text-[18px] tabular ${
                    i === 0
                      ? "text-win-gold"
                      : i === 1
                      ? "text-varsity"
                      : "text-jordan-black/50"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[9px] tracking-label uppercase text-sweat">
                  {round.label}
                </span>
              </div>
              {round.matches.map((m, mi) => (
                <div
                  key={mi}
                  className={`hairline rounded-xs overflow-hidden ${
                    m.active ? "border-varsity" : ""
                  }`}
                  style={m.active ? { borderColor: "rgba(206,17,38,0.55)" } : {}}
                >
                  <MatchRow name={m.a} won={m.winner === "a"} active={m.active} self={m.a === "SWEET SHADOW"} />
                  <div className="hairline-t" />
                  <MatchRow name={m.b} won={m.winner === "b"} active={m.active} self={m.b === "SWEET SHADOW"} />
                </div>
              ))}
              {/* Connector */}
              {i < ROUNDS.length - 1 && (
                <div className="flex justify-center my-2">
                  <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                    <line x1="6" y1="0" x2="6" y2="20" stroke="rgba(10,10,10,0.20)" strokeWidth="1" />
                    <path d="M2 14 L6 20 L10 14" stroke="rgba(10,10,10,0.40)" strokeWidth="1" fill="none" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function MatchRow({
  name,
  won,
  active,
  self,
}: {
  name: string;
  won?: boolean;
  active?: boolean;
  self?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 ${
        won ? "bg-win-gold/5" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        {self && <Wing size={12} className="text-varsity" />}
        <span
          className={`font-mono text-[11px] tracking-hud uppercase ${
            name === "TBD"
              ? "text-sweat"
              : self
              ? "text-jordan-black"
              : "text-jordan-black/85"
          }`}
        >
          {name}
        </span>
      </div>
      <div className="flex items-center gap-2 font-mono text-[10px] tracking-hud uppercase tabular">
        {active ? (
          <span className="flex items-center gap-1 text-varsity">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-varsity animate-live-pulse" />
            Tonight
          </span>
        ) : won ? (
          <span className="text-win-gold">Adv</span>
        ) : null}
      </div>
    </div>
  );
}
