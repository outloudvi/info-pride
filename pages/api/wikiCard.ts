import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { Cards } from '../../utils/dataset'
import type { Card as WikiCard } from '../../utils/wikiPages/cards'
import CardStories, { Stories } from '../../data/cardStories.data'

const CardsArray: WikiCard[] = Object.values(Cards)
  .map(Object.values)
  .reduce((a, b) => [...a, ...b])

const WikiCard = async (
  req: NextApiRequest,
  res: NextApiResponse<{ card: WikiCard; stories: Stories | null } | undefined>
) => {
  const q = req.query
  const nameJa = q.nameJa
    ? Array.isArray(q.nameJa)
      ? q.nameJa[0]
      : q.nameJa
    : null
  if (nameJa === null) {
    res.status(500).end()
    return
  }

  const card = CardsArray.filter((r) => r.nameJa === nameJa)
  if (card.length === 0) {
    res.status(404).end()
    return
  }

  const targetCard = card[0]
  const stories = CardStories?.[targetCard.ownerSlug]?.[targetCard.ownerId]

  res.status(200).json({
    card: targetCard,
    stories: stories ?? null,
  })
}

export default withSentry(WikiCard)

export const config = {
  api: {
    externalResolver: true,
  },
}
