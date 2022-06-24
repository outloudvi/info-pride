import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import CardStories from '#data/cardStories.data'
import pickFirstOrOne from '#utils/pickFirstOrOne'
import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'

const cardStories = async (
  req: NextApiRequest,
  res: NextApiResponse<FrontendAPIResponseMapping['cardStories']>
) => {
  const q = req.query
  const id = q.id ? pickFirstOrOne(q.id) : null

  if (id === null) {
    res.status(400).end()
    return
  }

  if (CardStories[id] === undefined) {
    res.status(404).end()
    return
  }

  res.status(200).json({
    stories: CardStories[id],
  })
}

export default withSentry(cardStories)

export const config = {
  api: {
    externalResolver: true,
  },
}
