import type { Line } from '@hoshimei/adv/types'

import type { MergedLine } from './types'
import mergeBackground from './mergeBackground'
import mergeNarrations from './mergeNarrations'
import mergeMWV from './mergeMWV'

export default function collapseLines(
    lines: Line[],
    title: string
): MergedLine[] {
    // 0. Remove unknown parts
    const base = lines.filter((x) => x._t !== 'Unknown')

    // 1. Merge messages and voices
    const ret = mergeMWV(base, title).sort((a, b) => {
        // @ts-expect-errors forced assertion
        if (a.startTime === undefined || b.startTime === undefined) return 0
        // @ts-expect-errors forced assertion
        return a.startTime - b.startTime
    })

    // 1. Merge backgrounds that only differs in scale/position
    const ret2 = mergeBackground(ret)

    // 2. Merge narrations
    const ret3 = mergeNarrations(ret2)

    return ret3
}
