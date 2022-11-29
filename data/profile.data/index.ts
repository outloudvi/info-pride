import en from './en.json'
import zhHans from './zh-Hans.json'

import type { CharacterId } from '#data/vendor/characterId'

const _: Record<string, Partial<Record<CharacterId, string>>> = {
    en: en,
    'zh-Hans': zhHans,
}

export default _
