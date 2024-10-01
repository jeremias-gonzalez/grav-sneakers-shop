/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",


  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#4e60f5', // Agrega tu nuevo color aquí
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

