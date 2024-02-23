import { createSharedPathnamesNavigation } from 'next-intl/navigation'

import locales from '../locales/locales.json'

import { NEXT_INTL_LOCALE_PREFIX } from '#utils/constants'

export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation({
        locales,
        localePrefix: NEXT_INTL_LOCALE_PREFIX,
    })
