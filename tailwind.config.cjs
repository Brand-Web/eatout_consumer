/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        back: "#FDFDFD",
        primary: "#FFCB54",
        accent: "#F0F4F7",
        secondary: "#ffffff",
        "text-light": "#4A5B6F",
        text: "#0B0B0B"
      },
      padding: {
        content: "1.5rem"
      },
      margin: {
        content: "1.5rem"
      }
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      mytheme: {
        primary: "#FFCB54",
        secondary: "#0B0B0B",
        accent: "#F0F4F7",
        neutral: "#3d4451",
      },
    }, ],
  },
}