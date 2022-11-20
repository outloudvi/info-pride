import cardAliasEn from './en/v-card-alias.json'
import cardAliasZhHans from './zh-Hans/v-card-alias.json'
import skillXEn from './en/b-skillx.json'
import skillXZhHans from './zh-Hans/b-skillx.json'
import skillXSkillsEn from './en/search_skills.json'
import skillXSkillsZhHans from './zh-Hans/search_skills.json'
import skillXPartsEn from './en/b-skillx-parts.json'
import skillXPartsZhHans from './zh-Hans/b-skillx-parts.json'
import vendorEn from './en/vendor.json'
import vendorZhHans from './zh-Hans/vendor.json'
import vChrEn from './en/v-chr.json'
import vChrZhHans from './zh-Hans/v-chr.json'

type ApiL10nDataKeys = 'alias' | 'skillX' | 'skillXParts' | 'vendor' | 'vChr'

const _: Record<ApiL10nDataKeys, Record<string, any>> = {
    alias: {
        en: cardAliasEn,
        'zh-Hans': cardAliasZhHans,
    },
    // SkillX translations are actually Handlebars templates.
    skillX: {
        en: skillXEn,
        'zh-Hans': skillXZhHans,
    },
    vendor: {
        en: vendorEn,
        'zh-Hans': vendorZhHans,
    },
    skillXParts: {
        en: { ...skillXSkillsEn, ...skillXPartsEn },
        'zh-Hans': { ...skillXSkillsZhHans, ...skillXPartsZhHans },
    },
    vChr: {
        en: vChrEn,
        'zh-Hans': vChrZhHans,
    },
}

export default _
