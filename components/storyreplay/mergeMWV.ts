import * as Sentry from '@sentry/browser'
import type { Message } from '@hoshimei/adv/types'

import type { MergedLine } from './types'

// Assumption: a voice is linked to all messages before it after the last voice
export default function mergeMWV(
    lines: MergedLine[],
    title: string
): MergedLine[] {
    let stashedMessages: Message[] = []
    const ret: MergedLine[] = []
    for (let i = 0; i < lines.length; i++) {
        const item = lines[i]
        switch (item._t) {
            case 'XBranch': {
                item.branches.forEach((y) => {
                    y.lines = mergeMWV(y.lines, title)
                })
                break
            }
            case 'Message': {
                stashedMessages.push(item)
                break
            }
            case 'Voice': {
                const speakers = [
                    ...new Set(stashedMessages.map((x) => x.name)),
                ]
                if (speakers.length > 1) {
                    Sentry.captureMessage(
                        `MWV Anomaly: [${title}] Voice ownership of ${item.voice}`
                    )
                }
                ret.push({
                    ...item,
                    _t: 'MWV',
                    name:
                        speakers.length === 1
                            ? speakers[0]
                            : speakers.join('/'),
                    text: stashedMessages.map((x) => x.text).join('\n'),
                    thumbnail: stashedMessages.find((x) => x.thumbnail)
                        ?.thumbnail,
                })
                stashedMessages = []
                break
            }
            default: {
                ret.push(item)
            }
        }
    }
    if (stashedMessages.length > 0) {
        ret.push(...stashedMessages)
    }
    return ret
}
