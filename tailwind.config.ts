import type { Config } from 'tailwindcss'

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg': 'var(--color-bg)',
        'bg-dark': 'var(--color-bg-dark)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-secondary-dark': 'var(--color-bg-secondary-dark)',
        'border': 'var(--color-border)',
        'border-dark': 'var(--color-border-dark)',
        'text': 'var(--color-text)',
        'text-dark': 'var(--color-text-dark)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-secondary-dark': 'var(--color-text-secondary-dark)',
        'accent': 'var(--color-accent)',
        'accent-dark': 'var(--color-accent-dark)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
} satisfies Config
