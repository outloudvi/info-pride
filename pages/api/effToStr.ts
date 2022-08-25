import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { EffectWithTarget } from 'hoshimi-types/Skillx'

import tryJSONParse from '#utils/tryJsonParse'
import skillxToString from '#components/api/effToStr/skillxToString'

const EffToStr = async (
    req: NextApiRequest,
    res: NextApiResponse<string[]>
) => {
    const body: (Omit<EffectWithTarget, 'owner'> & { trigger?: string })[] =
        tryJSONParse(req.body)
    if (body === null || !Array.isArray(body)) {
        res.status(400).end()
        return
    }
    res.status(200).json(body.map((x) => skillxToString(x, x.trigger)))
}

export default withSentry(EffToStr)

export const config = {
    api: {
        externalResolver: true,
    },
}
