"use client";
import { useEffect } from "react";

// Inverts whatever it hovers via mix-blend-mode: difference.
// Desktop only — short-circuits on coarse pointers (touch).
export function SpotlightCursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const spot = document.createElement("div");
    const ring = document.createElement("div");
    spot.className = "yt-spot";
    ring.className = "yt-ring";
    document.body.appendChild(spot);
    document.body.appendChild(ring);
    document.body.style.cursor = "none";

    const move = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      spot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };
    const enter = () => {
      spot.style.opacity = "1";
      ring.style.opacity = "1";
    };
    const leave = () => {
      spot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest) return;
      const expand = t.closest("a, button, [data-hover-expand]");
      const contract = t.closest("img, video, iframe");
      if (contract) {
        spot.style.width = spot.style.height = "10px";
        ring.style.width = ring.style.height = "20px";
      } else if (expand) {
        spot.style.width = spot.style.height = "34px";
        ring.style.width = ring.style.height = "60px";
      } else {
        spot.style.width = spot.style.height = "20px";
        ring.style.width = ring.style.height = "40px";
      }
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseover", over);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseover", over);
      document.body.style.cursor = "";
      spot.remove();
      ring.remove();
    };
  }, []);

  return null;
}
