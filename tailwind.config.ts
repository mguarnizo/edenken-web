import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
          light: '#60a5fa',
        },
        secondary: {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#34d399',
        },
        dark: {
          DEFAULT: '#1f2937',
          darker: '#111827',
          lighter: '#374151',
        },
      },
    },
  },
  plugins: [],
};
export default config;

