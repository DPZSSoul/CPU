/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      outlineColor: {
        'pc-accent': '#E65100',
      },
      colors: {
        'pc-accent': '#E65100',
        'pc-accent-dark': '#BF360C',
        'pc-blue': '#2563EB',
        'pc-purple': '#7C3AED',
        'pc-teal': '#0D9488',
        'pc-coral': '#EA580C',
        'pc-mint': '#059669',
        'pc-sky': '#0284C7',
        'pc-indigo': '#4F46E5',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgb(0 0 0 / 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 0.03) 1px, transparent 1px)',
        'hero-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'bounce-subtle': 'bounce-subtle 0.6s ease-out',
        'success-pop': 'success-pop 0.5s ease-out',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'success-pop': {
          '0%': { transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 12px rgba(52, 211, 153, 0.4)' },
          '50%': { boxShadow: '0 0 24px rgba(52, 211, 153, 0.6)' },
        },
      },
      boxShadow: {
        'game': '0 4px 14px 0 rgba(59, 130, 246, 0.2)',
        'game-hover': '0 8px 25px 0 rgba(59, 130, 246, 0.3)',
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'card-hover': '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)',
        'glow': '0 0 40px -10px rgba(37, 99, 235, 0.4)',
      },
    },
  },
  plugins: [],
}
