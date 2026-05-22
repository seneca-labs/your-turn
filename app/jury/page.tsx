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
  const screenFlashRef = useRef<HTMLDivElement>(null);
  const barGlowRef = useRef<HTMLDivElement>(null);
  const scribbleRef = useRef<SVGPathElement>(null);
  const bigAnswerRef = useRef<HTMLDivElement>(null);
  const [locked, setLocked] = useState(false);
  const [voters, setVoters] = useState(0);
  const [yourVote, setYourVote] = useState<"yes" | "no" | null>(null);

  useEffect(() => {
    if (questionRef.current) scrambleText(questionRef.current, "WAS IT A FOUL?", 700);
    if (yesRef.current) voteBar(yesRef.current, 27, 2400);
    if (noRef.current) voteBar(noRef.current, 73, 2400);

    const t = setInterval(
      () => setVoters((v) => Math.min(v + 2 + Math.floor(Math.random() * 3), 247)),
      70,
    );

    // Auto-lock at 2.7s if user hasn't voted by then
    const lockT = setTimeout(() => {
      lockIn();
      clearInterval(t);
    }, 2700);

    return () => {
      clearInterval(t);
      clearTimeout(lockT);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tickerRef.current) tickerRef.current.textContent = String(voters);
  }, [voters]);

  function lockIn() {
    setLocked(true);
    if (barGlowRef.current) {
      anime({
        targets: barGlowRef.current,
        opacity: [0, 1, 0.35],
        duration: 700,
        easing: "easeOutExpo",
      });
    }
    // Cross out "WAS IT A FOUL?" with a hand-drawn scribble, then drop the big NO.
    if (scribbleRef.current) {
      const len = scribbleRef.current.getTotalLength();
      scribbleRef.current.style.strokeDasharray = `${len}`;
      scribbleRef.current.style.strokeDashoffset = `${len}`;
      anime({
        targets: scribbleRef.current,
        strokeDashoffset: [len, 0],
        duration: 600,
        easing: "easeInOutQuad",
        delay: 100,
      });
    }
    if (bigAnswerRef.current) {
      anime({
        targets: bigAnswerRef.current,
        scale: [0.3, 1.15, 1],
        opacity: [0, 1],
        rotate: [-8, -3],
        duration: 800,
        delay: 650,
        easing: "easeOutBack",
      });
    }
  }

  function handleVote(vote: "yes" | "no") {
    if (locked || yourVote) return;
    setYourVote(vote);

    // Full-screen pulse — vote-side color
    if (screenFlashRef.current) {
      screenFlashRef.current.style.background =
        vote === "yes"
          ? "radial-gradient(circle at 50% 50%, rgba(206,17,38,0.35) 0%, rgba(206,17,38,0) 70%)"
          : "radial-gradient(circle at 50% 50%, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0) 70%)";
      anime({
        targets: screenFlashRef.current,
        opacity: [0, 1, 0],
        duration: 700,
        easing: "easeOutExpo",
      });
    }

    // Lock in immediately on vote (skip the auto timer)
    setTimeout(() => lockIn(), 300);
  }

  return (
    <PhoneFrame bg="#FFFFFF">
      <ScreenBack />
      <div className="absolute inset-0 asphalt-bg opacity-40" />

      {/* Full-screen vote-flash overlay */}
      <div
        ref={screenFlashRef}
        className="absolute inset-0 pointer-events-none z-30"
        style={{ opacity: 0 }}
      />

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

        {/* Question + verdict */}
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <div className="relative inline-block">
            <h1
              ref={questionRef}
              className={`display-tight text-[58px] leading-[0.9] text-center transition-colors duration-500 ${
                locked ? "text-jordan-black/50" : "text-jordan-black"
              }`}
            />
            {/* Hand-drawn scribble cross-out — draws across the question when locked */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 70"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                ref={scribbleRef}
                d="M 8 42 Q 60 28, 110 38 T 210 32 T 310 40 T 392 30"
                stroke="#CE1126"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                style={{ opacity: locked ? 1 : 0 }}
              />
            </svg>
          </div>

          {locked && (
            <div
              ref={bigAnswerRef}
              className="display-tight text-varsity tabular text-[120px] leading-[0.85] mt-2"
              style={{ opacity: 0 }}
            >
              NO
            </div>
          )}
        </div>

        {/* YES / NO buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            disabled={locked || yourVote !== null}
            onClick={() => handleVote("yes")}
            className={`display-tight text-[44px] py-6 rounded-xs transition-all relative overflow-hidden ${
              yourVote === "yes"
                ? "bg-varsity text-white scale-[1.02] shadow-[0_8px_22px_rgba(206,17,38,0.35)]"
                : yourVote === "no"
                ? "bg-jordan-black/30 text-white/50"
                : "bg-jordan-black text-white hover:bg-varsity"
            }`}
          >
            YES
            {yourVote === "yes" && (
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-label uppercase font-bold opacity-90">
                ✓ Your Vote
              </span>
            )}
          </button>
          <button
            disabled={locked || yourVote !== null}
            onClick={() => handleVote("no")}
            className={`display-tight text-[44px] py-6 rounded-xs border transition-all relative overflow-hidden ${
              yourVote === "no"
                ? "bg-jordan-black text-white border-jordan-black scale-[1.02] shadow-[0_8px_22px_rgba(10,10,10,0.35)]"
                : yourVote === "yes"
                ? "bg-white/40 text-jordan-black/40 border-jordan-black/20"
                : "bg-white border-jordan-black text-jordan-black hover:bg-jordan-black hover:text-white"
            }`}
          >
            NO
            {yourVote === "no" && (
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-label uppercase font-bold opacity-90">
                ✓ Your Vote
              </span>
            )}
          </button>
        </div>

        {/* Vote bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-hud uppercase">
            <span className="text-jordan-black/70">Yes</span>
            <span className="text-jordan-black/70">No</span>
          </div>
          <div className="relative h-3 rounded-xs bg-jordan-black/10 overflow-hidden flex">
            <div ref={yesRef} className="h-full bg-varsity" style={{ width: 0 }} />
            <div ref={noRef} className="h-full bg-jordan-black" style={{ width: 0 }} />
            {/* Outside glow ring instead of opaque overlay — bar stays visible underneath */}
            <div
              ref={barGlowRef}
              className="absolute -inset-0.5 rounded-xs pointer-events-none"
              style={{
                opacity: 0,
                boxShadow:
                  "0 0 0 1px #D4A938, 0 0 16px rgba(212,169,56,0.55), 0 0 32px rgba(212,169,56,0.30)",
              }}
            />
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] tracking-hud tabular">
            <span className="text-varsity">27%</span>
            <span className="text-jordan-black">73%</span>
          </div>
        </div>

        {/* Live voters / result */}
        <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-label uppercase">
          <span className="text-sweat">
            <span ref={tickerRef} className="text-jordan-black tabular">
              0
            </span>{" "}
            voting
            {yourVote && (
              <span className="ml-2 text-jordan-black/70">
                · You voted{" "}
                <span className={yourVote === "yes" ? "text-varsity font-bold" : "text-jordan-black font-bold"}>
                  {yourVote.toUpperCase()}
                </span>
              </span>
            )}
          </span>
          {locked ? (
            <span className="text-win-gold font-bold">Locked · 73% No</span>
          ) : (
            <span className="text-jordan-black/60">Tallying</span>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
