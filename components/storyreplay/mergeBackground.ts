import type { BackgroundSetting } from '@hoshimei/adv/types'

import type { MergedLine } from './types'

export default function mergeBackground(lines: MergedLine[]): MergedLine[] {
    const ret = []
    let lastBg = ''
    for (const i of lines) {
        if (i._t === 'XBranch') {
            i.branches.forEach((y) => {
                y.lines = mergeBackground(y.lines)
            })
            ret.push(i)
            continue
        }
        if (i._t !== 'BackgroundSetting') {
            ret.push(i)
            continue
        }
        const currBg = (i as BackgroundSetting).id
        if (currBg !== lastBg) {
            ret.push(i)
            lastBg = currBg
        }
    }
    return ret
}
