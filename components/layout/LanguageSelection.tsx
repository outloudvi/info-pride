'use client'

import { NativeSelect } from '@mantine/core'
import { Suspense } from 'react'
import { useLocale } from 'next-intl'

import { usePathname, useRouter } from '#utils/navigation'

const CurrentLanguage: Record<string, string> = {
    'zh-Hans': '中文（简体）',
    en: 'English',
    ko: '한국어',
}

const LanguageKeys = Object.keys(CurrentLanguage)
const LanguageNames = LanguageKeys.map((x) => CurrentLanguage[x])

const LanguageSelection = ({ className }: { className?: string }) => {
    const pathname = usePathname()
    const router = useRouter()
    const locale = useLocale()

    const updateLocale = (targetLocale: string) => {
        router.replace(pathname, { locale: targetLocale })
    }

    return (
        <NativeSelect
            className={`mr-2 ${className}`}
            data={LanguageNames}
            value={CurrentLanguage[locale]}
            aria-label="Language selection"
            onChange={(x) => {
                const localeName = x.target.value
                const localeIndex = LanguageNames.indexOf(localeName)
                if (localeIndex == -1) return
                updateLocale(LanguageKeys[localeIndex])
            }}
        />
    )
}

const LanguageSelectionWrapper = ({ className }: { className?: string }) => (
    <Suspense>
        <LanguageSelection className={className} />
    </Suspense>
)

export default LanguageSelectionWrapper
