import { useLocale, useTranslations } from 'next-intl'

const useTrx = (t: string) => {
    const lang = useLocale()
    return useTranslations(`${lang}.${t}`)
}

export default useTrx
