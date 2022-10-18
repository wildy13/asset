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
        '1000px': '1000px',
        '970px': '970px',
        '120px': '120px',
        '500px': '500px',
        '600px': '600px'
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
