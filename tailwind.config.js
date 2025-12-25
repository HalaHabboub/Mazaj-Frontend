/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#36e27b",
        "background-light": "#f6f8f7",
        "background-dark": "#09090b",
        "card-dark": "#18181b",
        "card-border": "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        "display": ["Spline Sans", "sans-serif"],
        "body": ["Spline Sans", "sans-serif"],
      },
      boxShadow: {
        "neon": "0 0 20px rgba(54, 226, 123, 0.3)",
      }
    },
  },
  plugins: [],
}