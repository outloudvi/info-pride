'use server'

import type { SearchOptions } from './sp'

import { MAX_LEVEL, MAX_RARITY } from '#utils/constants'
import { fetchApi } from '#utils/fetchApi'
import getCardColor from '#utils/getCardColor'

export default async function fetchCards(so: SearchOptions) {
    let cards = await fetchApi('Card/List', {
        level: String(MAX_LEVEL),
        rarity: String(MAX_RARITY),
    })

    const { c, type, prop, theme, order, reverse, limit, skip } = so
    if (c.length > 0) {
        cards = cards.filter((x) => (c as string[]).includes(x.characterId))
    }
    if (type.length > 0) {
        cards = cards.filter((x) => type.includes(x.type))
    }
    if (prop.length > 0) {
        cards = cards.filter(({ vocalPt, dancePt, visualPt }) =>
            prop.includes(
                getCardColor({
                    // shall be safe since large RatioPermil gives larger Pt
                    vocalRatioPermil: vocalPt,
                    danceRatioPermil: dancePt,
                    visualRatioPermil: visualPt,
                }),
            ),
        )
    }

    if (theme.length > 0) {
        cards = cards.filter((x) => theme.includes(x.id.split('-')?.[3]))
    }
    cards.sort((a, b) => (a[order] > b[order] ? -1 : 1) * (reverse ? 1 : -1))

    return cards.slice(skip, skip + limit)
}
