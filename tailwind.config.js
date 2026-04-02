/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        app:             'rgb(var(--bg-app) / <alpha-value>)',
        surface:         'rgb(var(--bg-surface) / <alpha-value>)',
        'surface-hover': 'rgb(var(--bg-surface-hover) / <alpha-value>)',
        primary:         'rgb(var(--text-primary) / <alpha-value>)',
        secondary:       'rgb(var(--text-secondary) / <alpha-value>)',
        brand:           'rgb(var(--color-brand) / <alpha-value>)',
        success:         'rgb(var(--color-success) / <alpha-value>)',
        danger:          'rgb(var(--color-danger) / <alpha-value>)',
        warning:         'rgb(var(--color-warning) / <alpha-value>)',
        border:          'rgb(var(--border-color) / <alpha-value>)',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}