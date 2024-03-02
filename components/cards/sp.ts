import type { AttributeType, CardType } from 'hoshimi-types/ProtoEnum'

import type { CharacterId } from '#data/vendor/characterId'
import type { APIResponseOf, UnArray } from '#utils/api'

export type SearchParams = {
    /**
     * Character IDs. Can be multiple.
     */
    c: string[]
    /**
     * Character type (technique/appeal/support)
     */
    type: string[]
    /**
     * Character prop (vocal/dance/visual)
     */
    prop: string[]
    theme: string[]
    /**
     *
     */
    order: string
    reverse: string
    limit: string
    skip: string
}

export const ValidOrders: (keyof UnArray<APIResponseOf<'Card/List'>>)[] = [
    'releaseDate',
    'characterId',
    'vocalPt',
    'dancePt',
    'visualPt',
]

export type SearchOptions = {
    c: CharacterId[]
    type: CardType[]
    prop: AttributeType[]
    theme: string[]
    order: (typeof ValidOrders)[number]
    reverse?: boolean

    // pagination
    limit: number
    skip: number
}

export const ITEMS_SPLIT = ' '
export const PAGINATION_DEFAULT = 20
