import type { Line } from '@hoshimei/adv/types'

import type { MergedLine } from './types'
import mergeBackground from './mergeBackground'
import mergeNarrations from './mergeNarrations'
import mergeMWV from './mergeMWV'
import mergeChoices from './mergeChoices'

export default function collapseLines(
    lines: Line[],
    title: string
): MergedLine[] {
    // 1. Merge choices and branches
    const ret = mergeChoices(lines)
    console.log('r1', ret)

    // 2. Merge messages and voices
    const ret2 = mergeMWV(ret, title).sort((a, b) => {
        // @ts-expect-errors forced assertion
        if (a.startTime === undefined || b.startTime === undefined) return 0
        // @ts-expect-errors forced assertion
        return a.startTime - b.startTime
    })
    // console.log('r2', ret2)

    // 3. Merge backgrounds that only differs in scale/position
    const ret3 = mergeBackground(ret2)

    // 4. Merge narrations
    const ret4 = mergeNarrations(ret3)

    return ret4
}
