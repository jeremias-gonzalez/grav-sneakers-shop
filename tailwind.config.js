/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"


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
    nextui()
  ],
}

