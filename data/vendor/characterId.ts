/**
 * This should be updated with:
 *
 * * vendor:Character.json
 */

export const CharacterIds = [
  'char-ai',
  'char-aoi',
  'char-chs',
  'char-hrk',
  'char-kkr',
  'char-ktn',
  'char-mei',
  'char-mna',
  'char-ngs',
  'char-rei',
  'char-rio',
  'char-rui',
  'char-ski',
  'char-skr',
  'char-smr',
  'char-suz',
  'char-szk',
  'char-yu',
] as const

export type CharacterId = typeof CharacterIds[number]

export const CharacterChineseNameList: Record<CharacterId, string> = {
  'char-ai': '小美山爱',
  'char-aoi': '井川葵',
  'char-chs': '白石千纱',
  'char-hrk': '佐伯遥子',
  'char-kkr': '赤崎心',
  'char-ktn': '长濑琴乃',
  'char-mei': '早坂芽衣',
  'char-mna': '长濑麻奈',
  'char-ngs': '伊吹渚',
  'char-rei': '一之濑怜',
  'char-rio': '神崎莉央',
  'char-rui': '天动瑠依',
  'char-ski': '白石沙季',
  'char-skr': '川咲樱',
  'char-smr': '奥山堇',
  'char-suz': '成宫铃',
  'char-szk': '兵藤雫',
  'char-yu': '铃村优',
}
