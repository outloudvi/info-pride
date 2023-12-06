import en from './en'
import zhHans from './zh-Hans'
import ko from './ko'
import type { StoriesData } from './types'

const _: Record<string, StoriesData> = {
    en: en,
    'zh-Hans': zhHans,
    ko: ko,
}

export default _
