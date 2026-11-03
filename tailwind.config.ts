import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        'main-color': 'var(--main-color)',
        'main-highlight': 'var(--main-highlight)',
        'header-text': 'var(--header-text)',
        'theme-header-text': 'var(--header-text)',
      },
      fontFamily: {
        sans: [
          '"PingFang SC"',
          'PingFang',
          'Manrope',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('light', ['[data-theme="light"] &', '&[data-theme="light"]'])
    }),
  ],
} satisfies Config
