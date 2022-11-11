import type { CharacterId } from './vendor/characterId'

import type { ExternalVideo } from '#components/ExternalVideo'

export type BirthdayStoryData = {
    opening?: ExternalVideo
    phone?: ExternalVideo
    others?: ExternalVideo
}

export type BirthdayCommuList = Record<string, BirthdayStoryData>

const BirthdayCommu: Partial<Record<CharacterId, BirthdayCommuList>> = {
    // Tsuki
    'char-ktn': {
        2020: {
            opening: { type: 'bilibili', vid: 'av380045121' },
        },
        2021: {
            phone: { type: 'bilibili', vid: 'av722685777' },
            others: { type: 'bilibili', vid: 'av252622748' },
        },
    },
    'char-ngs': {
        2021: {
            opening: { type: 'bilibili', vid: 'av547024633', pid: 1 },
            others: { type: 'bilibili', vid: 'av547024633', pid: 3 },
        },
        2022: {
            opening: { type: 'bilibili', vid: 'av771604856' },
            others: { type: 'bilibili', vid: 'av556730284' },
            phone: { type: 'bilibili', vid: 'av599060195' },
        },
    },
    'char-ski': {
        2021: {
            opening: { type: 'bilibili', vid: 'av975652715' },
        },
    },
    'char-suz': {
        2021: {
            opening: { type: 'bilibili', vid: 'av762949020' },
        },
        2022: {
            opening: { type: 'bilibili', vid: 'av687906936' },
            phone: { type: 'bilibili', vid: 'av900390056' },
            others: { type: 'bilibili', vid: 'av985516684' },
        },
    },
    'char-mei': {
        2021: {
            opening: { type: 'bilibili', vid: 'av674100211' },
            others: { type: 'bilibili', vid: 'av674100211' },
        },
        2022: {
            phone: { type: 'bilibili', vid: 'av385742111' },
        },
    },

    // SunnyP
    'char-skr': {
        2022: {
            opening: { type: 'bilibili', vid: 'av382838262' },
            phone: { type: 'bilibili', vid: 'av552772740' },
            others: { type: 'bilibili', vid: 'av980257748' },
        },
    },
    'char-szk': {
        2021: {
            opening: { type: 'bilibili', vid: 'av933618283' },
        },
        2022: {
            opening: { type: 'bilibili', vid: 'av559105376' },
            phone: { type: 'bilibili', vid: 'av859834644' },
            others: { type: 'bilibili', vid: 'av389772656' },
        },
    },
    'char-chs': {
        2021: {
            opening: { type: 'bilibili', vid: 'av976906130' },
        },
    },
    'char-rei': {
        2021: {
            opening: { type: 'bilibili', vid: 'av809549881', pid: 1 },
            others: { type: 'bilibili', vid: 'av809549881', pid: 2 },
            phone: { type: 'bilibili', vid: 'av809549881', pid: 3 },
        },
    },
    'char-hrk': {
        2022: {
            opening: { type: 'bilibili', vid: 'av635426310' },
            others: { type: 'bilibili', vid: 'av550486162' },
        },
    },

    // TRiLE
    'char-rui': {
        2021: {
            opening: { type: 'bilibili', vid: 'av806658982' },
        },
        2022: {
            opening: { type: 'bilibili', vid: 'av859891940' },
            phone: { type: 'bilibili', vid: 'av647521861' },
            others: { type: 'bilibili', vid: 'av605031900' },
        },
    },
    'char-yu': {
        2022: {
            opening: { type: 'bilibili', vid: 'av296767207' },
        },
    },
    'char-smr': {
        2022: {
            opening: { type: 'bilibili', vid: 'av683824634' },
        },
    },

    // LizNoir
    'char-rio': {
        2021: {
            opening: { type: 'bilibili', vid: 'av207692865' },
        },
        2022: {
            opening: { type: 'bilibili', vid: 'av644903296' },
            phone: { type: 'bilibili', vid: 'av217419535' },
            others: { type: 'bilibili', vid: 'av217503386' },
        },
    },
    'char-aoi': {
        2022: {
            opening: { type: 'bilibili', vid: 'av342529306' },
            phone: { type: 'bilibili', vid: 'av597556213' },
            others: { type: 'bilibili', vid: 'av685239031' },
        },
    },
    'char-ai': {
        2022: {
            opening: { type: 'bilibili', vid: 'av551497092' },
            phone: { type: 'bilibili', vid: 'av851378749', pid: 1 },
            others: { type: 'bilibili', vid: 'av851378749', pid: 2 },
        },
    },
    'char-kkr': {
        2021: {
            opening: { type: 'bilibili', vid: 'av464719603', pid: 1 },
            others: { type: 'bilibili', vid: 'av464719603' },
            phone: { type: 'bilibili', vid: 'av464719603', pid: 2 },
        },
    },

    // ThreeX
    'char-kor': {},
    'char-kan': {},
    'char-mhk': {},
} as const

export default BirthdayCommu
