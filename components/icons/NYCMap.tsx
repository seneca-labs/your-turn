// Stylized NYC borough silhouette. Hand-tuned approximate polygons.
// Each borough is a simple path; courts mount as dots overlaid by lat/lng → SVG-x/y.

export const NYC_BOUNDS = {
  // Tight bounds covering all 6 courts plus a little margin.
  minLat: 40.65,
  maxLat: 40.88,
  minLng: -74.02,
  maxLng: -73.87,
};

export function latLngToSVG(lat: number, lng: number, w = 320, h = 420) {
  const xRatio = (lng - NYC_BOUNDS.minLng) / (NYC_BOUNDS.maxLng - NYC_BOUNDS.minLng);
  const yRatio = 1 - (lat - NYC_BOUNDS.minLat) / (NYC_BOUNDS.maxLat - NYC_BOUNDS.minLat);
  return { x: xRatio * w, y: yRatio * h };
}

export function NYCMap({ className = "", width = 320, height = 420 }: { className?: string; width?: number; height?: number }) {
  // Highly stylized: Manhattan as a long vertical sliver, Brooklyn east-south block,
  // Bronx top, Queens east block, Staten left-bottom. Geometric, not geographically accurate.
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 320 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Water background — deep navy bleed */}
      <rect width="320" height="420" fill="#FFFFFF" />

      {/* Bronx */}
      <path
        d="M120 0 L240 0 L260 30 L240 70 L180 80 L130 60 L100 40 Z"
        fill="#F0EDE6"
        stroke="rgba(10,10,10,0.35)"
        strokeWidth="1"
      />

      {/* Manhattan */}
      <path
        d="M110 50 L150 60 L165 110 L175 165 L180 220 L170 260 L150 290 L130 280 L115 245 L105 195 L100 130 Z"
        fill="#E8E4DA"
        stroke="rgba(10,10,10,0.45)"
        strokeWidth="1.2"
      />

      {/* Queens */}
      <path
        d="M200 70 L320 60 L320 220 L260 240 L210 220 L185 170 L200 110 Z"
        fill="#F0EDE6"
        stroke="rgba(10,10,10,0.35)"
        strokeWidth="1"
      />

      {/* Brooklyn */}
      <path
        d="M155 280 L210 240 L280 250 L300 300 L270 380 L200 400 L150 370 L130 320 Z"
        fill="#F0EDE6"
        stroke="rgba(10,10,10,0.35)"
        strokeWidth="1"
      />

      {/* Staten Island */}
      <path
        d="M0 320 L60 300 L100 340 L80 400 L20 410 L0 380 Z"
        fill="#F0EDE6"
        stroke="rgba(10,10,10,0.35)"
        strokeWidth="1"
      />

      {/* Grid texture / labels */}
      <g
        fontFamily="var(--font-ibm-plex-mono), monospace"
        fontSize="7"
        letterSpacing="2"
        fill="rgba(10,10,10,0.35)"
      >
        <text x="100" y="40">BRONX</text>
        <text x="125" y="180">MANHATTAN</text>
        <text x="245" y="160">QUEENS</text>
        <text x="200" y="330">BROOKLYN</text>
        <text x="20" y="370">S.I.</text>
      </g>
    </svg>
  );
}
