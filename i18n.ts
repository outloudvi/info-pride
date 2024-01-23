import { getRequestConfig } from 'next-intl/server'

import type { LocaleObject } from '#locales/localeData'
import localeData from '#locales/localeData'
import getMessageFallback from '#utils/getMessageFallback'

export default getRequestConfig(async ({ locale }) => {
    return {
        messages: (localeData as Record<string, LocaleObject>)?.[locale] ?? {},
        getMessageFallback: getMessageFallback,
    }
})
