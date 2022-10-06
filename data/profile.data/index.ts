import en from './en.json'
import zhHans from './zh-hans.json'

import { CharacterId } from '#data/vendor/characterId'

const _: Record<string, Record<CharacterId, string>> = {
    en: en,
    'zh-hans': zhHans,
}

export default _
