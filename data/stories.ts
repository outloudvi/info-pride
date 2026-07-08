/**
 * To add a story series, please update:
 *
 * * `Series` below
 * * `Episodes` below
 * * `Prefix` below
 * * Each language under `data/videos/stories.data/`
 */

import {
    EXTRA_SERIES_TAG,
    SPECIAL_SERIES_TAG,
} from '#components/stories/constants'
import storyPrefix from './storyprefix.json'

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

export const SeriesMapping: Record<number, string> = {
    ...Series,
    [EXTRA_SERIES_TAG]: 'extra',
    [SPECIAL_SERIES_TAG]: 'special',
}

export type SeriesName = (typeof Series)[number]

// Update with `updateStoryList.mjs` when needed
export const Episodes: Record<SeriesName, number[]> = {
    Hoshimi: [28, 45, 25, 24], // FIN
    Tokyo: [25, 44], // FIN
    Big4: [66], // FIN
    Stellar: [56],
    TRINITYAiLE: [30],
    LizNoir: [30, 11],
    Mana: [15],
    ThreeX: [20],
    Tsuki: [5, 5, 5, 5, 5],
    Sunny: [5, 5, 5, 5, 5],
}

export const Prefix: Record<SeriesName, string> = storyPrefix
