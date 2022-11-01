import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { Cards } from '#data/wikiPages'
import type { Card as WikiCard } from '#data/wikiPages/cards'
import pickFirstOrOne from '#utils/pickFirstOrOne'
import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'

const CardsArray: WikiCard[] = Object.values(Cards)
    .map(Object.values)
    .reduce((a, b) => [...a, ...b])

const wikiCard = async (
    req: NextApiRequest,
    res: NextApiResponse<FrontendAPIResponseMapping['wikiCard']>
) => {
    const q = req.query
    const nameJa = q.nameJa ? pickFirstOrOne(q.nameJa) : null
    if (nameJa === null) {
        res.status(200).json(CardsArray)
        return
    }

    const card = CardsArray.filter((r) => r.nameJa === nameJa)
    if (card.length === 0) {
        res.status(404).end()
        return
    }

    res.status(200).json(card)
}

export default withSentry(wikiCard)

export const config = {
    api: {
        externalResolver: true,
    },
}
