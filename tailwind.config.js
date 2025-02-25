/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...colors,
      theme: '#ed6e47',
    },
    extend: {
      spacing: {},
    },
  },
  plugins: [
    plugin(function ({addUtilities}) {
      const newUtilities = {
        '.flex-center': {
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
        },
        '.stretching': {
          width: '100%',
          height: '100%',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }),
  ],
}
