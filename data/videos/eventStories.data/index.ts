import en from './en'
import zhHans from './zh-Hans'
import type { EventStoriesData } from './types'

const _: Record<string, EventStoriesData> = {
    en: en,
    'zh-Hans': zhHans,
}

export default _
