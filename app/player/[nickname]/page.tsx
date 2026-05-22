"use client";
import { useEffect, useRef } from "react";
import { notFound, useParams } from "next/navigation";
import anime from "animejs";
import Link from "next/link";
import {
  PhoneFrame,
  ScreenBack,
  StatCard,
  IOSStatusBar,
  IOSHomeIndicator,
} from "@/components/ui";
import { staggerIn, countUp, scaleIn } from "@/lib/animations";
import { user, highlights, findPerson } from "@/lib/mockData";
import type { Opponent } from "@/lib/types";
import { Wing, Flame, Jumpman } from "@/components/icons";

function isSelf(p: ReturnType<typeof findPerson>): p is typeof user {
  return !!p && (p as typeof user).team !== undefined;
}

export default function ProfilePage() {
  const params = useParams<{ nickname: string }>();
  const person = findPerson(params.nickname);
  const heroRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const rankRefs = useRef<HTMLSpanElement[]>([]);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const courtRankRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!person) return;
    if (avatarRef.current) {
      anime({
        targets: avatarRef.current,
        scale: [0.7, 1],
        opacity: [0, 1],
        duration: 800,
        easing: "cubicBezier(0.16, 1, 0.3, 1)",
      });
    }
    if (heroRef.current) {
      scaleIn(heroRef.current.querySelectorAll(".hero-line"), {
        duration: 700,
        delay: anime.stagger(90, { start: 200 }),
      });
    }
    if (watermarkRef.current) {
      anime({
        targets: watermarkRef.current,
        opacity: [0, 1],
        scale: [1.15, 1],
        translateX: [-16, 0],
        duration: 1400,
        delay: 200,
        easing: "easeOutExpo",
      });
    }
    if (statsRef.current) staggerIn(statsRef.current.querySelectorAll(".stat"));
    if (courtRankRef.current && isSelf(person)) {
      courtRankRef.current.textContent = "0";
      setTimeout(() => {
        if (courtRankRef.current) countUp(courtRankRef.current, person.rank.court || 0, 1200);
      }, 600);
    }
    rankRefs.current.forEach((el, i) => {
      if (!el) return;
      const target = parseInt(el.dataset.value || "0", 10);
      el.textContent = "0";
      setTimeout(() => countUp(el, target, 900), 400 + i * 120);
    });
  }, [person]);

  if (!person) return notFound();

  const self = isSelf(person);
  const opp = self ? null : (person as Opponent);
  const handle = "@" + (self ? person.id : opp!.id);
  const tone = self ? "win-gold" : "varsity";

  return (
    <PhoneFrame bg="#FFFFFF">
      <ScreenBack />
      <IOSStatusBar tone="light" />

      <div className="relative h-full overflow-y-auto no-scrollbar grain pt-[44px]">
        <div className="relative flex items-center justify-between px-4 pt-2 pb-1.5 z-20">
          <span className="font-mono text-[10px] tracking-hud uppercase text-jordan-black/50">
            {handle}
          </span>
          <button
            aria-label="More"
            className="h-7 w-7 -mr-1 inline-flex items-center justify-center text-jordan-black/50 hover:text-jordan-black transition-colors"
          >
            <svg width="18" height="4" viewBox="0 0 18 4" fill="none">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              <circle cx="9" cy="2" r="1.5" fill="currentColor" />
              <circle cx="16" cy="2" r="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>

        <div
          ref={heroRef}
          className="relative px-5 pt-6 pb-7 asphalt-bg overflow-hidden"
        >
          <div
            ref={watermarkRef}
            className="absolute pointer-events-none select-none"
            style={{ right: "-40%", top: "-12%", opacity: 0, transform: "rotate(-8deg)" }}
          >
            <Jumpman size={340} className="text-varsity opacity-[0.08]" />
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(206,17,38,0.08) 0%, rgba(255,255,255,0) 50%, rgba(212,169,56,0.05) 100%)",
            }}
          />

          <div className="relative flex flex-col items-center text-center">
            <div ref={avatarRef} className="relative" style={{ opacity: 0 }}>
              <div
                className="h-[104px] w-[104px] rounded-full overflow-hidden bg-[#F5F2EB]"
                style={{
                  boxShadow: self
                    ? "0 0 0 4px rgba(184,144,42,0.16), 0 12px 28px rgba(184,144,42,0.22)"
                    : "0 0 0 4px rgba(206,17,38,0.14), 0 12px 28px rgba(206,17,38,0.20)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={person.photo}
                  alt={person.nickname}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <span
                className={`absolute -bottom-1 -right-1 inline-flex items-center justify-center h-6 w-6 rounded-full text-white shadow-[0_2px_8px_rgba(206,17,38,0.4)] ${
                  self ? "bg-win-gold" : "bg-varsity"
                }`}
                aria-label="Verified hooper"
              >
                {self ? (
                  <Jumpman size={12} className="text-jordan-black" />
                ) : (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path
                      d="M1 4.5 L4 7.5 L10 1.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>

            <h1 className="hero-line display-tight text-jordan-black text-[44px] leading-[0.95] mt-4">
              {person.nickname}
            </h1>

            <div className="hero-line mt-2 flex items-center gap-1.5 font-mono text-[11px] tracking-tight text-jordan-black/70">
              <Wing size={12} className="text-varsity" />
              <span>
                {person.homeCourt}
                {self && ` · ${person.neighborhood}`}
                {!self && ` · NEIGH #${(person as Opponent).rank.neighborhood}`}
              </span>
            </div>

            {self && (
              <div className="hero-line mt-1 font-mono text-[9px] tracking-hud uppercase text-jordan-black/45">
                Hooper since {person.joined}
              </div>
            )}
            {!self && (
              <div className="hero-line mt-1 font-mono text-[9px] tracking-hud uppercase text-jordan-black/45">
                {opp!.intimidation === "high"
                  ? "BORO KING · Approach With Caution"
                  : opp!.intimidation === "medium"
                  ? "Veteran · Don't Sleep"
                  : "Local · Beatable"}
              </div>
            )}

            <div className="hero-line mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-jordan-black/15 font-mono text-[11px] tabular text-jordan-black">
                <span className="font-bold">{person.record.wins}</span>
                <span className="text-jordan-black/40">·</span>
                <span className="text-jordan-black/60">{person.record.losses}</span>
                <span className="text-jordan-black/40 text-[9px] tracking-hud uppercase ml-0.5">
                  W·L
                </span>
              </span>
              {person.record.currentStreak > 0 && (
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-[11px] tabular font-bold"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(212,169,56,0.25) 0%, rgba(212,169,56,0.10) 100%)",
                    color: "#8E6B1F",
                    border: "0.5px solid rgba(184,144,42,0.45)",
                  }}
                >
                  <Flame size={11} />
                  W{person.record.currentStreak}
                </span>
              )}
            </div>
          </div>

          <div className="hero-line relative mt-5 flex items-center gap-2">
            {self ? (
              <>
                <Link
                  href="/court/west-4th"
                  className="flex-1 text-center py-2.5 rounded-md bg-varsity font-mono text-[11px] tracking-hud uppercase text-white font-bold shadow-[0_6px_14px_rgba(206,17,38,0.28)] active:scale-[0.98] transition-transform"
                >
                  Challenge
                </Link>
                <button className="flex-1 text-center py-2.5 rounded-md border border-jordan-black/20 bg-white font-mono text-[11px] tracking-hud uppercase text-jordan-black/85 hover:border-jordan-black/40 transition-colors">
                  Share Profile
                </button>
              </>
            ) : (
              <>
                <Link
                  href={`/matchup/${opp!.id}`}
                  className="flex-1 text-center py-2.5 rounded-md bg-jordan-black font-mono text-[11px] tracking-hud uppercase text-white font-bold shadow-[0_6px_14px_rgba(10,10,10,0.28)] active:scale-[0.98] transition-transform"
                >
                  Run It Back
                </Link>
                <button className="flex-1 text-center py-2.5 rounded-md border border-jordan-black/20 bg-white font-mono text-[11px] tracking-hud uppercase text-jordan-black/85 hover:border-jordan-black/40 transition-colors">
                  Scout Report
                </button>
              </>
            )}
          </div>
        </div>

        {/* Signature stats — both profiles share this */}
        {person.signatureStats && (
          <Section title="Signature">
            <div ref={statsRef} className="grid grid-cols-3 gap-2">
              <div className="stat">
                <StatCard label="Fadeaway" value={person.signatureStats.fadeaway} />
              </div>
              <div className="stat">
                <StatCard label="Crossover" value={person.signatureStats.crossover.split(" ")[0]} />
              </div>
              <div className="stat">
                <StatCard
                  label="+/-"
                  value={person.signatureStats.closeOut}
                  accent={person.signatureStats.closeOut.startsWith("+")}
                />
              </div>
            </div>
          </Section>
        )}

        {/* Ranked — different shape for self vs opponent */}
        {self && (
          <Section title="Ranked">
            <div className="flex gap-2 items-stretch">
              <div className="relative w-[148px] flex-shrink-0 concrete-bg hairline rounded-md p-3 flex flex-col justify-between overflow-hidden">
                <div className="font-mono text-[9px] tracking-label uppercase text-win-gold">
                  Court
                </div>
                <div className="flex items-end gap-1 leading-none">
                  <span className="display-tight text-win-gold text-[14px] mb-1">#</span>
                  <span
                    ref={courtRankRef}
                    className="display-tight text-win-gold text-[88px] tabular leading-[0.8]"
                    data-value={person.rank.court || 0}
                  >
                    1
                  </span>
                </div>
                <div className="font-mono text-[8px] tracking-hud uppercase text-jordan-black/55">
                  14 day reign
                </div>
                <Jumpman
                  size={48}
                  className="absolute -bottom-2 -right-2 text-win-gold opacity-20"
                  style={{ transform: "rotate(-15deg)" }}
                />
              </div>

              <div className="flex-1 flex flex-col justify-between gap-2">
                <RankRow
                  label="Neighborhood"
                  value={person.rank.neighborhood || 0}
                  refCb={(el) => {
                    if (el) rankRefs.current[0] = el;
                  }}
                />
                <RankRow
                  label="City"
                  value={person.rank.city || 0}
                  refCb={(el) => {
                    if (el) rankRefs.current[1] = el;
                  }}
                />
                <RankRow
                  label="Global"
                  value={person.rank.global || 0}
                  refCb={(el) => {
                    if (el) rankRefs.current[2] = el;
                  }}
                  muted
                />
              </div>
            </div>
          </Section>
        )}

        {!self && opp && (
          <Section title="Ranked">
            <div className="grid grid-cols-2 gap-2">
              <RankCard
                label="Neighborhood"
                value={opp.rank.neighborhood || 0}
                accent={tone}
              />
              {opp.rank.borough !== undefined && (
                <RankCard label="Borough" value={opp.rank.borough} accent={tone} />
              )}
              <RankCard label="Home Court" value={opp.homeCourt} text accent="varsity" />
              <RankCard
                label="Streak"
                value={`W${opp.record.currentStreak}`}
                text
                accent="win-gold"
              />
            </div>
          </Section>
        )}

        {/* Team (self only) */}
        {self && (
          <Section title="Rides for">
            <div className="flex items-center justify-between hairline rounded-md px-3 py-3 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-jordan-black flex items-center justify-center">
                  <Jumpman size={16} className="text-white" />
                </div>
                <div>
                  <div className="display-tight text-jordan-black text-[18px] leading-none">
                    {person.team.name}
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] tracking-hud uppercase text-sweat">
                    {person.team.roster} roster
                  </div>
                </div>
              </div>
              <span className="font-mono text-[9px] tracking-hud uppercase text-win-gold font-bold">
                View
              </span>
            </div>
          </Section>
        )}

        {/* Highlights — self gets all, opponents get their own */}
        <Section title="Recent" pb="pb-10">
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-4 px-4">
            {highlights
              .filter(
                (h) =>
                  h.player === person.nickname ||
                  (self && h.player === person.nickname),
              )
              .concat(self ? [] : [])
              .slice(0, 4)
              .map((h) => (
                <HighlightCard key={h.id} h={h} />
              ))}
            {/* If opponent has no highlights, show one synthetic placeholder */}
            {!self &&
              highlights.filter((h) => h.player === person.nickname).length === 0 && (
                <HighlightCard
                  h={{
                    id: "ghost",
                    player: person.nickname,
                    court: opp!.homeCourt.toLowerCase().replace(/\s+/g, "-"),
                    caption: "GAME WINNER",
                    timestamp: "3D AGO",
                    fire: 612,
                    cold: 88,
                    hype: 410,
                  }}
                />
              )}
          </div>
        </Section>
      </div>

      <IOSHomeIndicator tone="light" />
    </PhoneFrame>
  );
}

