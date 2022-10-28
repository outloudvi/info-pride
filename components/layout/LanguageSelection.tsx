import { useCallback, useEffect, useState } from 'react'
import { NativeSelect } from '@mantine/core'
import { useRouter } from 'next/router'

const CurrentLanguage: Record<string, string> = {
    'zh-Hans': '中文（简体）',
    en: 'English',
}

const LanguageSelection = ({ className }: { className?: string }) => {
    const router = useRouter()

    const [_locale, _setLocale] = useState('')
    const languageKeys = Object.keys(CurrentLanguage)
    const languageNames = languageKeys.map((x) => CurrentLanguage[x])

    const updateLocale = useCallback(
        (locale: string) => {
            if (!router.isReady) return
            const { pathname, asPath, query, locale: routerLocale } = router
            if (!routerLocale || !locale || routerLocale === locale) return
            router.push(
                {
                    pathname,
                    query,
                },
                asPath,
                { locale }
            )
        },
        [router]
    )

    // At the beginning of page load, update locale to <Select>
    // It also handles <Select> update on locale switch
    useEffect(() => {
        if (!router.isReady) return
        const routerLocale = router.locale
        if (routerLocale && routerLocale !== _locale) {
            _setLocale(routerLocale)
        }
    }, [router, _locale])

    return (
        <NativeSelect
            className={`mr-2 ${className}`}
            data={languageNames}
            value={CurrentLanguage[_locale]}
            aria-label="Language selection"
            onChange={(x) => {
                const localeName = x.target.value
                const localeIndex = languageNames.indexOf(localeName)
                if (localeIndex == -1) return
                updateLocale(languageKeys[localeIndex])
            }}
        />
    )
}

export default LanguageSelection
