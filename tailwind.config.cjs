module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  important: '#__next',
  theme: {
    extend: {
      // check data/colors.ts
      colors: {
        vocal: '#ed60bb',
        dance: '#1394ff',
        visual: '#fca104',
        stamina: '#99db66',
        default: 'blue',
      },
    },
  },
  plugins: [],
}
