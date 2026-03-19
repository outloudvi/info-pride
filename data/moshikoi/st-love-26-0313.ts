import type { GameLogic } from './types'

export const rioNegativePointNumber = [
    'SUM',
    [
        [['[001:21]', '=', 1], '*', 2],
        [['[002:13]', '=', 1], '*', 1],
        [['[002:20]', '=', 1], '*', 1],
        [['[003:34]', '=', 0], '*', 2],
        [['[003:55]', '=', 0], '*', 1],
        [['[004:30]', '=', 0], '*', 1],
        [['[005:10]', '=', 0], '*', 3],
        [['[006:34]', '=', 1], '*', 1],
        [['[006:50.4]', '=', 0], '*', 1],
        [['[007:17.1]', '=', 1], '*', 2],
        [['[007:54.1]', '=', 1], '*', 3],
    ],
] as const

// https://x.com/chabansy/status/2034422979124457783
const rules: GameLogic = {
    '001': [
        [['EQU', '[001:34]', 1], null],
        [['TRUE'], '002'],
    ],
    '002': [[['TRUE'], '003']],
    '003': [[['TRUE'], '004']],
    '004': [[['TRUE'], '005']],
    '005': [[['TRUE'], '006']],
    '006': [[['TRUE'], '007']],
    '007': [
        [['EVAL', [rioNegativePointNumber, '<', 2]], '008-happy'],
        [['EVAL', [rioNegativePointNumber, '<', 11]], '008-normal'],
        [['TRUE'], '008-bad'],
    ],
    '008-bad': [[['TRUE'], null]],
    '008-normal': [[['TRUE'], null]],
    '008-happy': [[['TRUE'], null]],
}
export default rules
