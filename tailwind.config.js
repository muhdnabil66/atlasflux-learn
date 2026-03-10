/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // <-- penting untuk tema dark
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsz,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "var(--accent-base)",
          soft: "var(--accent-soft)",
        },
      },
    },
  },
  plugins: [],
};
