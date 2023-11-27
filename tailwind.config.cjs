module.exports = {
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    darkMode: 'class',
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
    safelist: [
        'border-vocal',
        'border-dance',
        'border-visual',
        'border-[#a5adff]',
        'border-[#d894fc]',
        'border-[#81c275]',
    ],
    plugins: [],
}
