import type { BackgroundSetting, Line } from '@hoshimei/adv/types'

function mergeBackground(lines: Line[]): Line[] {
    const ret = []
    let lastBg = ''
    for (const i of lines) {
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

export default function collapseLines(lines: Line[]): Line[] {
    // 1. Merge backgrounds that only differs in scale/position
    const ret = mergeBackground(lines)

    return ret
}
