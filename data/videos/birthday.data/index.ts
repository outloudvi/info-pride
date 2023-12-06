import en from './en'
import zhHans from './zh-Hans'
import ko from './ko'
import type { BirthdayCommu } from './types'

const _: Record<string, BirthdayCommu> = {
    en: en,
    'zh-Hans': zhHans,
    ko: ko,
}

export default _
