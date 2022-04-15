export type IdolSlug = keyof typeof Idols
export type IdolName = typeof Idols[IdolSlug]

/**
 * This shall also be updated with:
 *
 * * utils/wikiPages/cards.schema.json
 * * utils/wikiPages/idols.schema.json
 */

export const Idols = {
  mana: '长濑麻奈',
  sakura: '川咲樱',
  rei: '一之濑怜',
  haruko: '佐伯遥子',
  chisa: '白石千纱',
  shizuku: '兵藤雫',
  kotono: '长濑琴乃',
  nagisa: '伊吹渚',
  saki: '白石沙季',
  suzu: '成宫铃',
  mei: '早坂芽衣',
  rui: '天动瑠依',
  yu: '铃村优',
  sumire: '奥山堇',
  rio: '神崎莉央',
  aoi: '井川葵',
  ai: '小美山爱',
  kokoro: '赤崎心',
} as const

export const IdolSlugList = Object.keys(Idols) as IdolSlug[]
export const IdolNameList = Object.values(Idols) as IdolName[]

export function idolSlugToName(slug: string): IdolName | null {
  // @ts-expect-error ts-7053
  return Idols[slug] ?? null
}

export function idolNameToSlug(name: string): IdolSlug | null {
  for (const i of Object.keys(Idols)) {
    if (Idols[i as IdolSlug] === name) return i as IdolSlug
  }
  return null
}
