/**
 * This should be updated with:
 *
 * * vendor:Character.json
 */

export const CharacterIds = [
  // Tsuki
  'char-ktn',
  'char-ngs',
  'char-ski',
  'char-suz',
  'char-mei',

  // SunnyP
  'char-skr',
  'char-szk',
  'char-chs',
  'char-rei',
  'char-hrk',

  // TRiLE
  'char-rui',
  'char-yu',
  'char-smr',

  // LizNoir
  'char-rio',
  'char-aoi',
  'char-ai',
  'char-kkr',

  // Mana
  'char-mna',
] as const

export type CharacterId = typeof CharacterIds[number]

export const CharacterChineseNameList: Record<CharacterId, string> = {
  'char-ktn': '长濑琴乃',
  'char-ngs': '伊吹渚',
  'char-ski': '白石沙季',
  'char-suz': '成宫铃',
  'char-mei': '早坂芽衣',
  'char-skr': '川咲樱',
  'char-szk': '兵藤雫',
  'char-chs': '白石千纱',
  'char-rei': '一之濑怜',
  'char-hrk': '佐伯遥子',
  'char-rui': '天动瑠依',
  'char-yu': '铃村优',
  'char-smr': '奥山堇',
  'char-rio': '神崎莉央',
  'char-aoi': '井川葵',
  'char-ai': '小美山爱',
  'char-kkr': '赤崎心',
  'char-mna': '长濑麻奈',
}
