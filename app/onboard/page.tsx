"use client";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { PhoneFrame, ScreenBack } from "@/components/ui";
import { scrambleText } from "@/lib/animations";
import { Jumpman } from "@/components/icons";

const MOVES = ["FADEAWAY", "CROSSOVER", "POSTER", "CLOSEOUT", "AND-1", "EURO"];
const COURTS = ["WEST 4TH", "RUCKER", "DYCKMAN", "TOMPKINS", "GERSH", "MARCUS G."];

export default function OnboardFlow() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [move, setMove] = useState<string | null>(null);
  const [court, setCourt] = useState<string | null>(null);
  const revealRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      anime({
        targets: containerRef.current,
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 500,
        easing: "easeOutExpo",
      });
    }
    if (step === 2 && revealRef.current) {
      setTimeout(() => {
        if (revealRef.current) scrambleText(revealRef.current, "YOU ARE\nSWEET SHADOW", 1000);
      }, 300);
    }
  }, [step]);

  return (
    <PhoneFrame bg="#000">
      <ScreenBack />
      <div className="absolute inset-0 asphalt-bg" />
      <div className="relative h-full flex flex-col px-5 pt-12 pb-8">
        {/* Step counter */}
        <div className="flex items-center justify-between font-mono text-[10px] tracking-label uppercase">
          <div className="flex items-center gap-2 text-bone/70">
            <Jumpman size={14} className="text-varsity" />
            Onboard
          </div>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1 w-6 rounded-full ${
                  i <= step ? "bg-varsity" : "bg-bone/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div ref={containerRef} className="mt-12 flex-1 flex flex-col" key={step}>
          {step === 0 && (
            <>
              <div className="font-mono text-[10px] tracking-label uppercase text-sweat">
                Question 01
              </div>
              <h1 className="display-tight text-bone text-[44px] leading-[0.85] mt-2">
                WHAT&apos;S YOUR MOVE?
              </h1>
              <div className="mt-8 grid grid-cols-2 gap-2">
                {MOVES.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMove(m);
                      setStep(1);
                    }}
                    className={`py-4 rounded-xs border font-mono text-[11px] tracking-hud uppercase transition-colors ${
                      move === m
                        ? "border-varsity bg-varsity/10 text-bone"
                        : "border-bone/20 text-bone/80 hover:border-bone"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="font-mono text-[10px] tracking-label uppercase text-sweat">
                Question 02
              </div>
              <h1 className="display-tight text-bone text-[44px] leading-[0.85] mt-2">
                WHERE DO YOU HOOP?
              </h1>
              <div className="mt-8 grid grid-cols-2 gap-2">
                {COURTS.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCourt(c);
                      setStep(2);
                    }}
                    className={`py-4 rounded-xs border font-mono text-[11px] tracking-hud uppercase transition-colors ${
                      court === c
                        ? "border-varsity bg-varsity/10 text-bone"
                        : "border-bone/20 text-bone/80 hover:border-bone"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="font-mono text-[10px] tracking-label uppercase text-win-gold mb-4">
                Identity Locked
              </div>
              <h1
                ref={revealRef}
                className="display-tight text-bone text-[54px] leading-[0.9] whitespace-pre-line"
              />
              <div className="mt-6 font-mono text-[10px] tracking-hud uppercase text-bone/70">
                {move} · {court}
              </div>
              <Jumpman size={56} className="text-varsity mt-8" />
              <button
                onClick={() => setStep(0)}
                className="mt-10 px-6 py-3 rounded-xs bg-varsity font-mono text-[11px] tracking-hud uppercase text-bone font-bold"
              >
                Hit the Court
              </button>
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
