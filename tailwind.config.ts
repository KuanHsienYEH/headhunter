import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand:        '#0052A5',
        'brand-hover':'#003d80',
        'brand-light':'#E8F0FB',
        'brand-dark': '#003068',
        accent:       '#FF6B00',
        'accent-hover':'#e05f00',
        'accent-light':'#FFF0E6',
        dark:         '#333F4F',
        'dark-hover': '#445263',
        'dark-light': '#F5F7FA',
        success:      '#27AE60',
        'success-light':'#EAF7F0',
        muted:        '#6B7A8D',
        'border-c':   '#E0E4EA',
        'border-strong':'#C5CCD6',
        // 舊版配色 — 後台 (admin) 頁面仍在使用,移除前需先重構 admin UI
        navy:         '#1A2340',
        'navy-hover': '#2D3A5C',
        gold:         '#B8923A',
        'gold-hover': '#9E7A2E',
        'gold-light': '#F5EDD8',
        'gold-muted': '#D4B06A',
        'warm-white': '#F8F6F2',
        'warm-alt':   '#F0EDE8',
        slate:        '#4A5568',
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Noto Sans TC"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 6px 20px rgba(0,82,165,0.12)',
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
