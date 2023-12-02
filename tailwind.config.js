/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zilla: ["Zilla Slab", "serif"],
      },
      backgroundImage: {
        "blob-scene-orange": "url('/images/blob-scene-orange.svg')",
        "blob-scene-amber": "url('/images/blob-scene-amber.svg')",
        "blob-scene-light": "url('/images/blob-scene-light.svg')",
        "home-blob-light": "url('/images/blob-scene-light-home.svg')",
        "home-blob-dark": "url('/images/blob-scene-dark-home.svg')",
      },
      colors: {
        "light-gray": "#8e9aab",
      },
    },
  },
  plugins: [],
};