/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cr_bg: "#080c07", // Dark background based on Figma
        cr_green: "#26ff2a", // Neon green for text/borders
        cr_green_dim: "#1b4d1b",
        cr_red: "#ff4d4d", // Red for errors
        cr_gray: "#e0e6ed"
      },
      fontFamily: {
        mono: ['"Fira Code"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}
