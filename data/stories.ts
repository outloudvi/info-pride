export const Series = [
  'Hoshimi',
  'Tokyo',
  'Big4',
  'TRINITYAiLE',
  'LizNoir',
  'Mana',
  'ThreeX',
  'Tsuki',
  'Special',
] as const

export type SeriesName = typeof Series[number]

export const Episodes: Record<SeriesName, [string, number[]]> = {
  Hoshimi: ['星见编', [28, 45, 25, 24]],
  Tokyo: ['东京编', [25, 44]],
  Big4: ['BIG4编', [5]],
  TRINITYAiLE: ['TRINITYAiLE', [30]],
  LizNoir: ['LizNoir', [30]],
  Mana: ['长濑麻奈', [15]],
  ThreeX: ['ⅢⅩ', [20]],
  Tsuki: ['月光风暴', [5]],
  Special: ['其它', [3]],
}
