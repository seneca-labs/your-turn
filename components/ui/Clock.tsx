"use client";
import { useEffect, useState } from "react";

export function Clock({ className = "", format = "hms" }: { className?: string; format?: "hms" | "hm12" }) {
  const [t, setT] = useState("");
  useEffect(() => {
    function tick() {
      const d = new Date();
      if (format === "hm12") {
        let h = d.getHours();
        const m = String(d.getMinutes()).padStart(2, "0");
        const ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;
        setT(`${h}:${m} ${ampm}`);
      } else {
        const h = String(d.getHours()).padStart(2, "0");
        const m = String(d.getMinutes()).padStart(2, "0");
        const s = String(d.getSeconds()).padStart(2, "0");
        setT(`${h}:${m}:${s}`);
      }
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [format]);

  return (
    <span className={`tabular font-mono ${className}`}>{t || (format === "hm12" ? "8:42 AM" : "00:00:00")}</span>
  );
}
