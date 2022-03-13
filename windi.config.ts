import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  // let MUI do that
  preflight: false,
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },
})
