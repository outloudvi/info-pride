import type * as Handlebars from 'handlebars'
import { CardType } from 'hoshimi-types/ProtoEnum'
import handlebars from 'handlebars'
import type { TriggerCond } from 'hoshimi-types/Skillx'

import apiData from 'locales/apiData'

const apiDataSkillx = apiData.skillXParts
const apiDataVendor = apiData.vendor
const apiDataVChr = apiData.vChr

export default function setupHbs(h: typeof Handlebars) {
    h.registerHelper('div10', function (a) {
        return a / 10
    })
    h.registerHelper('chr', function (this: { locale: string }, typ2: number) {
        return apiDataVendor?.[this.locale]?.[CardType[typ2]]
    })
    h.registerHelper(
        'cond',
        function (this: { locale: string }, cond: TriggerCond | string) {
            if (typeof cond === 'string') {
                return handlebars.compile(
                    apiDataSkillx?.[this.locale]?.[cond] ?? `TC-${cond}`
                )({ locale: this.locale })
            } else {
                return handlebars.compile(
                    apiDataSkillx?.[this.locale]?.[cond.typ] ?? `TC-${cond.typ}`
                )({
                    ...cond,
                    locale: this.locale,
                })
            }
        }
    )
    h.registerHelper('char', function (this: { locale: string }, char: string) {
        return apiDataVChr?.[this.locale]?.[`char-${char}`] ?? char
    })
}
