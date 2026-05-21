import { Flame } from "@/components/icons";

export function RecordBadge({
  wins,
  losses,
  streak,
  className = "",
}: {
  wins: number;
  losses: number;
  streak?: number;
  className?: string;
}) {
  const showStreak = typeof streak === "number" && streak > 0;
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[12px] tracking-hud tabular ${
        showStreak ? "text-win-gold" : "text-bone"
      } ${className}`}
    >
      <span>
        {wins}-{losses}
      </span>
      {showStreak && (
        <span className="inline-flex items-center gap-1 text-win-gold">
          <Flame size={12} />
          W{streak}
        </span>
      )}
    </span>
  );
}
