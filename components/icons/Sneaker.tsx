export function Sneaker({ className = "", colorVariant = "varsity" }: { className?: string; colorVariant?: "varsity" | "bone" | "concrete" }) {
  // Stylized side-profile sneaker silhouette. Custom geometric drawing.
  const upper = colorVariant === "varsity" ? "#CE1126" : colorVariant === "bone" ? "#F5F2EB" : "#2D2D2D";
  const sole = "#F5F2EB";
  const accent = "#0A0A0A";
  const lace = "#E8E6E1";
  return (
    <svg
      viewBox="0 0 400 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Sole */}
      <path
        d="M10 140 L20 158 Q40 168 80 168 H340 Q360 168 372 158 L385 140 Z"
        fill={sole}
        stroke={accent}
        strokeWidth="2"
      />
      {/* Sole stripe */}
      <line x1="20" y1="150" x2="380" y2="150" stroke={accent} strokeWidth="1" />

      {/* Upper main body */}
      <path
        d="M30 140 Q40 100 90 95 L150 88 Q185 78 220 60 L290 50 Q330 50 350 80 L370 110 Q375 130 360 140 Z"
        fill={upper}
        stroke={accent}
        strokeWidth="2"
      />

      {/* Toe cap separation */}
      <path
        d="M30 140 Q55 122 95 122 L150 120"
        stroke={accent}
        strokeWidth="1.5"
        fill="none"
      />

      {/* Heel patch */}
      <path
        d="M320 110 L355 100 L360 130 L325 135 Z"
        fill={accent}
      />

      {/* Lace strip */}
      <path
        d="M165 95 Q185 80 215 70 L275 60"
        stroke={lace}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line x1="180" y1="78" x2="170" y2="92" stroke={accent} strokeWidth="1.5" />
      <line x1="205" y1="68" x2="195" y2="82" stroke={accent} strokeWidth="1.5" />
      <line x1="230" y1="62" x2="220" y2="76" stroke={accent} strokeWidth="1.5" />
      <line x1="255" y1="58" x2="245" y2="72" stroke={accent} strokeWidth="1.5" />

      {/* Tongue label */}
      <rect x="225" y="58" width="22" height="14" fill={accent} />
      <text
        x="236"
        y="68"
        textAnchor="middle"
        fontFamily="var(--font-anton), Impact, sans-serif"
        fontSize="10"
        fill={upper === "#F5F2EB" ? "#CE1126" : "#F5F2EB"}
        letterSpacing="0.5"
      >
        JB
      </text>

      {/* Wing accent on side panel */}
      <path
        d="M90 120 L120 105 L130 110 L140 105 L170 120"
        stroke={sole}
        strokeWidth="2"
        fill="none"
      />

      {/* Eyelet dots */}
      <circle cx="180" cy="85" r="2" fill={accent} />
      <circle cx="205" cy="75" r="2" fill={accent} />
      <circle cx="230" cy="68" r="2" fill={accent} />
      <circle cx="255" cy="62" r="2" fill={accent} />
    </svg>
  );
}
