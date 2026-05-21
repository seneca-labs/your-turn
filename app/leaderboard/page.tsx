"use client";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { PhoneFrame, ScreenBack } from "@/components/ui";
import { leaderboardCourt, leaderboardCity, courts } from "@/lib/mockData";
import { NYCMap, latLngToSVG, Jumpman } from "@/components/icons";

type Tab = "court" | "neighborhood" | "city" | "global";
type View = "list" | "map";

export default function LeaderboardPage() {
  const [tab, setTab] = useState<Tab>("court");
  const [view, setView] = useState<View>("list");
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view !== "list" || !rowsRef.current) return;
    anime({
      targets: rowsRef.current.querySelectorAll(".row"),
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 400,
      delay: anime.stagger(60),
      easing: "easeOutExpo",
    });
  }, [tab, view]);

  const list = tab === "court" ? leaderboardCourt : leaderboardCity;

  return (
    <PhoneFrame bg="#FFFFFF">
      <ScreenBack />
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="pt-3 px-4 flex items-center justify-between font-mono text-[10px] tracking-hud uppercase">
          <div className="flex items-center gap-2">
            <Jumpman size={14} className="text-varsity" />
            <span className="text-jordan-black/80">Leaderboard</span>
          </div>
          <button
            onClick={() => setView(view === "list" ? "map" : "list")}
            className="px-2 py-1 rounded-xs border border-jordan-black/30 text-jordan-black hover:border-jordan-black"
          >
            {view === "list" ? "Map" : "List"}
          </button>
        </div>

        {/* Tabs */}
        <div className="px-4 mt-4 flex gap-2 overflow-x-auto no-scrollbar">
          {(["court", "neighborhood", "city", "global"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xs font-mono text-[10px] tracking-hud uppercase border ${
                tab === t
                  ? "border-varsity text-jordan-black bg-varsity/10"
                  : "border-jordan-black/20 text-jordan-black/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="px-4 mt-3 font-mono text-[9px] tracking-label uppercase text-sweat">
          {tab === "court"
            ? "West 4th · Greenwich Village"
            : tab === "city"
            ? "All of NYC · 1,247 players"
            : tab === "neighborhood"
            ? "Greenwich Village · 38 players"
            : "Global · all hoopers"}
        </div>

        {view === "list" ? (
          <div ref={rowsRef} className="flex-1 mt-3 overflow-y-auto no-scrollbar">
            {list.map((row) => (
              <div
                key={row.rank + row.nickname}
                className={`row hairline-b flex items-center gap-3 px-4 py-3 ${
                  row.highlight ? "bg-varsity/10 border-l-2 border-l-varsity" : ""
                }`}
              >
                <span
                  className={`display-tight w-10 text-center tabular text-[28px] ${
                    row.rank <= 3 ? "text-win-gold" : "text-jordan-black/50"
                  }`}
                >
                  {String(row.rank).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[12px] tracking-hud uppercase text-jordan-black truncate">
                    {row.nickname}
                  </div>
                  <div className="font-mono text-[9px] tracking-hud uppercase text-sweat">
                    {row.court}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[11px] tabular text-jordan-black">
                    {row.record}
                  </div>
                  {row.streak > 0 && (
                    <div className="font-mono text-[9px] text-win-gold tabular">
                      W{row.streak}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 mt-3 px-4 pb-4">
            <div className="relative w-full h-full">
              <NYCMap className="w-full h-full" width={320} height={500} />
              {/* Courts as dots */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 320 500"
                preserveAspectRatio="xMidYMid meet"
              >
                {courts.map((c) => {
                  const { x, y } = latLngToSVG(c.lat, c.lng, 320, 420);
                  const yShifted = y + 40; // align with the NYCMap viewBox shift
                  const color = c.conquered ? "#D4A938" : c.status === "live" ? "#FF2D2D" : "#E8E6E1";
                  return (
                    <g key={c.id}>
                      <circle
                        cx={x}
                        cy={yShifted}
                        r="8"
                        fill={color}
                        opacity="0.25"
                      >
                        {c.status === "live" && (
                          <animate
                            attributeName="r"
                            from="6"
                            to="14"
                            dur="1.4s"
                            repeatCount="indefinite"
                          />
                        )}
                        {c.status === "live" && (
                          <animate
                            attributeName="opacity"
                            from="0.4"
                            to="0"
                            dur="1.4s"
                            repeatCount="indefinite"
                          />
                        )}
                      </circle>
                      <circle cx={x} cy={yShifted} r="3" fill={color} />
                      <text
                        x={x + 8}
                        y={yShifted + 3}
                        fontFamily="var(--font-ibm-plex-mono), monospace"
                        fontSize="7"
                        fill="#0A0A0A"
                        letterSpacing="1"
                      >
                        {c.name.split(" ")[0].toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>
              {/* Legend */}
              <div className="absolute bottom-2 left-2 right-2 hairline rounded-xs bg-white/80 backdrop-blur-sm p-3 font-mono text-[9px] tracking-hud uppercase">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1.5 text-win-gold">
                    <span className="h-2 w-2 rounded-full bg-win-gold" /> Conquered
                  </span>
                  <span className="flex items-center gap-1.5 text-hype">
                    <span className="h-2 w-2 rounded-full bg-hype" /> Live now
                  </span>
                  <span className="flex items-center gap-1.5 text-chrome">
                    <span className="h-2 w-2 rounded-full bg-chrome" /> Idle
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
