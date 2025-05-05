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
} as const

export default moshikoiLogics
