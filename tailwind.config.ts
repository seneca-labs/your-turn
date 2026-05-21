import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "jordan-black": "#0A0A0A",
        "bone": "#F5F2EB",
        "varsity": "#CE1126",
        "court-concrete": "#1A1A1A",
        "asphalt": "#2D2D2D",
        "chrome": "#E8E6E1",
        "hype": "#FF2D2D",
        "win-gold": "#D4A938",
        "sweat": "#6B6B6B",
        "court-line": "rgba(255,255,255,0.10)",
        "pg-slate": "#6E7683",
        "pg-dim": "#CED2D9",
      },
      fontFamily: {
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        // No generic sans — type system is mono (workhorse) + display (impact).
        // Anything that defaults to sans falls back to mono.
        sans: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      borderRadius: {
        xs: "2px",
      },
      letterSpacing: {
        display: "-0.02em",
        hud: "0.18em",
        label: "0.25em",
      },
      lineHeight: {
        "tight-display": "0.9",
      },
      boxShadow: {
        card: "0 0 0 1px rgba(10,10,10,0.06)",
        "glow-varsity": "0 0 24px rgba(206,17,38,0.25)",
        "glow-gold": "0 0 32px rgba(184,144,42,0.30)",
      },
      keyframes: {
        "live-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(1.15)" },
        },
        "rgb-cycle": {
          "0%, 100%": { color: "#CE1126" },
          "50%": { color: "#D4A938" },
        },
        "nudge-right": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(4px)" },
        },
        "rec-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0.25" },
        },
        "hint-bob": {
          "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
          "50%": { transform: "translateX(-50%) translateY(4px)" },
        },
      },
      animation: {
        "live-pulse": "live-pulse 1.4s ease-in-out infinite",
        "rgb-cycle": "rgb-cycle 3s ease-in-out infinite",
        "nudge-right": "nudge-right 1.6s ease-in-out infinite",
        "rec-blink": "rec-blink 1s steps(2) infinite",
        "hint-bob": "hint-bob 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
