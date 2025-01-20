import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        georgian: ["var(--font-noto-sans-georgian)", "sans-serif"],
      },
      colors: {
        customDark: '#12131a',
        customYellow: '#d79922',
        customAmber: '#efb11d',
        customRed: '#e43d12',
        customBlueGray: '#2e3944',
        customGray: '#f5f5f5',
        customGray1: '#e5e5e5',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
