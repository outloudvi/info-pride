import type { Logic } from '#components/storyreplay/logicParser'

// https://miro.com/app/board/uXjVMJZKz94=/
const rules: Record<string, [Logic, string | null][]> = {
    '001': [
        [['EQU', '[001:63]', 1], null], // 一ノ瀬さんを追いかけない
        [['TRUE'], '002'],
    ],
    '002': [[['TRUE'], '003']],
    '003': [[['TRUE'], '004']],
    '004': [[['TRUE'], '005']],
    '005': [[['TRUE'], '006']],
    '006': [
        [['EQU', '[006:57]', 1], '007-bad'], // 行かない
        [['TRUE'], '007'],
    ],
    '007-bad': [[['TRUE'], null]],
    // 007-bad is the same as 008-bad, so no pointers to 008-bad
    '007': [
        [
            [
                'AND',
                [
                    'AND',
                    ['EQU', '[006:30]', 1], // 一人でテーマパークに行く
                    ['EQU', '[006:57]', 0], // 行く
                ],
                [
                    'AND',
                    ['EQU', '[007:33]', 1], // まだ付き合っていません！
                    ['EQU', '[007:33.14]', 0], // 「好きだ」と伝える
                ],
            ],
            '008-happy',
        ],
        [['TRUE'], '008-normal'],
    ],
    "008-normal": [[["TRUE"], null]],
    "008-happy": [[["TRUE"], null]],
}
export default rules
