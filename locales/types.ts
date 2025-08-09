import type locales from './locales.json'

export type ValidLocale = (typeof locales)[number]
