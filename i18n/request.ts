import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

import type { LocaleObject } from '#locales/localeData'
import localeData from '#locales/localeData'
import getMessageFallback from '#utils/getMessageFallback'
import locales from '#locales/locales.json'
import { DEFAULT_LANGUAGE } from '#utils/constants'

export default getRequestConfig(async ({ requestLocale }) => {
    // `requestLocale` is the locale of the current request; it is unset only
    // outside the `[locale]` segment, where the default language applies.
    const locale = (await requestLocale) ?? DEFAULT_LANGUAGE
    if (!locales.includes(locale as (typeof locales)[number])) notFound()

    return {
        locale,
        messages: (localeData as Record<string, LocaleObject>)?.[locale] ?? {},
        getMessageFallback: getMessageFallback,
    }
})
