type Tone = "light" | "dark";

const toneClass = (tone: Tone) =>
  tone === "light" ? "text-jordan-black" : "text-white";

export function IOSStatusBar({
  tone = "light",
  time = "8:42",
}: {
  tone?: Tone;
  time?: string;
}) {
  return (
    <div
      className={`absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-7 pt-3 pb-1.5 font-mono text-[15px] font-medium tabular ${toneClass(
        tone,
      )} pointer-events-none`}
    >
      <span className="tracking-tight">{time}</span>

      <span className="flex items-center gap-1.5">
        {/* Cellular bars */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none" aria-hidden>
          <rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill="currentColor" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" fill="currentColor" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="currentColor" />
        </svg>

        {/* Wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden>
          <path
            d="M1 4.2 A10 10 0 0 1 15 4.2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M3.5 6.4 A6.5 6.5 0 0 1 12.5 6.4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M5.8 8.6 A3 3 0 0 1 10.2 8.6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="8" cy="10.4" r="0.7" fill="currentColor" />
        </svg>

        {/* Battery */}
        <span className="ml-0.5 inline-flex items-center">
          <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden>
            <rect
              x="0.5"
              y="0.5"
              width="22"
              height="11"
              rx="2.6"
              stroke="currentColor"
              strokeOpacity="0.4"
              strokeWidth="1"
              fill="none"
            />
            <rect
              x="2"
              y="2"
              width="17"
              height="8"
              rx="1.6"
              fill="currentColor"
            />
            <rect
              x="23.5"
              y="4"
              width="1.8"
              height="4"
              rx="0.6"
              fill="currentColor"
              fillOpacity="0.4"
            />
          </svg>
        </span>
      </span>
    </div>
  );
}

export function IOSHomeIndicator({ tone = "light" }: { tone?: Tone }) {
  const bg = tone === "light" ? "bg-jordan-black/85" : "bg-white/85";
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 flex items-end justify-center pb-2 pointer-events-none">
      <div className={`h-[5px] w-[134px] rounded-full ${bg}`} />
    </div>
  );
}

export function IOSDynamicIsland() {
  return (
    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 h-[34px] w-[120px] rounded-full bg-jordan-black pointer-events-none" />
  );
}

/**
 * Lock-screen affordances: flashlight (bottom-left), camera (bottom-right),
 * lock icon (above the clock). Anchored to the PhoneFrame.
 */
export function LockScreenAffordances({ tone = "light" }: { tone?: Tone }) {
  const fill =
    tone === "light"
      ? "bg-jordan-black/8 text-jordan-black/80 border-jordan-black/10"
      : "bg-white/15 text-white/90 border-white/15";
  return (
    <>
      <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30">
        <LockGlyph tone={tone} />
      </div>

      <div
        className={`absolute bottom-16 left-6 z-30 h-11 w-11 rounded-full border ${fill} flex items-center justify-center backdrop-blur-md`}
      >
        <FlashlightGlyph />
      </div>

      <div
        className={`absolute bottom-16 right-6 z-30 h-11 w-11 rounded-full border ${fill} flex items-center justify-center backdrop-blur-md`}
      >
        <CameraGlyph />
      </div>
    </>
  );
}

function LockGlyph({ tone }: { tone: Tone }) {
  const color = tone === "light" ? "text-jordan-black/70" : "text-white/85";
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" className={color}>
      <path
        d="M3 8 V5.5 A4 4 0 0 1 11 5.5 V8"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
      <rect
        x="1"
        y="8"
        width="12"
        height="9"
        rx="1.6"
        fill="currentColor"
      />
    </svg>
  );
}

function FlashlightGlyph() {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
      <path
        d="M4 2 H10 L10 6 L12 9 V16 H2 V9 L4 6 Z"
        fill="currentColor"
      />
      <rect x="6" y="11" width="2" height="3" rx="0.5" fill="#FFFFFF" fillOpacity="0.6" />
    </svg>
  );
}

function CameraGlyph() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
      <path
        d="M2 3 H5 L6.5 1 H11.5 L13 3 H16 A1 1 0 0 1 17 4 V12 A1 1 0 0 1 16 13 H2 A1 1 0 0 1 1 12 V4 A1 1 0 0 1 2 3 Z"
        fill="currentColor"
      />
      <circle cx="9" cy="8" r="3" fill="#FFFFFF" fillOpacity="0.25" />
      <circle cx="9" cy="8" r="2" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="1" fill="none" />
    </svg>
  );
}
