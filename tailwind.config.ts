/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

const config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'ripple': 'ripple 4s ease-in-out infinite',
        'ripple-reverse': 'ripple-reverse 4s ease-in-out infinite',
        'ripple-opacity': 'ripple-opacity 4s ease-in-out infinite',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: 0.5 },
          '50%': { transform: 'scale(1.2)', opacity: 0.3 },
          '100%': { transform: 'scale(0.8)', opacity: 0.5 },
        },
        'ripple-reverse': {
          '0%': { transform: 'scale(1.2)', opacity: 0.3 },
          '50%': { transform: 'scale(0.8)', opacity: 0.5 },
          '100%': { transform: 'scale(1.2)', opacity: 0.3 },
        },
        'ripple-opacity': {
          '0%': { opacity: 0.3 },
          '50%': { opacity: 0.7 },
          '100%': { opacity: 0.3 },
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
