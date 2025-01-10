/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Press Start 2P"', "monospace"],
      },
      colors: {
        retroYellow: "#ffcc00",
        retroGreen: "#66ff66",
        retroOrange: "#ff5733",
      },
      boxShadow: {
        pixel: "4px 4px 0 #1e1e1e",
        "pixel-inverse": "-4px -4px 0 #1e1e1e",
      },
    },
  },
  darkMode: "media", // o 'class'
  plugins: [],
};
