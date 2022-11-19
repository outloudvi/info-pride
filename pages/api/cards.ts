import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { Cards } from '#data/wikiPages'
import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'

const cards = async (
    _: NextApiRequest,
    res: NextApiResponse<FrontendAPIResponseMapping['cards']>
) => {
    // Cache for 1d
    res.setHeader('Cache-Control', 'max-age=86400')
    res.status(200).json(Cards)
}

export default withSentry(cards)

export const config = {
    api: {
        externalResolver: true,
    },
}
