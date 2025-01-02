/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'soft-gold': '#D4AF37',
        'pastel-pink': '#FADADD',
        'off-white': '#FAF9F6',
        'light-beige': '#FFF5E1',
        'dark-gray': '#2C3E50',
        'light-turquoise': '#AEECEF',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'lora': ['Lora', 'serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};