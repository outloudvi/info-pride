import base58 from 'base58'

import { CharacterId, CharacterIds } from '../../data/vendor/characterId'
import CardIdData from '../../data/ccid.data'

import UnitCodeInterface, { PartialCard } from './interface'

function encodeCard(card: PartialCard): string {
  const cardIdInfo = CardIdData[card.characterId as CharacterId].find(
    (r) => r.cardId === card.id
  )
  if (!cardIdInfo) return '!!'
  const charId = CharacterIds.findIndex((c) => c === card.characterId)
  if (charId === -1) return '!!'
  const finalNum =
    charId * 64 + // First 6 bits
    cardIdInfo.ccid + // Last 7 bits
    58 // Pad its length to 2
  // assert: finalNum < 3364 = 58^2
  return base58.encode(finalNum)
}

function decodeCard(id: string): string | null {
  const num = base58.decode(id)
  const charId = Math.floor((num - 58) / 64)
  const ccid = (num - 58) % 64
  return (
    CardIdData[CharacterIds[charId]].find((x) => x.ccid === ccid)?.cardId ??
    null
  )
}

/**
 * Base 58, 2 chars for every position
 * So we have 13 bits for each card
 * First 6 bits: Character ID
 * Last 7 bits: Character-Card ID (CCID)
 * Position orders from 4-2-1-3-5 (as per the display order)
 */
const UnitCodeV1: UnitCodeInterface = {
  encode(cards): string {
    return (
      '1P-' +
      [cards[3], cards[1], cards[0], cards[2], cards[4]]
        .map((x) => encodeCard(x))
        .join('')
    )
  },
  decode(id): string[] | null {
    if (id.length !== 13) return null
    if (!id.startsWith('1P-')) return null
    const ret: string[] = []
    for (const i of [3, 5, 7, 9, 11]) {
      const cardStd = id.slice(i, i + 2)
      const cardId = decodeCard(cardStd)
      if (cardId === null) return null
      ret.push(cardId)
    }
    return [ret[2], ret[1], ret[3], ret[0], ret[4]]
  },
}

// TODO: Unit tests

export default UnitCodeV1
