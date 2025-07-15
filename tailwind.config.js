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
          50: '#f9f5ff',
          100: '#f2e9ff',
          200: '#e8d5ff',
          300: '#d7b4ff',
          400: '#c38bff',
          500: '#9B7EBD',
          600: '#8e66c2',
          700: '#7b4eb8',
          800: '#664299',
          900: '#54357a',
        },
        secondary: {
          50: '#f0f9f6',
          100: '#dbf2e9',
          200: '#b9e5d5',
          300: '#8ed2bb',
          400: '#62ba9f',
          500: '#7FB3A1',
          600: '#359376',
          700: '#2b7560',
          800: '#245e4f',
          900: '#1f4d43',
        },
        accent: {
          50: '#fff7f3',
          100: '#ffede5',
          200: '#ffd9cc',
          300: '#ffbba3',
          400: '#ff9269',
          500: '#FFB69E',
          600: '#ff5a1f',
          700: '#d03e11',
          800: '#ab3412',
          900: '#8c2f17',
        },
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}