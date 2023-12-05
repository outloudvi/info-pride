'use client'

import { NativeSelect } from '@mantine/core'
import {
    useParams,
    usePathname,
    useRouter,
    useSearchParams,
} from 'next/navigation'

const CurrentLanguage: Record<string, string> = {
    'zh-Hans': '中文（简体）',
    en: 'English',
    ko: '한국어',
}

const LanguageKeys = Object.keys(CurrentLanguage)
const LanguageNames = LanguageKeys.map((x) => CurrentLanguage[x])

const LanguageSelection = ({ className }: { className?: string }) => {
    const router = useRouter()
    const pathname = usePathname()
    const params = useParams()
    const searchParams = useSearchParams()

    const _locale = String(params.locale)

    const updateLocale = (targetLocale: string) => {
        const basePath = pathname.replace(new RegExp(`^/${_locale}`), '')
        const searchParamsStr = searchParams.toString()
        router.replace(
            `/${targetLocale}/${basePath}${
                searchParamsStr === '' ? '' : `?${searchParamsStr}`
            }`,
        )
    }

    return (
        <NativeSelect
            className={`mr-2 ${className}`}
            data={LanguageNames}
            value={CurrentLanguage[_locale]}
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

export default LanguageSelection
