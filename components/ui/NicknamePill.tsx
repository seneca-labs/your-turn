export type PillVariant = "default" | "challenger" | "self" | "gold";

export function NicknamePill({
  name,
  variant = "default",
  size = "md",
  className = "",
}: {
  name: string;
  variant?: PillVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const border =
    variant === "challenger"
      ? "border-varsity"
      : variant === "self"
      ? "border-win-gold"
      : variant === "gold"
      ? "border-win-gold"
      : "border-bone/40";
  const text =
    variant === "gold"
      ? "text-win-gold"
      : variant === "challenger"
      ? "text-bone"
      : "text-bone";

  const sizes = {
    sm: "px-2 py-1 text-[10px] tracking-hud",
    md: "px-3 py-1.5 text-[12px] tracking-hud",
    lg: "px-4 py-2 text-[14px] tracking-hud",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-xs border bg-jordan-black ${border} ${text} font-mono uppercase ${sizes[size]} ${className}`}
    >
      {name}
    </span>
  );
}
