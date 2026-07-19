/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1B1F1C",
        inksoft: "#4B554E",
        sage: "#F3F6EF",
        paper: "#FFFFFF",
        line: "#DBE3D6",
        green: "#0B6E4F",
        greendeep: "#06432F",
        greentint: "#E7F0E9",
        gold: "#F0B429",
        golddeep: "#B9860C",
        rust: "#B94A1F",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Work Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};
