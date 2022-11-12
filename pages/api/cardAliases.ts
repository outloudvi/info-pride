import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import apiData from '../../locales/apiData'

import pickFirstOrOne from '#utils/pickFirstOrOne'
import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'
import { DEFAULT_LANGUAGE } from '#utils/constants'

const cardAliases = async (
    req: NextApiRequest,
    res: NextApiResponse<FrontendAPIResponseMapping['cardAliases']>
) => {
    const q = req.query

    const assetId = q.assetId ? pickFirstOrOne(q.assetId) : null
    const locale = q.locale ? pickFirstOrOne(q.locale) : DEFAULT_LANGUAGE

    if (assetId === null || !locale) {
        res.status(400).end()
        return
    }

    if (apiData.alias?.[locale]?.[assetId] === undefined) {
        res.status(404).end()
        return
    }

    res.status(200).json({
        aliases: apiData.alias?.[locale]?.[assetId],
    })
}

export default withSentry(cardAliases)

export const config = {
    api: {
        externalResolver: true,
    },
}
