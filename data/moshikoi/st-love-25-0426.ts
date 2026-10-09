// https://idolyp.cloudfree.jp/※ネタバレ注意※【アイプライベント攻略】サキ/
// *This file is AI generated*

import type { Logic } from '#components/storyreplay/logicParser'

import type { GameLogic } from './types'

function eq(key: string, value: number): Logic {
    return ['EQU', `[${key}]`, value]
}

function allEq(pairs: readonly (readonly [string, number])[]): Logic {
    return pairs
        .map(([key, value]) => eq(key, value))
        .reduce((left, right) => ['AND', left, right])
}

const ruiClusterA = [
    ['001:63', 0], // ルイ
    ['002:61', 0], // 怖い
    ['003-succubus:13', 1], // 様子を見る
    ['003-succubus:27', 1], // ルイが隣で寝てた
    ['003-succubus:39', 0], // ルイが魅力的だから
    ['003-succubus:108', 0], // 綺麗だと思って
    ['004-succubus-rui:47', 0], // 分かった
    ['004-succubus-rui:84', 0], // ルイが好きだから
] as const

const ruiClusterB = [
    ['001:63', 2], // どちらも選べない
    ['002:61', 1], // すみれが心配
    ['003-succubus:13', 0], // ルイを起こす
    ['003-succubus:27', 0], // おかげさまで
    ['003-succubus:39', 2], // 二人のことが知りたいから
    ['003-succubus:108', 2], // すみれのことが気になって
    ['004-succubus-rui:47', 2], // 考えさせて
    ['004-succubus-rui:84', 1], // 争いを止めたいから
] as const

const rules: GameLogic = {
    '001': [[['TRUE'], '002']],

    '002': [
        [['EQU', '[002:89]', 1], '003-succubus'], // ルイ達のことが知りたい
        [['TRUE'], '003-magical'], // すみれ達と帰る
    ],

    '003-magical': [
        [['EQU', '[003-magical:48]', 1], '004-magical-smr'],
        [['TRUE'], '004-magical-ngs'],
    ],

    '003-succubus': [
        [['EQU', '[003-succubus:116]', 1], '004-succubus-chs'],
        [['TRUE'], '004-succubus-rui'],
    ],

    '004-magical-smr': [
        [
            [
                'AND',
                ['EQU', '[004-magical-smr:117]', 0],
                ['EQU', '[003-magical:42]', 1],
            ],
            '005-magical-smr-good',
        ],
        [['TRUE'], '005-magical-smr-bad'],
    ],

    '004-magical-ngs': [
        [['EQU', '[004-magical-ngs:126]', 1], '005-magical-ngs-good'],
        [['TRUE'], '005-magical-ngs-bad'],
    ],

    '004-succubus-chs': [
        [
            [
                'AND',
                ['EQU', '[004-succubus-chs:71]', 1],
                ['EQU', '[001:63]', 1],
            ],
            '005-succubus-chs-good',
        ],
        [['TRUE'], '005-succubus-chs-bad'],
    ],

    '004-succubus-rui': [
        [
            allEq([['004-succubus-rui:86', 0], ...ruiClusterA]),
            '005-succubus-rui-good',
        ],
        [
            allEq([['004-succubus-rui:86', 1], ...ruiClusterA]),
            '005-bad-end',
        ],
        [
            allEq([['004-succubus-rui:86', 1], ...ruiClusterB]),
            '005-happy-end',
        ],
        [
            allEq([['004-succubus-rui:86', 0], ...ruiClusterB]),
            '005-succubus-rui-bad',
        ],
        [['TRUE'], null],
    ],

    '005-bad-end': [[['TRUE'], null]],
    '005-happy-end': [[['TRUE'], null]],
    '005-magical-smr-bad': [[['TRUE'], null]],
    '005-magical-smr-good': [[['TRUE'], null]],
    '005-magical-ngs-bad': [[['TRUE'], null]],
    '005-magical-ngs-good': [[['TRUE'], null]],
    '005-succubus-chs-bad': [[['TRUE'], null]],
    '005-succubus-chs-good': [[['TRUE'], null]],
    '005-succubus-rui-bad': [[['TRUE'], null]],
    '005-succubus-rui-good': [[['TRUE'], null]],
}

export default rules
