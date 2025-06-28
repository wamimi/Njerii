/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme (Apothecary's Garden)
        parchment: '#F5F5DC',
        charcoal: '#36454F',
        'sage-green': '#B2AC88',
        'matcha-green': '#889E81',
        'forest-green': '#3A4F41',
        
        // Dark theme
        'dark-bg': '#1A202C',
        'dark-text': '#E2E8F0',
        'dark-heading': '#A0AEC0',
        'dark-accent': '#889E81',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'serif': ['Lora', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'walk': 'walk 20s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        walk: {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(calc(100vw + 100px))' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}