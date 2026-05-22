import anime from "animejs";

export const EASE = {
  enter: "easeOutExpo",
  exit: "easeInExpo",
  bounce: "spring(1, 80, 12, 0)",
} as const;

// Global speed multiplier — bumped up to feel more graceful / cinematic.
// Applied to all helper durations and stagger delays. Inline anime() calls
// in screens are tuned individually; this keeps the shared helpers slow
// without re-touching every component.
const SPEED = 1.4;

export function staggerIn(target: anime.AnimeAnimParams["targets"], opts: Partial<anime.AnimeAnimParams> = {}) {
  return anime({
    targets: target,
    opacity: [0, 1],
    translateY: [16, 0],
    duration: 850 * SPEED / 1.4 * 1, // 850ms base, kept readable
    delay: anime.stagger(110),
    easing: EASE.enter,
    ...opts,
  });
}

export function slideDown(target: anime.AnimeAnimParams["targets"], delay = 0) {
  return anime({
    targets: target,
    translateY: [-32, 0],
    opacity: [0, 1],
    duration: 720,
    delay,
    easing: EASE.enter,
  });
}

export function scaleIn(target: anime.AnimeAnimParams["targets"], opts: Partial<anime.AnimeAnimParams> = {}) {
  return anime({
    targets: target,
    scale: [0.7, 1],
    opacity: [0, 1],
    duration: 1100,
    easing: EASE.enter,
    ...opts,
  });
}

export function countUp(el: HTMLElement, to: number, durationMs = 1400) {
  const obj = { v: 0 };
  return anime({
    targets: obj,
    v: to,
    round: 1,
    duration: durationMs,
    easing: EASE.enter,
    update: () => {
      el.textContent = String(obj.v);
    },
  });
}

export function flipNumber(el: HTMLElement, to: string) {
  return anime({
    targets: el,
    rotateX: [0, -90],
    opacity: [1, 0],
    duration: 280,
    easing: "easeInQuad",
    complete: () => {
      el.textContent = to;
      anime({
        targets: el,
        rotateX: [90, 0],
        opacity: [0, 1],
        duration: 280,
        easing: "easeOutQuad",
      });
    },
  });
}

export function scrambleText(el: HTMLElement, target: string, durationMs = 1200) {
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const steps = Math.max(8, Math.round(durationMs / 35));
  let step = 0;
  const id = setInterval(() => {
    const progress = step / steps;
    const cutoff = progress * target.length;
    let out = "";
    for (let i = 0; i < target.length; i++) {
      const ch = target[i];
      if (ch === " " || ch === "." || ch === "/" || ch === "·" || ch === "-") {
        out += ch;
      } else if (i < cutoff) {
        out += ch;
      } else {
        out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    el.textContent = out;
    step++;
    if (step > steps) {
      clearInterval(id);
      el.textContent = target;
    }
  }, durationMs / steps);
  return () => clearInterval(id);
}

export function voteBar(el: HTMLElement, percent: number, durationMs = 3000) {
  return anime({
    targets: el,
    width: [`0%`, `${percent}%`],
    duration: durationMs,
    easing: EASE.enter,
  });
}

/**
 * iOS-style notification arrival: drops from above with a subtle bounce
 * and a soft shadow swell. Tuned for the lock-screen notification card.
 */
export function notificationArrive(
  target: anime.AnimeAnimParams["targets"],
  delay = 0,
) {
  return anime({
    targets: target,
    translateY: [-24, 0],
    scale: [0.96, 1],
    opacity: [0, 1],
    boxShadow: [
      "0 0px 0px rgba(10,10,10,0)",
      "0 18px 42px rgba(10,10,10,0.18)",
    ],
    duration: 1000,
    delay,
    easing: "cubicBezier(0.16, 1, 0.3, 1)",
  });
}

export function glowOnce(target: anime.AnimeAnimParams["targets"]) {
  return anime({
    targets: target,
    boxShadow: [
      "0 0 0px rgba(212,169,56,0)",
      "0 0 32px rgba(212,169,56,0.55)",
      "0 0 12px rgba(212,169,56,0.2)",
    ],
    duration: 1900,
    easing: "easeOutExpo",
  });
}
