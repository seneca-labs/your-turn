import anime from "animejs";

export const EASE = {
  enter: "easeOutExpo",
  exit: "easeInExpo",
  bounce: "spring(1, 80, 12, 0)",
} as const;

export function staggerIn(target: anime.AnimeAnimParams["targets"], opts: Partial<anime.AnimeAnimParams> = {}) {
  return anime({
    targets: target,
    opacity: [0, 1],
    translateY: [16, 0],
    duration: 600,
    delay: anime.stagger(80),
    easing: EASE.enter,
    ...opts,
  });
}

export function slideDown(target: anime.AnimeAnimParams["targets"], delay = 0) {
  return anime({
    targets: target,
    translateY: [-32, 0],
    opacity: [0, 1],
    duration: 500,
    delay,
    easing: EASE.enter,
  });
}

export function scaleIn(target: anime.AnimeAnimParams["targets"], opts: Partial<anime.AnimeAnimParams> = {}) {
  return anime({
    targets: target,
    scale: [0.7, 1],
    opacity: [0, 1],
    duration: 800,
    easing: EASE.enter,
    ...opts,
  });
}

export function countUp(el: HTMLElement, to: number, durationMs = 1000) {
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
    duration: 200,
    easing: "easeInQuad",
    complete: () => {
      el.textContent = to;
      anime({
        targets: el,
        rotateX: [90, 0],
        opacity: [0, 1],
        duration: 200,
        easing: "easeOutQuad",
      });
    },
  });
}

export function scrambleText(el: HTMLElement, target: string, durationMs = 900) {
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

export function voteBar(el: HTMLElement, percent: number, durationMs = 2400) {
  return anime({
    targets: el,
    width: [`0%`, `${percent}%`],
    duration: durationMs,
    easing: EASE.enter,
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
    duration: 1400,
    easing: "easeOutExpo",
  });
}
