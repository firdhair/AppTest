/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
       fontFamily: {
        minimo: ['minimo', 'sans-serif'], 
        minimoBold: ['minimo-bold', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

