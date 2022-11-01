import type { Line } from '@hoshimei/adv/types'

import type { MergedLine } from './types'
import mergeBackground from './mergeBackground'
import mergeMWV from './mergeMWV'

export default function collapseLines(
    lines: Line[],
    title: string
): MergedLine[] {
    // 1. Merge backgrounds that only differs in scale/position
    const ret = mergeBackground(lines)

    // 2. Merge messages and voices
    const ret2 = mergeMWV(ret, title)

    // 3. Reorder the timeline
    return ret2.sort((a, b) => {
        // @ts-expect-errors forced assertion
        if (a.startTime === undefined || b.startTime === undefined) return 0
        // @ts-expect-errors forced assertion
        return a.startTime - b.startTime
    })
}
