/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      margin: {
        '580px': '580px',
        '100%': '100%'
      }
    }
  },
  variants: {
    extend: {
      display: ['group-focus']
    }
  },
  plugins: []
}
