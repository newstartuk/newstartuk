// This file is kept for reference only.
// The actual Tailwind configuration is in tailwind.config.js.
// Next.js 15 requires tailwind.config.ts to exist for TypeScript tailwind plugin support,
// but the real theme configuration lives in tailwind.config.js.
// Do NOT add duplicate theme config here — edit tailwind.config.js instead.
import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
export default config;
