/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        app : '12.5rem 1fr',
      },
      backgroundColor: {
        modal : 'rgba(0,0,0,0.6)',
      }
    },
  },
  plugins: [],
}

