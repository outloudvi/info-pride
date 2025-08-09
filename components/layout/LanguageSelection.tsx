'use client'

import { NativeSelect } from '@mantine/core'
import { Suspense } from 'react'
import { useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import { usePathname, useRouter } from '#utils/navigation'
import type { ValidLocale } from '#locales/types'

const CurrentLanguage: Record<ValidLocale, string> = {
    'zh-Hans': '中文（简体）',
    'zh-Hant': '中文（繁體）',
    en: 'English',
    ko: '한국어',
}
const _CurrentLanguage = CurrentLanguage as Record<string, string>

const LanguageKeys = Object.keys(_CurrentLanguage)
const LanguageNames = LanguageKeys.map((x) => _CurrentLanguage[x])

const LanguageSelection = ({ className }: { className?: string }) => {
    const pathname = usePathname()
    const router = useRouter()
    const locale = useLocale()
    const searchParams = useSearchParams()

    const updateLocale = (targetLocale: string) => {
        router.replace(pathname + '?' + searchParams, { locale: targetLocale })
    }

    return (
        <NativeSelect
            className={`mr-2 ${className}`}
            data={LanguageNames}
            value={_CurrentLanguage[locale]}
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
