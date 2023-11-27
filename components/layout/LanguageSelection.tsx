import { useCallback, useEffect, useState } from 'react'
import { NativeSelect } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'

import { USER_PREF_COOKIE_MAXAGE } from '#utils/constants'

const CurrentLanguage: Record<string, string> = {
    'zh-Hans': '中文（简体）',
    en: 'English',
    ko: '한국어',
}

const LanguageSelection = ({ className }: { className?: string }) => {
    const router = useRouter()

    const [_locale, _setLocale] = useState('')
    const languageKeys = Object.keys(CurrentLanguage)
    const languageNames = languageKeys.map((x) => CurrentLanguage[x])

    const updateLocale = useCallback(
        (locale: string) => {
            // TODO
        },
        [router],
    )

    // At the beginning of page load, update locale to <Select>
    // It also handles <Select> update on locale switch
    useEffect(() => {
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
