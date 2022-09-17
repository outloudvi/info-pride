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

export const Episodes: Record<SeriesName, number[]> = {
    Hoshimi: [28, 45, 25, 24],
    Tokyo: [25, 44],
    Big4: [5],
    TRINITYAiLE: [30],
    LizNoir: [30],
    Mana: [15],
    ThreeX: [20],
    Tsuki: [5],
    Special: [3],
}
