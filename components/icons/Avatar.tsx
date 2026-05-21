/**
 * Generic player avatar — head + shoulders silhouette inside a tinted circle.
 * Used everywhere a real profile picture would go. Reserve Jumpman for
 * actual Jordan Brand moments.
 */
export function Avatar({
  size = 32,
  tone = "default",
  className = "",
}: {
  size?: number;
  tone?: "default" | "challenger" | "self" | "dark";
  className?: string;
}) {
  const palette = {
    default: { ring: "#B8B5AD", bg: "#E8E6E1", fg: "#6B6B6B" },
    challenger: { ring: "#CE1126", bg: "#FFFFFF", fg: "#0A0A0A" },
    self: { ring: "#B8902A", bg: "#FFFFFF", fg: "#0A0A0A" },
    dark: { ring: "#0A0A0A", bg: "#0A0A0A", fg: "#F5F2EB" },
  }[tone];

  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        background: palette.bg,
        boxShadow: `inset 0 0 0 1.5px ${palette.ring}`,
      }}
      aria-hidden
    >
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 24 24"
        fill="none"
        style={{ transform: "translateY(2px)" }}
      >
        {/* Head */}
        <circle cx="12" cy="9" r="4" fill={palette.fg} />
        {/* Shoulders */}
        <path
          d="M3 24 C 3 17, 8 14, 12 14 C 16 14, 21 17, 21 24 Z"
          fill={palette.fg}
        />
      </svg>
    </span>
  );
}
