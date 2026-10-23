/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--serif)"],
        mono: ["var(--mono)"],
      },
    },
  },
  plugins: [],
};

module.exports = config;
