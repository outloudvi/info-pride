import cardAliasEn from './en/v-card-alias.json'
import cardAliasZhHans from './zh-Hans/v-card-alias.json'
import vendorEn from './en/vendor.json'
import vendorZhHans from './zh-Hans/vendor.json'
import vChrEn from './en/v-chr.json'
import vChrZhHans from './zh-Hans/v-chr.json'

type ApiL10nDataKeys = 'alias' | 'vendor' | 'vChr'

const _: Record<ApiL10nDataKeys, Record<string, Record<string, string>>> = {
    alias: {
        en: cardAliasEn,
        'zh-Hans': cardAliasZhHans,
    },
    vendor: {
        en: vendorEn,
        'zh-Hans': vendorZhHans,
    },
    vChr: {
        en: vChrEn,
        'zh-Hans': vChrZhHans,
    },
}

export default _
