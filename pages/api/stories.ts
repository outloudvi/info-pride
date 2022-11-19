import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import pickFirstOrOne from '#utils/pickFirstOrOne'
import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'
import { DEFAULT_LANGUAGE } from '#utils/constants'
import storiesData from '#data/videos/stories.data'
import type { SeriesName } from '#data/stories'

// ?series=hoshimi&season=1&chapter=1
const eventStories = async (
    req: NextApiRequest,
    res: NextApiResponse<FrontendAPIResponseMapping['stories']>
) => {
    const q = req.query
    const series = q.series
    const season = Number.parseInt(String(q.season) ?? '')
    const chapter = Number.parseInt(String(q.chapter) ?? '')
    const locale = q.locale ? pickFirstOrOne(q.locale) : DEFAULT_LANGUAGE

    if (!series || Number.isNaN(season) || Number.isNaN(chapter)) {
        res.status(400).end()
        return
    }

    const ret =
        storiesData?.[locale]?.data?.[series as SeriesName]?.[season]?.[chapter]
    if (!ret) {
        res.status(404).end()
        return
    }
    res.status(200).json(ret)
}

export default withSentry(eventStories)

export const config = {
    api: {
        externalResolver: true,
    },
}
