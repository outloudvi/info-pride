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
] as const

export const MessageCharacterIds = [
    ...PrimaryCharacterIds,

    // ThreeX
    'char-kor',
    'char-kan',
    'char-mhk',
] as const

// Note that the order of existing items MUST NOT change, or old unitCodes will be broken!
export const CharacterIds = [
    ...MessageCharacterIds,

    // Collab
    'char-mku',
] as const

export type CharacterId = typeof CharacterIds[number]
