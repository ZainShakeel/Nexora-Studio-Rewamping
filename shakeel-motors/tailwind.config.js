/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0057D9', // primary
          light: '#0A6CFF', // secondary blue
          dark: '#0046B0',
        },
        navy: {
          DEFAULT: '#031A3A',
          light: '#072a52',
          800: '#052145',
          900: '#031A3A',
        },
        surface: '#F5F8FC', // light background
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -6px rgba(3, 26, 58, 0.12)',
        'card-hover': '0 18px 40px -12px rgba(0, 87, 217, 0.28)',
        soft: '0 2px 10px rgba(3, 26, 58, 0.06)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s ease-out both',
        'fade-in': 'fade-in .5s ease-out both',
        'scale-in': 'scale-in .25s ease-out both',
      },
    },
  },
  plugins: [],
}
