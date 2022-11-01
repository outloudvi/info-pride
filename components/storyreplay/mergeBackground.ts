import type { BackgroundSetting, Line } from '@hoshimei/adv/types'

export default function mergeBackground(lines: Line[]): Line[] {
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
