import type { Config } from 'tailwindcss'

const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,ts,js}',
    './data/**/*.json'
  ],
  theme: {
    extend: {
      colors: {
        bg: v('bg'),
        surface: v('surface'),
        'surface-2': v('surface-2'),
        fg: v('fg'),
        muted: v('muted'),
        line: v('line'),
        primary: v('primary'),
        accent: v('accent')
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Plus Jakarta Sans Variable"', '"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 1px 2px rgb(15 23 42 / 0.04), 0 8px 30px rgb(15 23 42 / 0.06)',
        glow: '0 10px 40px -10px rgb(var(--primary) / 0.55)'
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        pulseDot: {
          '0%': { boxShadow: '0 0 0 0 rgb(16 185 129 / 0.6)' },
          '70%': { boxShadow: '0 0 0 8px rgb(16 185 129 / 0)' },
          '100%': { boxShadow: '0 0 0 0 rgb(16 185 129 / 0)' }
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s infinite',
        'fade-up': 'fadeUp .5s ease both'
      }
    }
  }
} satisfies Config
