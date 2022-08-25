import { CharacterId } from '../vendor/characterId'

import _ccid from './ccid.json'

/**
 * This is the CCID table for all cards. It is generated with by /api/Card/Id,
 * but please use the ID given by bwiki if there is any conflict.
 */
export const CCIDTableWithName: Record<
    CharacterId,
    { ccid: number; cardId: string; nameJa: string }[]
> = _ccid

type CCIDTableType = Record<CharacterId, { ccid: number; cardId: string }[]>

const CCIDTable = Object.entries(CCIDTableWithName)
    .map(([key, value]) => ({
        key,
        value: value.map(({ ccid, cardId }) => ({ ccid, cardId })),
    }))
    .reduce(
        (prev, { key, value }) => ({ ...prev, [key]: value }),
        {}
    ) as CCIDTableType

export default CCIDTable
