import type { Logic } from '#components/storyreplay/logicParser'

// https://twitter.com/Alterna_Endo/status/1792827325870129657
const rules: Record<string, [Logic, string | null][]> = {
    '001': [[['TRUE'], '002']],
    '002': [[['TRUE'], '003']],
    '003': [
        [
            ['EQU', '[003:58]', 1], // 恋を教えない
            null,
        ], // that's end #1 (ブワッブワッエンド)
        [['TRUE'], '004'],
    ],
    '004': [[['TRUE'], '005']],
    '005': [[['TRUE'], '006']],
    '006': [
        [
            ['EQU', '[006:40]', 0], // 告白しない
            '007-bad',
        ],
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
                        [
                            'OR',
                            ['EQU', '[001:17]', 1], // 誤魔化す
                            ['EQU', '[001:36]', 1], // 断る
                        ],
                        [
                            'OR',
                            ['EQU', '[002:12]', 0], // 楽しくなかったと答える
                            ['EQU', '[002:35]', 1], // 断る
                        ],
                    ],
                    [
                        'OR',
                        [
                            'OR',
                            ['EQU', '[003:9]', 1], // そんなことないと言う
                            ['EQU', '[003:43]', 0], // 告白しない
                        ],
                        [
                            'OR',
                            ['EQU', '[004:72]', 0], // 歩いて登る
                            ['EQU', '[005:4]', 1], // 芽衣を迎えに行かない
                        ],
                    ],
                ],
                [
                    'OR',
                    [
                        'OR',
                        ['EQU', '[005:12]', 1], // 奢らない
                        ['EQU', '[005:20]', 0], // はずれを引いた
                    ],
                    [
                        'OR',
                        [
                            'OR',
                            ['EQU', '[006:28]', 1], // 芽衣を見送る
                            ['EQU', '[007:20]', 0], // 勉強に専念すると伝える
                        ],
                        ['EQU', '[007:61]', 1], // 分からないと伝える
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
