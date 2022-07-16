import { got } from 'got'
import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { FrontendAPIResponseMapping } from '#utils/useFrontendApi'
import Paths from '#utils/paths'
import { APIResponseOf } from '#utils/api'
import skillRunner from '#utils/skillRunner'

type RequestQuery = {
  chartId: string
  track: string
  skillIds: string
}

const SkillRunner = async (
  req: NextApiRequest,
  res: NextApiResponse<FrontendAPIResponseMapping['skillRunner']>
) => {
  const q = req.query
  if (
    !(typeof q.chartId === 'string') ||
    !(typeof q.skillIds === 'string') ||
    !['1', '2', '3', '4', '5'].includes(String(q.track))
  ) {
    res.status(400).json([])
    return
  }

  const { chartId, track, skillIds } = q as RequestQuery
  if (skillIds.length === 0 || chartId === '') {
    res.status(200).json([])
    return
  }

  const skillData: APIResponseOf<'Skill'> = await got
    .get(Paths.api('Skill') + `?ids=${skillIds}`)
    .json()

  const skillxData: APIResponseOf<'Skill/X'> = await got
    .get(Paths.api('Skill/X'))
    .json()

  const chartData: APIResponseOf<'MusicChart'> = await got
    .get(Paths.api('MusicChart') + `?chartId=${chartId}`)
    .json()

  res.status(200).json(
    skillRunner(
      {
        skills: skillData,
        chartLine: chartData.chart[Number(track) as 1 | 2 | 3 | 4 | 5],
      },
      skillxData
    )
  )
}

export default withSentry(SkillRunner)

export const config = {
  api: {
    externalResolver: true,
  },
}
