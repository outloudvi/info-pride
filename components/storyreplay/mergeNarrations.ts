import type { Narration } from '@hoshimei/adv/types'

import type { MergedLine } from './types'

export default function mergeNarrations(lines: MergedLine[]): MergedLine[] {
    const ret = []
    let last: Narration | undefined = undefined
    for (const i of lines) {
        if (i._t !== 'Narration') {
            if (last) {
                ret.push(last)
                last = undefined
            }
            ret.push(i)
        } else {
            if (!last) {
                last = i
            } else {
                if (i.startTime === last.startTime) {
                    last.text += '\n' + i.text
                }
            }
        }
    }
    return ret
}
