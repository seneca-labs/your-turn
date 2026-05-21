export function Ball({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1.5 12 H22.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 1.5 V22.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 4.5 Q12 12 4.5 19.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M19.5 4.5 Q12 12 19.5 19.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
