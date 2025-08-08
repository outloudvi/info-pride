export interface LocaleObject {
    [key: string]: string | LocaleObject
}

import type locales from './locales.json'
type Locales = (typeof locales)[number]

const localeStrings: () => Promise<
    Record<Locales, LocaleObject>
> = async () => ({
    en: await import('./en/0000').then((x) => x.default),
    'zh-Hans': await import('./zh-Hans/0000').then((x) => x.default),
    'zh-Hant': await import('./zh-Hant/0000').then((x) => x.default),
    ko: await import('./ko/0000').then((x) => x.default),
})

export default await localeStrings()
