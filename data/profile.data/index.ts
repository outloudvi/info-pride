import en from './en.json'
import zhHans from './zh-Hans.json'
import ko from './ko.json'

import type { CharacterId } from '#data/vendor/characterId'

const _: Record<string, Partial<Record<CharacterId, string>>> = {
    en: en,
    'zh-Hans': zhHans,
    ko: ko,
}

export default _
