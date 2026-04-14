import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        visio: {
          bg: "#070B14",
          surface: "#0D1625",
          card: "#0F1929",
          input: "#111E30",
          primary: "#5B5FEF",
          success: "#00D68F",
          warning: "#F0A500",
          danger: "#FF6B6B",
          text: "#EEF2FF",
          "text-secondary": "#94A3C4",
          "text-muted": "#4A5A7A",
        },
      },
    },
  },
  plugins: [],
};

export default config;
