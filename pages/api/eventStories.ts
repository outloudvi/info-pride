import type { NextApiRequest, NextApiResponse } from 'next'

import pickFirstOrOne from '#utils/pickFirstOrOne'
import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'
import { DEFAULT_LANGUAGE } from '#utils/constants'
import eventStoriesData from '#data/videos/eventStories.data'

const eventStories = async (
    req: NextApiRequest,
    res: NextApiResponse<FrontendAPIResponseMapping['eventStories']>
) => {
    const q = req.query
    const id = q.id ? pickFirstOrOne(q.id) : null
    const locale = q.locale ? pickFirstOrOne(q.locale) : DEFAULT_LANGUAGE

    if (id === null) {
        res.status(400).end()
        return
    }

    const ret = eventStoriesData[locale]?.data?.[id]
    if (!ret) {
        res.status(404).end()
        return
    }
    res.status(200).json(ret)
}

export default eventStories

export const config = {
    api: {
        externalResolver: true,
    },
}
