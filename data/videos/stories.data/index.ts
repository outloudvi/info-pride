import en from './en'
import zhHans from './zh-Hans'
import zhHant from './zh-Hant'
import ko from './ko'
import type { StoriesData } from './types'

const _: Record<string, StoriesData> = {
    en: en,
    'zh-Hans': zhHans,
    'zh-Hant': zhHant,
    ko: ko,
}

export default _
