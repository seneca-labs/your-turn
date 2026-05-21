import { ReactNode } from "react";

export function PhoneFrame({
  children,
  bg = "var(--bg)",
}: {
  children: ReactNode;
  bg?: string;
}) {
  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-[#050505]">
      <div className="phone" style={{ background: bg }}>
        {children}
      </div>
    </div>
  );
}

export function StatusBar({ tone = "light" }: { tone?: "light" | "dark" }) {
  const color = tone === "light" ? "text-bone" : "text-jordan-black";
  return (
    <div
      className={`flex items-center justify-between px-6 pt-2 pb-1 font-mono text-[13px] tabular ${color} relative z-10`}
    >
      <span>8:42</span>
      <span className="flex items-center gap-1">
        <span className="inline-block h-2 w-1 bg-current rounded-[1px]" />
        <span className="inline-block h-2.5 w-1 bg-current rounded-[1px]" />
        <span className="inline-block h-3 w-1 bg-current rounded-[1px]" />
        <span className="inline-block h-3.5 w-1 bg-current rounded-[1px]" />
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="ml-1">
          <path d="M1 5 A6 6 0 0 1 13 5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M3 6.5 A4 4 0 0 1 11 6.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="7" cy="8" r="0.8" fill="currentColor" />
        </svg>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none" className="ml-1">
          <rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="0.8" />
          <rect x="2" y="2" width="14" height="7" rx="1" fill="currentColor" />
          <rect x="19.5" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor" />
        </svg>
      </span>
    </div>
  );
}
