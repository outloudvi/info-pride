/**
 * This should be updated with:
 *
 * * vendor:Character.json
 */

export const PrimaryCharacterIds = [
    // Tsuki
    'char-ktn',
    'char-ngs',
    'char-ski',
    'char-suz',
    'char-mei',

    // SunnyP
    'char-skr',
    'char-szk',
    'char-chs',
    'char-rei',
    'char-hrk',

    // TRiLE
    'char-rui',
    'char-yu',
    'char-smr',

    // LizNoir
    'char-rio',
    'char-aoi',
    'char-ai',
    'char-kkr',

    // Mana
    'char-mna',

    // ThreeX
    'char-kor',
    'char-kan',
    'char-mhk',
] as const

// Characters with at least one card.
// Note that the order of existing items MUST NOT change, or old unitCodes will be broken!
export const CharacterIds = [
    ...PrimaryCharacterIds,

    // Collab: Hatsune Miku
    'char-mku',
] as const

// Characters listed by Character.json (non-inclusive)
export const DataCharacterIds = [
    ...CharacterIds,

    // Staffs
    'char-stm', // 橋本さとみ
    'char-koh', // 牧野航平

    // Collab: K-ON!
    'char-konazusa',
    'char-konmio',
    'char-konmugi',
    'char-konritsu',
    'char-konyui',
] as const

export type CharacterId = (typeof CharacterIds)[number]
export type DataCharacterId = (typeof DataCharacterIds)[number]
