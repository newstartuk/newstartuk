import type { Config } from "tailwindcss";

const config: Config = {
  content [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B7285",
          dark: "#102A43",
          light: "#1A9DB5",
        },
        accent: "#2F9E44",
        warning: "#F08C00",
        danger: "#C92A2A",
        brand: {
          50: "#E6F7F9",
          100: "#C2EBF2",
          200: "#99D8E6",
          300: "#70C5D9",
          400: "#47B2CC",
          500: "#1A9DB5",
          600: "#0B7285",
          700: "#0A6477",
          800: "#085969",
          900: "#063F4B",
        },
        navy: "#102A43",
        civic: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        border: "#D9E2EC",
        muted: "#627D98",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
