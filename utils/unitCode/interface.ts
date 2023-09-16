/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Card } from 'hoshimi-types/ProtoMaster'

export type PartialCard = Pick<Card, 'id' | 'characterId'>

export default interface UnitCodeInterface {
    encode: (c: PartialCard[], ...args: any[]) => string
    decode: (c: string, ...args: any[]) => string[] | null
}
