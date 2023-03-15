/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#FFA900",
        primaryDark: "#9D8221",
        secondary:"#1746A2",
        secondaryLight:"#5F9DF7"

      }
    },
  },
  plugins: [],
}
