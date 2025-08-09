import en from './en'
import zhHans from './zh-Hans'
import zhHant from './zh-Hant'
import ko from './ko'
import type { StoriesData } from './types'
import type { ValidLocale } from '#locales/types'

const _: Record<ValidLocale, StoriesData> = {
    en: en,
    'zh-Hans': zhHans,
    'zh-Hant': zhHant,
    ko: ko,
}

// Let's not complicate things as `getLocale()` from `next-intl` is not such typed
export default _ as Record<string, StoriesData>
