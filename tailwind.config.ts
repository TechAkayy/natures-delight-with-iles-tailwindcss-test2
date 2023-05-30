import {
  pg_colors,
  pg_fonts,
  pg_backgrounds,
} from './themes/pg-tailwindcss/tokens.mjs'

import { safelist } from './src/utils/colors'

export default {
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@pinegrow/tailwindcss-plugin').default({
      colors: pg_colors, // primary, secondary etc
      fonts: pg_fonts,
      backgrounds: pg_backgrounds, // bg-design-image, bg-design-image-large
    }),
  ],

  safelist: [
    {
      pattern: /pg-(.+)/, // If using pg classes dynamically in components
    },
    ...safelist,
  ],

  get content() {
    const _content = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,mdx}']
    return process.env.NODE_ENV === 'production'
      ? _content
      : [..._content, './_pginfo/**/*.{html,js}'] // used by Vue Desginer for live-designing during development
  },
}
