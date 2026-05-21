import Link from "next/link";

export function ScreenBack({ to = "/" }: { to?: string }) {
  return (
    <Link
      href={to}
      className="absolute top-2 left-3 z-50 inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[10px] tracking-hud uppercase text-bone/60 hover:text-bone transition-colors"
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M6 1 L2 5 L6 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
      </svg>
      <span>Index</span>
    </Link>
  );
}
