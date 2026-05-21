import { HypeDot } from "@/components/icons";

export function HypeIndicator({
  count,
  label = "PLAYING NOW",
  className = "",
}: {
  count: number;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-hud uppercase text-bone ${className}`}
    >
      <HypeDot />
      <span className="tabular text-hype font-bold">{count}</span>
      <span className="text-bone/80">{label}</span>
    </span>
  );
}
