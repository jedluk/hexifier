/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

const rotateX = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-X-90': {
      transform: 'rotateX(90deg)'
    },
    '.rotate-X-180': {
      transform: 'rotateX(180deg)'
    }
  })
})

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Mulish', 'sans-serif']
      }
    }
  },
  plugins: [rotateX]
}
