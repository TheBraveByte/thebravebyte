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
        'bg-dark': '#0B1120', // Main background (Deep Navy)
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-secondary-dark': '#1e293b', // Secondary background (Slate 800)
        'bg-tertiary': 'var(--bg-tertiary)',
        'bg-tertiary-dark': '#334155', // Tertiary background (Slate 700)
        'border': 'var(--color-border)',
        'border-dark': '#334155', // Border (Slate 700)
        'text': 'var(--color-text)',
        'text-dark': '#f8fafc', // Text (Slate 50)
        'text-secondary': 'var(--color-text-secondary)',
        'text-secondary-dark': '#cbd5e1', // Secondary Text (Slate 300)
        'text-primary': 'var(--text-primary)',
        'primary': 'var(--accent-primary)',
        'accent': 'var(--color-accent)',
        'accent-dark': '#818cf8', // Accent (Indigo 400)
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
} satisfies Config
