// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
      },
      colors: {
        // Light mode colors
        primary: {
          light: '#86efac', // green
          DEFAULT: '#4ade80',
        },
        // Dark mode colors
        'primary-dark': {
          light: '#fde68a', // yellow
          DEFAULT: '#fbbf24',
        }
      }
    },
  },
  plugins: [],
};
