/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                bg: '#0a0a0c',
                'bg-dark': '#0a0a0c',
                border: '#27272a',
                'border-dark': '#27272a',
                text: '#ffffff',
                'text-secondary': '#a1a1aa',
                accent: '#6366f1',
                'accent-dark': '#8b5cf6',
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            }
        },
    },
    plugins: [],
    darkMode: 'class',
}
