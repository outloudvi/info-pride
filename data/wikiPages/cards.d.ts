import { CharacterId } from '../vendor/characterId'

/**
 * Card data for wiki.biligame.com/idolypride
 */
export type TheRootSchema = Record<CharacterId, { [k: number]: Card }>

export type Card = {
  ownerSlug: CharacterId
  ownerId: number
  type: '支援' | '辅助' | '得分'
  rarity: number
  prop: '舞蹈' | '歌唱' | '表演'
  ski1Typ: 'SP' | 'A'
  ski2Typ: 'A' | 'P'
  ski3Typ: 'A' | 'P'
  vocTop: number
  danTop: number
  visTop: number
  staTop: number
  nameJa: string
  nameCn: string
  ski1NameJa: string
  ski1DescJa: string
  ski1NameCn: string
  ski1DescCn: string
  ski2NameJa: string
  ski2DescJa: string
  ski2NameCn: string
  ski2DescCn: string
  ski3NameJa: string
  ski3DescJa: string
  ski3NameCn: string
  ski3DescCn: string
  eruNameJa?: string
  eruDescJa?: string
  eruNameCn?: string
  eruDescCn?: string
}
