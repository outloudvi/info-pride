import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import BirthdayCommu from '#data/birthday.data'
import pickFirstOrOne from '#utils/pickFirstOrOne'
import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'
import type { CharacterId } from '#data/vendor/characterId'

const birthdayCommu = async (
    req: NextApiRequest,
    res: NextApiResponse<FrontendAPIResponseMapping['birthdayCommu']>
) => {
    const q = req.query
    const id = q.charaId ? pickFirstOrOne(q.charaId) : null

    if (id === null) {
        res.status(400).end()
        return
    }

    res.status(200).json(BirthdayCommu[id as CharacterId] ?? {})
}

export default withSentry(birthdayCommu)

export const config = {
    api: {
        externalResolver: true,
    },
}