function Section({
  title,
  children,
  pb = "pb-5",
}: {
  title: string;
  children: React.ReactNode;
  pb?: string;
}) {
  return (
    <div className={`px-4 pt-5 ${pb} hairline-t`}>
      <div className="font-mono text-[9px] tracking-label uppercase text-sweat mb-3 flex items-center gap-2">
        <span className="inline-block h-px w-3 bg-sweat" />
        {title}
      </div>
      {children}
    </div>
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
    <div className="flex items-center justify-between hairline rounded-md px-3 py-2 bg-white">
      <span
        className={`font-mono text-[9px] tracking-hud uppercase ${
          muted ? "text-sweat" : "text-jordan-black/70"
        }`}
      >
        {label}
      </span>
      <span
        className={`display-tight tabular ${
          muted ? "text-jordan-black/40 text-[18px]" : "text-jordan-black text-[22px]"
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

function RankCard({
  label,
  value,
  accent,
  text = false,
}: {
  label: string;
  value: string | number;
  accent: "varsity" | "win-gold";
  text?: boolean;
}) {
  const color = accent === "varsity" ? "text-varsity" : "text-win-gold";
  return (
    <div className="hairline rounded-md p-3 bg-white">
      <div className="font-mono text-[9px] tracking-hud uppercase text-sweat mb-1">
        {label}
      </div>
      <div className={`display-tight ${color} ${text ? "text-[20px]" : "text-[32px]"} tabular leading-none`}>
        {text ? value : `#${value}`}
      </div>
    </div>
  );
}

function HighlightCard({ h }: { h: import("@/lib/types").Highlight }) {
  return (
    <div className="flex-shrink-0 w-[148px] h-[200px] rounded-md hairline overflow-hidden relative bg-white">
      <div className="absolute inset-0 asphalt-bg opacity-40" />
      <Jumpman
        size={88}
        className="absolute -bottom-3 -right-3 text-varsity opacity-15"
        style={{ transform: "rotate(-10deg)" }}
      />
      <div className="absolute top-2 right-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-hype animate-live-pulse" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-2.5">
        <div className="font-mono text-[8px] tracking-hud uppercase text-jordan-black/55 mb-1">
          {h.timestamp}
        </div>
        <div className="display-tight text-jordan-black text-[13px] leading-[1.05] mb-2">
          {h.caption}
        </div>
        <div className="flex items-center gap-2 text-hype">
          <span className="inline-flex items-center gap-1">
            <Flame size={11} />
            <span className="font-mono text-[10px] tabular font-bold">{h.fire}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
