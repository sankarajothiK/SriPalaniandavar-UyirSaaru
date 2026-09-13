/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#08120d',        // Luxury Obsidian Dark
          forest: '#064e3b',      // Royal Emerald Forest
          emerald: '#059669',     // Fresh Botanical Emerald
          mint: '#10b981',        // Vibrant Mint Glow
          mintLight: '#ecfdf5',
          gold: {
            DEFAULT: '#c59b27',   // Royal Gold
            light: '#f5c842',
            pale: '#fef3c7',
            accent: '#eab308'
          },
          ruby: '#e11d48',
          slate: {
            900: '#0f172a',
            800: '#1e293b',
            700: '#334155',
            600: '#475569',
            500: '#64748b',
            400: '#94a3b8',
            200: '#e2e8f0',
            100: '#f1f5f9',
            50: '#f8fafc',
          },
          surface: '#ffffff',
          cream: '#fcfdfd',
          border: '#e6ede9',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        tamil: ['"Noto Sans Tamil"', '"Mukta Malar"', 'sans-serif'],
        display: ['"Cinzel"', '"Plus Jakarta Sans"', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(6, 78, 59, 0.12), 0 0 1px 1px rgba(6, 78, 59, 0.05)',
        'luxury-hover': '0 30px 60px -15px rgba(6, 78, 59, 0.2), 0 0 1px 1px rgba(197, 155, 39, 0.25)',
        'gold-glow': '0 0 30px rgba(212, 160, 23, 0.25)',
        'emerald-glow': '0 0 35px rgba(5, 150, 105, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'float-delayed': 'floatSlow 8s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(4deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(14px) rotate(-4deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
