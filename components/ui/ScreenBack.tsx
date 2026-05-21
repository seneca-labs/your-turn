import Link from "next/link";

export function ScreenBack({ to = "/" }: { to?: string }) {
  return (
    <Link
      href={to}
      aria-label="Back to index"
      className="absolute top-2 left-3 z-50 inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-xs font-mono text-[9px] tracking-hud uppercase text-jordan-black/30 hover:text-jordan-black/80 transition-colors"
    >
      <span className="inline-flex items-center justify-center h-[14px] min-w-[22px] px-1 rounded-[2px] border border-jordan-black/25 bg-white/40 backdrop-blur-sm leading-none">
        esc
      </span>
    </Link>
  );
}
