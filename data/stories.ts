export const Series = [
    'Hoshimi',
    'Tokyo',
    'Big4',
    'TRINITYAiLE',
    'LizNoir',
    'Mana',
    'ThreeX',
    'Tsuki',
    'Sunny',
] as const

export type SeriesName = (typeof Series)[number]

export const Episodes: Record<SeriesName, number[]> = {
    // adv_main_01_
    Hoshimi: [28, 45, 25, 24],
    // adv_main_02_
    Tokyo: [25, 44],
    // adv_main_03_
    Big4: [20],
    // adv_group_tri_
    TRINITYAiLE: [30],
    // adv_group_liz_
    LizNoir: [30],
    // adv_group_mna_
    Mana: [15],
    // adv_group_thrx_
    ThreeX: [20],
    // adv_group_moon_
    Tsuki: [5, 5],
    // adv_group_sun
    Sunny: [5],
}
