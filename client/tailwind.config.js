/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'reddit-orange': '#ff4500'
      },
      fontFamily: {
        'lato': ['Lato','sans-serif']
      }
    },
  },
  plugins: [],
}
