/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ea',
          100: '#ccf0d5',
          200: '#99e0ab',
          300: '#66d182',
          400: '#33c158',
          500: '#00b22e',
          600: '#008e25',
          700: '#006b1c',
          800: '#004712',
          900: '#002409',
        },
        secondary: {
          50: '#e6f9fc',
          100: '#ccf3f9',
          200: '#99e7f3',
          300: '#66dbed',
          400: '#33cfe7',
          500: '#00c4e0',
          600: '#009db4',
          700: '#007687',
          800: '#004e5a',
          900: '#00272d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}