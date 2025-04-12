/**
 * To add a story series, please update:
 *
 * * `Series` below
 * * `Episodes` below
 * * `Prefix` below
 * * Each language under `data/videos/stories.data/`
 */

export const Series = [
    'Hoshimi',
    'Tokyo',
    'Big4',
    'Stellar',
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
    Hoshimi: [28, 45, 25, 24], // FIN
    // adv_main_02_
    Tokyo: [25, 44], // FIN
    // adv_main_03_
    Big4: [66], // FIN
    // adv_main_04_
    Stellar: [15],
    // adv_group_tri_
    TRINITYAiLE: [30], // FIN
    // adv_group_liz_
    LizNoir: [30], // FIN
    // adv_group_mna_
    Mana: [15], // FIN
    // adv_group_thrx_
    ThreeX: [20],
    // adv_group_moon_
    Tsuki: [5, 5, 5, 5, 5], // FIN
    // adv_group_sun
    Sunny: [5, 5, 5],
}

export const Prefix: Record<SeriesName, string> = {
    Hoshimi: 'st-original-cmn-01',
    Tokyo: 'st-main-cmn-01',
    Big4: 'st-main-cmn-02',
    Stellar: 'st-main-cmn-03',
    TRINITYAiLE: 'st-group-tri-01',
    LizNoir: 'st-group-liz-01',
    Mana: 'st-group-mna-01',
    ThreeX: 'st-group-thrx-01',
    Tsuki: 'st-group-moon-01',
    Sunny: 'st-group-sun-01',
}
