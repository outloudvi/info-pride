import type { NextApiRequest, NextApiResponse } from 'next'

import CardStories from '#data/videos/cardStories.data'
import pickFirstOrOne from '#utils/pickFirstOrOne'
import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'
import { DEFAULT_LANGUAGE } from '#utils/constants'

const cardStories = async (
    req: NextApiRequest,
    res: NextApiResponse<FrontendAPIResponseMapping['cardStories']>
) => {
    const q = req.query

    const id = q.id ? pickFirstOrOne(q.id) : null
    const locale = q.locale ? pickFirstOrOne(q.locale) : DEFAULT_LANGUAGE

    if (id === null || !locale) {
        res.status(400).end()
        return
    }

    if (CardStories?.[locale]?.[id] === undefined) {
        res.status(404).end()
        return
    }

    res.status(200).json({
        stories: CardStories?.[locale]?.[id],
    })
}

export default cardStories

export const config = {
    api: {
        externalResolver: true,
    },
}
