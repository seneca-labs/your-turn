"use client";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { PhoneFrame, ScreenBack } from "@/components/ui";
import { scrambleText, voteBar } from "@/lib/animations";

export default function JuryPage() {
  const questionRef = useRef<HTMLHeadingElement>(null);
  const yesRef = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLSpanElement>(null);
  const [locked, setLocked] = useState(false);
  const [voters, setVoters] = useState(0);

  useEffect(() => {
    if (questionRef.current) scrambleText(questionRef.current, "WAS IT A FOUL?", 700);

    if (yesRef.current) voteBar(yesRef.current, 27, 2400);
    if (noRef.current) voteBar(noRef.current, 73, 2400);

    const t = setInterval(() => setVoters((v) => Math.min(v + 2 + Math.floor(Math.random() * 3), 247)), 70);

    const lockT = setTimeout(() => {
      setLocked(true);
      anime({
        targets: ".lock-flash",
        opacity: [0, 1, 0],
        duration: 700,
        easing: "easeOutExpo",
      });
      clearInterval(t);
    }, 2700);

    return () => {
      clearInterval(t);
      clearTimeout(lockT);
    };
  }, []);

  useEffect(() => {
    if (tickerRef.current) tickerRef.current.textContent = String(voters);
  }, [voters]);

  return (
    <PhoneFrame bg="#000">
      <ScreenBack />
      <div className="absolute inset-0 asphalt-bg opacity-40" />
      <div className="relative h-full flex flex-col px-5 pt-12 pb-8">
        {/* Disputed label */}
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-hype animate-live-pulse" />
          <span className="font-mono text-[10px] tracking-label uppercase text-hype">
            Disputed Call · Court 3
          </span>
        </div>

        <div className="font-mono text-[9px] tracking-hud uppercase text-sweat mt-1">
          Sweet Shadow vs Two-Step · 7-4
        </div>

        {/* Question */}
        <div className="flex-1 flex items-center justify-center">
          <h1
            ref={questionRef}
            className="display-tight text-bone text-[58px] leading-[0.9] text-center"
          />
        </div>

        {/* YES / NO buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            disabled={locked}
            className="display-tight text-[44px] py-6 rounded-xs bg-jordan-black border border-bone text-bone hover:bg-bone hover:text-jordan-black transition-colors"
          >
            YES
          </button>
          <button
            disabled={locked}
            className="display-tight text-[44px] py-6 rounded-xs bg-bone border border-bone text-jordan-black hover:bg-jordan-black hover:text-bone transition-colors"
          >
            NO
          </button>
        </div>

        {/* Vote bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-hud uppercase">
            <span className="text-bone/70">Yes</span>
            <span className="text-bone/70">No</span>
          </div>
          <div className="relative h-2.5 rounded-xs bg-bone/10 overflow-hidden flex">
            <div ref={yesRef} className="h-full bg-varsity" style={{ width: 0 }} />
            <div ref={noRef} className="h-full bg-bone" style={{ width: 0 }} />
            <div className="lock-flash absolute inset-0 bg-win-gold opacity-0 pointer-events-none" />
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] tracking-hud tabular">
            <span className="text-varsity">27%</span>
            <span className="text-bone">73%</span>
          </div>
        </div>

        {/* Live voters / result */}
        <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-label uppercase">
          <span className="text-sweat">
            <span ref={tickerRef} className="text-bone tabular">
              0
            </span>{" "}
            voting
          </span>
          {locked ? (
            <span className="text-win-gold">Result · No Foul</span>
          ) : (
            <span className="text-bone/60">Tallying</span>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
