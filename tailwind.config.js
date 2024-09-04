/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        offWhite:'#FAF9F6',
        greenish: '#1B7D13',
        light: 'rgb(249, 246, 239)',
        lightwood: 'rgb(249, 246, 239)',
        wood: 'rgb(217, 203, 192)',
        darkwood: 'rgb(102, 74, 50) '
      },
    },
  },
  plugins: [],
}
