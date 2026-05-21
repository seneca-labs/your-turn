export function CourtSVG({ className = "" }: { className?: string }) {
  // Top-down half court diagram. Lines in court-line (white at 10% opacity).
  // 390 wide → ratio matches phone viewport.
  return (
    <svg
      viewBox="0 0 390 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Sideline border */}
      <rect x="20" y="20" width="350" height="460" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />

      {/* Three-point arc (above) */}
      <path
        d="M70 20 V120 A125 125 0 0 0 320 120 V20"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="2"
        fill="none"
      />

      {/* Free throw lane (the key) */}
      <rect x="135" y="20" width="120" height="190" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />

      {/* Free throw line */}
      <line x1="135" y1="210" x2="255" y2="210" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />

      {/* Free throw circle */}
      <path
        d="M135 210 A60 60 0 0 0 255 210"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M135 210 A60 60 0 0 1 255 210"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="2"
        strokeDasharray="6 6"
        fill="none"
      />

      {/* Restricted area arc near rim */}
      <path
        d="M170 60 A25 25 0 0 0 220 60"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="2"
        fill="none"
      />

      {/* Backboard + rim */}
      <line x1="170" y1="40" x2="220" y2="40" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
      <circle cx="195" cy="55" r="10" stroke="rgba(255,255,255,0.18)" strokeWidth="2" fill="none" />

      {/* Halfcourt line (bottom of viewbox) */}
      <line x1="20" y1="480" x2="370" y2="480" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />
      <circle cx="195" cy="480" r="44" stroke="rgba(255,255,255,0.10)" strokeWidth="2" fill="none" />
    </svg>
  );
}
