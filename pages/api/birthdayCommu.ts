import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import BirthdayCommu from '#data/videos/birthday.data'
import pickFirstOrOne from '#utils/pickFirstOrOne'
import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'
import type { CharacterId } from '#data/vendor/characterId'
import { DEFAULT_LANGUAGE } from '#utils/constants'

const birthdayCommu = async (
    req: NextApiRequest,
    res: NextApiResponse<FrontendAPIResponseMapping['birthdayCommu']>
) => {
    const q = req.query
    const id = q.charaId ? pickFirstOrOne(q.charaId) : null
    const locale = q.locale ? pickFirstOrOne(q.locale) : DEFAULT_LANGUAGE

    if (id === null) {
        res.status(400).end()
        return
    }

    res.status(200).json(BirthdayCommu?.[locale]?.[id as CharacterId] ?? {})
}

export default withSentry(birthdayCommu)

export const config = {
    api: {
        externalResolver: true,
    },
}
