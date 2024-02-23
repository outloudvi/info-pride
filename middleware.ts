import createMiddleware from 'next-intl/middleware'

import locales from './locales/locales.json'

import { DEFAULT_LANGUAGE, NEXT_INTL_LOCALE_PREFIX } from '#utils/constants'

export default createMiddleware({
    locales,
    defaultLocale: DEFAULT_LANGUAGE,
    localePrefix: NEXT_INTL_LOCALE_PREFIX,
})

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
