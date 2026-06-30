import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1A2340',
        'navy-hover': '#2D3A5C',
        gold: '#B8923A',
        'gold-hover': '#9E7A2E',
        'gold-light': '#F5EDD8',
        'gold-muted': '#D4B06A',
        'warm-white': '#F8F6F2',
        'warm-alt': '#F0EDE8',
        slate: '#4A5568',
        'border-c': '#E2DDD6',
        'border-strong': '#C8C2B8',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'var(--font-noto-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'var(--font-noto-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(26,35,64,0.06)',
        'card-hover': '0 4px 12px rgba(26,35,64,0.1)',
      },
    },
  },
  plugins: [],
}

export default config
