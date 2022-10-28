import en from './en.json'
import zhHans from './zh-Hans.json'

import { CharacterId } from '#data/vendor/characterId'

const _: Record<string, Record<CharacterId, string>> = {
    en: en,
    'zh-Hans': zhHans,
}

export default _
