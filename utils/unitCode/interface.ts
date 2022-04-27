import { Card } from '@outloudvi/hoshimi-types/ProtoMaster'

export type PartialCard = Pick<Card, 'id' | 'characterId'>

export default interface UnitCodeInterface {
  encode: (c: PartialCard[], ...args: any[]) => string
  decode: (c: string, ...args: any[]) => string[] | null
}
