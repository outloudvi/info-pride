import createMiddleware from 'next-intl/middleware'

import locales from './locales/locales.json'

import { DEFAULT_LANGUAGE } from '#utils/constants'

export default createMiddleware({
    locales,
    defaultLocale: DEFAULT_LANGUAGE,
    localePrefix: 'always',
})

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
