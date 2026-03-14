function getPreferredCustomFonts(locale: string): string[] {
    switch (locale) {
        case 'zh-Hant':
            return ['Noto Sans CJK TC']
        case 'en':
            return []
        case 'ja':
            return ['Hiragino Sans', 'Noto Sans CJK JP']
        case 'ko':
            return ['Malgun Gothic', 'Noto Sans CJK KR']
        case 'zh-Hans':
        default:
            return [
                'Noto Sans CJK SC',
                'Source Han Sans SC',
                'Microsoft YaHei UI',
                'Microsoft YaHei',
            ]
    }
}

function wrap(fontName: string) {
    return `"${fontName}"`
}

export default function pickFontSetForLocale(
    locale: string,
    useSystemFontsFirst: boolean,
) {
    const systemFonts = [
        // system UI font
        'system-ui',

        // only Apple can do
        '-apple-system',
        'BlinkMacSystemFont',
    ]

    const prefeerredFonts = getPreferredCustomFonts(locale).map(wrap)
    const fallbackFonts = ['sans-serif']
    const fontList = useSystemFontsFirst
        ? [...systemFonts, ...prefeerredFonts, ...fallbackFonts]
        : [...prefeerredFonts, ...systemFonts, ...fallbackFonts]

    return fontList.join(',')
}
