import cardAliasEn from './en/v-card-alias.json'
import cardAliasZhHans from './zh-Hans/v-card-alias.json'

const _: Record<'alias', Record<string, any>> = {
    alias: {
        en: cardAliasEn,
        'zh-Hans': cardAliasZhHans,
    },
}

export default _
