import type { CharacterId } from '#data/vendor/characterId'

export type CharacterIdWithManager = CharacterId | ''

export type CommuLine = {
    characterId: CharacterIdWithManager
    text?: string
    stampAssetId?: string
    imageAssetId?: string
}

export type EditorPref = {
    editMode: boolean
    expandMenu: boolean
}
