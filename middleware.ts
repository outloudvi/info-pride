import createMiddleware from 'next-intl/middleware'

import locales from './locales/locales.json'

import { DEFAULT_LANGUAGE, NEXT_INTL_LOCALE_PREFIX } from '#utils/constants'

export default createMiddleware({
    locales,
    defaultLocale: DEFAULT_LANGUAGE,
    localePrefix: NEXT_INTL_LOCALE_PREFIX,
})

export const config = {
    // Match only internationalized pathnames
    matcher: [
        '/',
        '/(en|zh-Hans|zh-Hant|ko)/:path*',

        // old paths that may have non-i18n-prefixed references
        '/about/:path*',
        '/card/:path*',
        '/cards/:path*',
        '/characters/:path*',
        '/colors/:path*',
        '/diary/:path*',
        '/emblems/:path*',
        '/eventstories/:path*',
        '/messages/:path*',
        '/moshikoi/:path*',
        '/mtalk/:path*',
        '/notemap/:path*',
        '/page/:path*.tsx',
        '/search/:path*',
        '/settings/:path*',
        '/spine/:path*',
        '/stories/:path*',
        '/story/:path*',
        '/units/:path*',
    ],
}
