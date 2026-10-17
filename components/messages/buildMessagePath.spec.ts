import { describe, it } from 'mocha'
import { expect } from 'chai'
import type { MessageDetail } from 'hoshimi-types/ProtoMaster'

import buildMessagePath from './buildMessagePath'

const msg = (
    messageDetailId: string,
    characterId: string,
    nextMessageDetailIds: string[],
    choiceText = '',
): MessageDetail => ({
    messageDetailId,
    characterId,
    text: messageDetailId,
    stampAssetId: '',
    imageAssetId: '',
    telephoneId: '',
    choiceText,
    delayMinutes: 0,
    readMinutes: 0,
    nextMessageDetailIds,
    reliability: 0,
})

// 1 - 2 - 3-1 - 4
//       \ 3-2 /
const rejoining = [
    msg('1', 'char-a', ['2']),
    msg('2', 'char-a', ['3-1', '3-2']),
    msg('3-1', '', ['4'], 'option 1'),
    msg('3-2', '', ['4'], 'option 2'),
    msg('4', 'char-a', []),
]

// 1 - 2 - 3-1 - 4 - 6 - 7-1
//       \ 3-2 - 5 /   \ 7-2
const diverging = [
    msg('1', 'char-a', ['2']),
    msg('2', 'char-a', ['3-1', '3-2']),
    msg('3-1', '', ['4'], 'a'),
    msg('3-2', '', ['5'], 'b'),
    msg('4', 'char-a', ['6']),
    msg('5', 'char-a', ['6']),
    msg('6', 'char-a', ['7-1', '7-2']),
    msg('7-1', '', [], 'x'),
    msg('7-2', '', [], 'y'),
]

const idsOf = (msgs: MessageDetail[]) => msgs.map((x) => x.messageDetailId)

describe('buildMessagePath', function () {
    it('follows the first option by default', function () {
        const { msgs, branchAfter } = buildMessagePath(rejoining)
        expect(idsOf(msgs)).to.deep.eq(['1', '2', '3-1', '4'])
        expect(branchAfter['3-1'].selected).to.eq(0)
        expect(idsOf(branchAfter['3-1'].options)).to.deep.eq(['3-1', '3-2'])
    })

    it('follows the selected option', function () {
        const { msgs, branchAfter } = buildMessagePath(rejoining, { '2': 1 })
        expect(idsOf(msgs)).to.deep.eq(['1', '2', '3-2', '4'])
        expect(branchAfter['3-2'].nodeId).to.eq('2')
    })

    it('clamps out-of-range selections', function () {
        const { msgs } = buildMessagePath(rejoining, { '2': 99 })
        expect(idsOf(msgs)).to.deep.eq(['1', '2', '3-2', '4'])
    })

    it('only exposes branches reachable on the selected path', function () {
        const { msgs, branchAfter } = buildMessagePath(diverging, { '2': 1 })
        expect(idsOf(msgs)).to.deep.eq(['1', '2', '3-2', '5', '6', '7-1'])
        expect(Object.keys(branchAfter).sort()).to.deep.eq(['3-2', '7-1'])
    })

    it('returns an empty path for empty details', function () {
        expect(idsOf(buildMessagePath([]).msgs)).to.deep.eq([])
    })
})
