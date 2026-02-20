/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Cormorant Garamond"', 'Garamond', 'serif'],
        body: ['Lato', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        aura: {
          black: '#0A0A0A',
          white: '#FAFAFA',
          cream: '#F5F0E8',
          gold: '#C9A96E',
          'gold-dark': '#9E7A3F',
          'gold-light': '#E8D5B0',
          charcoal: '#2A2A2A',
          muted: '#6B6B6B',
          border: '#E0E0E0',
          accent: '#8B1A1A',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        none: '0px',
      },
      boxShadow: {
        luxury: '0 4px 24px rgba(0,0,0,0.08)',
        'luxury-lg': '0 12px 48px rgba(0,0,0,0.12)',
        hover: '0 8px 32px rgba(0,0,0,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
