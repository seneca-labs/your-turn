"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";
import {
  PhoneFrame,
  ScreenBack,
  NicknamePill,
  RecordBadge,
  StatCard,
} from "@/components/ui";
import { staggerIn, countUp, scaleIn } from "@/lib/animations";
import { user, highlights } from "@/lib/mockData";
import { Wing, Flame, Jumpman } from "@/components/icons";

export default function ProfilePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const rankRefs = useRef<HTMLSpanElement[]>([]);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const courtRankRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      scaleIn(heroRef.current.querySelectorAll(".hero-line"), {
        duration: 800,
        delay: anime.stagger(120),
      });
    }
    if (watermarkRef.current) {
      anime({
        targets: watermarkRef.current,
        opacity: [0, 1],
        scale: [1.2, 1],
        translateX: [-20, 0],
        duration: 1400,
        delay: 200,
        easing: "easeOutExpo",
      });
    }
    if (statsRef.current) staggerIn(statsRef.current.querySelectorAll(".stat"));
    if (courtRankRef.current) {
      courtRankRef.current.textContent = "0";
      setTimeout(() => {
        if (courtRankRef.current) countUp(courtRankRef.current, 1, 1200);
      }, 600);
    }
    rankRefs.current.forEach((el, i) => {
      if (!el) return;
      const target = parseInt(el.dataset.value || "0", 10);
      el.textContent = "0";
      setTimeout(() => countUp(el, target, 900), 400 + i * 120);
    });
  }, []);

  return (
    <PhoneFrame>
      <ScreenBack />
      <div className="relative h-full overflow-y-auto no-scrollbar grain">
        {/* Hero with bleeding Jumpman watermark */}
        <div
          ref={heroRef}
          className="relative px-5 pt-10 pb-8 asphalt-bg overflow-hidden"
        >
          {/* Watermark — bleeds off right edge, rotated */}
          <div
            ref={watermarkRef}
            className="absolute pointer-events-none select-none"
            style={{
              right: "-45%",
              top: "-10%",
              opacity: 0,
              transform: "rotate(-8deg)",
            }}
          >
            <Jumpman size={360} className="text-varsity opacity-[0.12]" />
          </div>

          {/* Top-right gold gradient bleed */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(206,17,38,0.10) 0%, rgba(0,0,0,0) 50%, rgba(212,169,56,0.06) 100%)",
            }}
          />

          <div className="relative">
            <div className="hero-line flex items-center justify-between mb-3">
              <div className="font-mono text-[10px] tracking-label uppercase text-sweat">
                Hooper · {user.joined}
              </div>
              {/* Verified stamp */}
              <div className="stamp text-win-gold font-mono text-[8px] tracking-label">
                <span className="flex items-center gap-1">
                  <Jumpman size={10} className="text-win-gold" />
                  Verified
                </span>
              </div>
            </div>

            <h1 className="hero-line display-tight text-bone text-[68px] leading-[0.82]">
              {user.nickname.split(" ").map((w, i) => (
                <div key={i}>{w}</div>
              ))}
            </h1>

            <div className="hero-line mt-4 flex items-center gap-2">
              <Wing size={26} className="text-varsity" />
              <span className="font-mono text-[11px] tracking-hud uppercase text-bone/85">
                {user.homeCourt} · {user.neighborhood}
              </span>
            </div>

            <div className="hero-line mt-4">
              <RecordBadge
                wins={user.record.wins}
                losses={user.record.losses}
                streak={user.record.currentStreak}
              />
            </div>
          </div>
        </div>

        {/* Signature stats */}
        <div className="hairline-t hairline-b px-4 py-4">
          <div className="font-mono text-[9px] tracking-label uppercase text-sweat mb-3 flex items-center gap-2">
            <span className="inline-block h-px w-3 bg-sweat" />
            Signature
          </div>
          <div ref={statsRef} className="grid grid-cols-3 gap-2">
            <div className="stat">
              <StatCard label="Fadeaway" value={user.signatureStats.fadeaway} />
            </div>
            <div className="stat">
              <StatCard label="Ankles" value="12" />
            </div>
            <div className="stat">
              <StatCard label="+/-" value={user.signatureStats.closeOut} accent />
            </div>
          </div>
        </div>

        {/* Rank section — asymmetric: huge court rank + small stack */}
        <div className="px-4 py-5 hairline-b relative">
          <div className="font-mono text-[9px] tracking-label uppercase text-sweat mb-3 flex items-center gap-2">
            <span className="inline-block h-px w-3 bg-sweat" />
            Ranked
          </div>
          <div className="flex gap-4 items-stretch">
            {/* Massive court rank — hero of this section */}
            <div className="relative w-[150px] flex-shrink-0 concrete-bg hairline rounded-xs p-3 flex flex-col justify-between overflow-hidden">
              <div className="font-mono text-[9px] tracking-label uppercase text-win-gold">
                Court
              </div>
              <div className="flex items-end gap-1 leading-none">
                <span className="display-tight text-win-gold text-[14px] mb-1">
                  #
                </span>
                <span
                  ref={courtRankRef}
                  className="display-tight text-win-gold text-[88px] tabular leading-[0.8]"
                  data-value={user.rank.court || 0}
                >
                  1
                </span>
              </div>
              <div className="font-mono text-[8px] tracking-hud uppercase text-bone/60">
                14 day reign
              </div>
              <Jumpman
                size={48}
                className="absolute -bottom-2 -right-2 text-win-gold opacity-20"
                style={{ transform: "rotate(-15deg)" }}
              />
            </div>

            {/* Small stack: other 3 ranks */}
            <div className="flex-1 flex flex-col justify-between gap-2">
              <RankRow
                label="Neighborhood"
                value={user.rank.neighborhood || 0}
                refCb={(el) => {
                  if (el) rankRefs.current[0] = el;
                }}
              />
              <RankRow
                label="City"
                value={user.rank.city || 0}
                refCb={(el) => {
                  if (el) rankRefs.current[1] = el;
                }}
              />
              <RankRow
                label="Global"
                value={user.rank.global || 0}
                refCb={(el) => {
                  if (el) rankRefs.current[2] = el;
                }}
                muted
              />
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="px-4 py-5 hairline-b flex items-center justify-between">
          <div>
            <div className="font-mono text-[9px] tracking-label uppercase text-sweat mb-2 flex items-center gap-2">
              <span className="inline-block h-px w-3 bg-sweat" />
              Rides for
            </div>
            <NicknamePill
              name={`${user.team.name} · ${user.team.roster}`}
              size="lg"
              variant="gold"
            />
          </div>
          <Jumpman size={36} className="text-bone/15" />
        </div>

        {/* Highlights */}
        <div className="px-4 py-5 pb-10">
          <div className="font-mono text-[9px] tracking-label uppercase text-sweat mb-3 flex items-center gap-2">
            <span className="inline-block h-px w-3 bg-sweat" />
            Recent
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {highlights.map((h) => (
              <div
                key={h.id}
                className="flex-shrink-0 w-32 h-44 rounded-xs hairline overflow-hidden relative concrete-bg"
              >
                <div className="absolute inset-0 asphalt-bg opacity-50" />
                {/* Jumpman watermark per highlight */}
                <Jumpman
                  size={80}
                  className="absolute -bottom-3 -right-3 text-varsity opacity-20"
                  style={{ transform: "rotate(-10deg)" }}
                />
                <div className="absolute inset-0 flex items-end p-2">
                  <div className="space-y-1 relative">
                    <div className="font-mono text-[8px] tracking-hud uppercase text-bone/60">
                      {h.timestamp}
                    </div>
                    <div className="display-tight text-bone text-[11px] leading-tight">
                      {h.caption}
                    </div>
                    <div className="flex items-center gap-1 text-hype">
                      <Flame size={10} />
                      <span className="font-mono text-[9px] tabular">{h.fire}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-hype animate-live-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function RankRow({
  label,
  value,
  refCb,
  muted = false,
}: {
  label: string;
  value: number;
  refCb?: (el: HTMLSpanElement | null) => void;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between hairline rounded-xs px-3 py-2">
      <span
        className={`font-mono text-[9px] tracking-hud uppercase ${
          muted ? "text-sweat" : "text-bone/70"
        }`}
      >
        {label}
      </span>
      <span
        className={`display-tight tabular ${
          muted ? "text-bone/40 text-[18px]" : "text-bone text-[22px]"
        }`}
      >
        #
        <span ref={refCb} data-value={value}>
          {value}
        </span>
      </span>
    </div>
  );
}
