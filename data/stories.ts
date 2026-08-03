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
import stories from './stories.json'

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

export const Episodes: Record<SeriesName, string[]> = stories

export const Prefix: Record<SeriesName, string> = storyPrefix

