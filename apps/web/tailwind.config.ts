import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "Space Grotesk", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      colors: {
        ink: "#05070b",
        panel: "rgba(255,255,255,.07)",
        stroke: "rgba(255,255,255,.14)",
      },
      boxShadow: {
        metal: "inset 0 1px 0 rgba(255,255,255,.16), 0 24px 80px rgba(0,0,0,.35)",
        glow: "0 0 80px color-mix(in srgb, var(--accent) 32%, transparent)",
      },
      animation: {
        scan: "scan 4s linear infinite",
        float: "float 7s ease-in-out infinite",
        pulseGlow: "pulseGlow 3.4s ease-in-out infinite",
      },
      keyframes: {
        scan: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
        float: { "0%,100%": { transform: "translate3d(0,0,0)" }, "50%": { transform: "translate3d(0,-18px,0)" } },
        pulseGlow: { "0%,100%": { opacity: ".42" }, "50%": { opacity: ".86" } },
      },
    },
  },
  plugins: [],
};
export default config;
