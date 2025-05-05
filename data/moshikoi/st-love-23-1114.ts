import type { GameLogic } from './types'

// https://miro.com/app/board/uXjVNPKbA60=/
// https://t.me/hayasaka_mei/139110
const rules: GameLogic = {
    '001': [[['TRUE'], '002']],
    '002': [
        [['EQU', '[002:44]', 1], null], // that's end #1
        [['TRUE'], '003'],
    ],
    '003': [[['TRUE'], '004']],
    '004': [[['TRUE'], '005']],
    '005': [[['TRUE'], '006']],
    '006': [
        [['EQU', '[006:32]', 1], '007-bad'],
        [['TRUE'], '007'],
    ],
    '007-bad': [[['TRUE'], null]], // that's end #7 & #8
    // 007-bad is the same as 008-bad, so no pointers to 008-bad
    '007': [
        [
            [
                'OR',
                [
                    'OR',
                    [
                        'OR',
                        ['EQU', '[001:44]', 1], // 分からないと言う
                        ['EQU', '[002:10]', 1], // 遠慮する
                    ],
                    [
                        'OR',
                        [
                            'OR',
                            ['EQU', '[002:44]', 1], // 断る
                            ['EQU', '[003:8]', 0], // ためらう
                        ],
                        [
                            'OR',
                            ['EQU', '[003:24]', 1], // バトル系
                            ['EQU', '[004:16]', 1], // 渚の手を握らない
                        ],
                    ],
                ],
                [
                    'OR',
                    [
                        'OR',
                        [
                            'OR',
                            ['EQU', '[004:31]', 0], // 言い淀む
                            ['EQU', '[005:9]', 0], // たしなめる
                        ],
                        [
                            'OR',
                            ['EQU', '[005:33]', 1], // 諦める
                            ['EQU', '[005:50]', 0], // 続きが読みたいと伝える
                        ],
                    ],
                    [
                        'OR',
                        ['EQU', '[006:32]', 1], // 勉強を促す（学习结局
                        [
                            'OR',
                            ['EQU', '[007:13]', 0], // 将来への不安を訴える
                            ['EQU', '[007:44]', 1], // 帰宅を促す
                        ],
                    ],
                ],
            ],
            '008-normal',
        ], // that's end #5 & #6
        [['TRUE'], '008-happy'], // that's end #2, #3 & #4
    ],
    '008-normal': [[['TRUE'], null]],
    '008-happy': [[['TRUE'], null]],
}
export default rules
