import type {
    EffectChart,
    EffectCharacterWithLength,
    EffectCharacterWithoutLength,
    TargetChart,
    TargetCharacterWithCount,
} from 'hoshimi-types/Skillx'

export type EffectItem =
    | EffectChart
    | EffectCharacterWithLength
    | EffectCharacterWithoutLength

export type EffectTypeName = EffectItem['typ']

export type TargetItem = TargetChart | TargetCharacterWithCount

export type TargetTypeName = TargetItem['typ']
