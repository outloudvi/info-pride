import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

import type { LocaleObject } from '#locales/localeData'
import localeData from '#locales/localeData'
import getMessageFallback from '#utils/getMessageFallback'
import locales from '#locales/locales.json'

export default getRequestConfig(async ({ locale }) => {
    if (!locales.includes(locale as (typeof locales)[number])) notFound()

    return {
        messages: (localeData as Record<string, LocaleObject>)?.[locale] ?? {},
        getMessageFallback: getMessageFallback,
    }
})
