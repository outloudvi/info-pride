import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'
import { Diary } from '#data/wikiModules'
import pickFirstOrOne from '#utils/pickFirstOrOne'
import { getDiaryRangePair } from '#components/api/diary'

const diaries: { [key: string]: string } = {}
Diary.map((x) => {
    diaries[x.date] = x.diary
})
const { last } = getDiaryRangePair()

const diary = async (
    req: NextApiRequest,
    res: NextApiResponse<FrontendAPIResponseMapping['diary']>
) => {
    const q = req.query
    const date = q.date ? pickFirstOrOne(q.date) : last

    if (!diaries[date]) {
        res.status(404).end()
        return
    }

    res.setHeader('Cache-Control', 'max-age=86400')
    res.status(200).json({
        date,
        diary: diaries[date],
    })
}

export default withSentry(diary)

export const config = {
    api: {
        externalResolver: true,
    },
}
