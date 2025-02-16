import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        marshall : {
          '50': '#eefff3',
          '100': '#d7ffe5',
          '200': '#b2ffcc',
          '300': '#76ffa6',
          '400': '#33f579',
          '500': '#09de55',
          '600': '#00b140',
          '700': '#049138',
          '800': '#0a7130',
          '900': '#0a5d2a',
          '950': '#003415',
      },
        
      },
    },
  },
  plugins: [],
} satisfies Config;
