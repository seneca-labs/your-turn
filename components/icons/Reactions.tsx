export function Flame({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2 C12 6 8 7 8 12 C8 16 10 18 12 18 C14 18 16 16 16 12 C16 9 14 8 14 5 C13 7 12 7 12 2 Z M10 14 C10 16 11 17 12 17 C13 17 14 16 14 14 C14 12 13 11 12 10 C12 12 10 12 10 14 Z" />
    </svg>
  );
}

export function Snow({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.5" y1="4.5" x2="19.5" y2="19.5" />
      <line x1="19.5" y1="4.5" x2="4.5" y2="19.5" />
      <polyline points="9,3 12,5 15,3" />
      <polyline points="9,21 12,19 15,21" />
      <polyline points="3,9 5,12 3,15" />
      <polyline points="21,9 19,12 21,15" />
    </svg>
  );
}

export function Skull({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 11 C6 6 9 3 12 3 C15 3 18 6 18 11 V15 H15 V19 H9 V15 H6 Z" />
      <circle cx="9" cy="11" r="1.4" fill="currentColor" />
      <circle cx="15" cy="11" r="1.4" fill="currentColor" />
      <line x1="11" y1="15" x2="13" y2="15" />
    </svg>
  );
}

export function HypeDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex h-2 w-2 ${className}`}
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-full bg-hype animate-live-pulse" />
      <span className="relative inline-block h-2 w-2 rounded-full bg-hype" />
    </span>
  );
}
