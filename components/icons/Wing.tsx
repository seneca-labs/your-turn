export function Wing({ size = 24, className = "" }: { size?: number; className?: string }) {
  // Jordan-coded wing accent. Geometric, not the Jumpman.
  // A single sharp swooping wing: two angled lines descending from a peak.
  return (
    <svg
      width={size}
      height={(size * 14) / 32}
      viewBox="0 0 32 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 13 L13 1 L16 4 L19 1 L32 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}
