import { AttributeType, CardType } from 'hoshimi-types/ProtoEnum'

import {
    ValidOrders,
    type SearchOptions,
    type SearchParams,
    ITEMS_SPLIT,
    PAGINATION_DEFAULT,
} from './sp'

import type { CharacterId } from '#data/vendor/characterId'
import type { UnsafeSearchParams } from '#utils/typeutils'

function numberOr(s: string | string[] | undefined, n: number): number {
    if (s === '' || s === undefined) return n
    return Number.isNaN(s) ? n : Number(s)
}

function arrayOr(s: string | string[] | undefined): string[] {
    if (!s) return []
    if (Array.isArray(s)) return s
    if (s.split(ITEMS_SPLIT).filter((x) => x !== '').length > 1)
        return s.split(ITEMS_SPLIT).filter((x) => x !== '') // SearchParams can go multiple, but that's hard to use
    return [s]
}

function boolOr(s: string | string[] | undefined, d = false): boolean {
    if (!s) return d
    return ['true', '1'].includes(String(s).toLowerCase())
}

export default function spToSo(
    sp: UnsafeSearchParams<SearchParams>,
): SearchOptions {
    const { c, type, prop, theme, order, reverse, limit, skip } = sp
    return {
        c: arrayOr(c) as CharacterId[],
        type: arrayOr(type).map(
            (x) => CardType[x as unknown as number],
        ) as unknown as CardType[],
        prop: arrayOr(prop).map(
            (x) => AttributeType[x as unknown as number],
        ) as unknown as AttributeType[],
        theme: arrayOr(theme),
        order: ValidOrders.includes(order as (typeof ValidOrders)[number])
            ? (order as (typeof ValidOrders)[number])
            : 'releaseDate',
        reverse: boolOr(reverse, true),
        limit: numberOr(limit, PAGINATION_DEFAULT),
        skip: numberOr(skip, 0),
    }
}
