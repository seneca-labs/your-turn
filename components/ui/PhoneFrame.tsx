"use client";
import { MouseEvent, ReactNode, useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { demoOrder } from "@/lib/mockData";

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [role="button"], [data-nav-skip]';

export function PhoneFrame({
  children,
  bg = "var(--bg)",
}: {
  children: ReactNode;
  bg?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const goPrev = useCallback(() => {
    const idx = demoOrder.indexOf(pathname);
    if (idx < 0) return;
    router.push(demoOrder[(idx + demoOrder.length - 1) % demoOrder.length]);
  }, [pathname, router]);

  const goNext = useCallback(() => {
    const idx = demoOrder.indexOf(pathname);
    if (idx < 0) return;
    router.push(demoOrder[(idx + 1) % demoOrder.length]);
  }, [pathname, router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        router.push("/");
        return;
      }

      if (e.key === "ArrowLeft") {
        if (demoOrder.indexOf(pathname) < 0) return;
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        if (demoOrder.indexOf(pathname) < 0) return;
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pathname, router, goPrev, goNext]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (demoOrder.indexOf(pathname) < 0) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const w = rect.width;
      if (x < w / 3) goPrev();
      else if (x > (2 * w) / 3) goNext();
    },
    [pathname, goPrev, goNext],
  );

  const showZones = demoOrder.indexOf(pathname) >= 0;

  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-[#EAE7E0]">
      <div
        className="phone group/phone"
        style={{ background: bg }}
        onClick={handleClick}
      >
        {children}
        {showZones && <EdgeHints />}
      </div>
    </div>
  );
}

function EdgeHints() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1/3 pointer-events-none z-[60] flex items-center justify-start pl-3 opacity-0 group-hover/phone:opacity-100 transition-opacity duration-300"
      >
        <div className="h-10 w-10 rounded-full bg-white/55 backdrop-blur-md flex items-center justify-center text-jordan-black/60 shadow-[0_4px_14px_rgba(10,10,10,0.10)]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 2 L4 7 L9 12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-1/3 pointer-events-none z-[60] flex items-center justify-end pr-3 opacity-0 group-hover/phone:opacity-100 transition-opacity duration-300"
      >
        <div className="h-10 w-10 rounded-full bg-white/55 backdrop-blur-md flex items-center justify-center text-jordan-black/60 shadow-[0_4px_14px_rgba(10,10,10,0.10)]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 2 L10 7 L5 12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export function StatusBar({ tone = "light" }: { tone?: "light" | "dark" }) {
  const color = tone === "light" ? "text-jordan-black" : "text-jordan-black";
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
