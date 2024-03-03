import type { CharacterId } from '../../vendor/characterId'

import type { ExternalVideo } from '#components/ExternalVideo'

type BirthdayStoryData = {
    opening?: ExternalVideo
    phone?: ExternalVideo
    others?: ExternalVideo
}

type BirthdayCommuList = Record<string, BirthdayStoryData>

export type BirthdayCommu = Partial<Record<CharacterId, BirthdayCommuList>>
