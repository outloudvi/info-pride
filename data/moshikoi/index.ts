import type { MoshikoiConfig } from './types'
import stLoveRei from './st-love-23-0514'
import stLoveNagisa from './st-love-23-1114'
import stLoveMei from './st-love-24-0517'
import stLoveYu from './st-love-24-1114'

const STD_KOI = {
    '001': 'Part 1',
    '002': 'Part 2',
    '003': 'Part 3',
    '004': 'Part 4',
    '005': 'Part 5',
    '006': 'Part 6',
    '007': 'Part 7',
    '007-bad': 'Bad End',
    '008-happy': 'Happy End',
    '008-normal': 'Normal End',
} as const

const moshikoiLogics: Partial<Record<string, MoshikoiConfig>> = {
    'st-love-23-0514': {
        parts: STD_KOI,
        gameLogic: stLoveRei,
    },
    'st-love-23-1114': {
        parts: STD_KOI,
        gameLogic: stLoveNagisa,
    },
    'st-love-24-0517': {
        parts: STD_KOI,
        gameLogic: stLoveMei,
    },
    'st-love-24-1114': {
        parts: {
            '001': 'Part 1',
            '002': 'Part 2',
            '003': 'Part 3',
            '004': 'Part 4',
            '005': 'Part 5',
            '006': 'Part 6',
            '007': 'Part 7',
            '008-bad': 'Bad End',
            '008-happy': 'Happy End',
            '008-normal': 'Normal End',
        },
        gameLogic: stLoveYu,
    },
    'st-love-25-0426': {
        parts: {
            '001': '共通1',
            '002': '共通2',
            '003-magical': '魔法少女共通3',
            '003-succubus': 'サキュバス共通3',
            '004-magical-smr': 'すみれ4',
            '004-magical-ngs': '渚4',
            '004-succubus-chs': 'チサ4',
            '004-succubus-rui': 'ルイ4',
            '005-bad-end': 'ハーレムBE',
            '005-happy-end': 'ハーレムHE',
            '005-magical-smr-bad': 'すみれBE',
            '005-magical-smr-good': 'すみれGE',
            '005-magical-ngs-bad': '渚BE',
            '005-magical-ngs-good': '渚GE',
            '005-succubus-chs-bad': 'チサBE',
            '005-succubus-chs-good': 'チサGE',
            '005-succubus-rui-bad': 'ルイBE',
            '005-succubus-rui-good': 'ルイGE',
        },
    },
} as const

export default moshikoiLogics
