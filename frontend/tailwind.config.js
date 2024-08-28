import aspectRatio from '@tailwindcss/aspect-ratio'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue':{
          'DEFAULT':'#007BFF'
        }
      }
    },
  },
  plugins: [
    aspectRatio
  ],
}

