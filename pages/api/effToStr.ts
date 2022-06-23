import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { EffectWithTarget } from 'hoshimi-types/Skillx'

import tryJSONParse from '#utils/tryJsonParse'
import skillxToString from '#components/api/effToStr/skillxToString'

const EffToStr = async (
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) => {
  const body: EffectWithTarget[] = tryJSONParse(req.body)
  if (body === null || !Array.isArray(body)) {
    res.status(400).end()
    return
  }
  res.status(200).json(body.map(skillxToString))
}

export default withSentry(EffToStr)

export const config = {
  api: {
    externalResolver: true,
  },
}
