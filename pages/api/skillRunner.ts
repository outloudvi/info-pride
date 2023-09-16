import type { NextApiRequest, NextApiResponse } from 'next'

import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'
import Paths from '#utils/paths'
import type { APIResponseOf } from '#utils/api'
import skillRunner from '#utils/skillRunner'

type RequestQuery = {
    chartId: string
    track: string
    skillIds: string
}

const SkillRunner = async (
    req: NextApiRequest,
    res: NextApiResponse<FrontendAPIResponseMapping['skillRunner']>,
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

    const skillData: APIResponseOf<'Skill'> = await fetch(
        Paths.api('Skill') + `?ids=${skillIds}`,
    ).then((x) => x.json())

    const skillxData: APIResponseOf<'Skill/X'> = await fetch(
        Paths.api('Skill/X') +
            `?ids=${
                // TODO: allow specifying the level
                skillData
                    .map((x) =>
                        x.levels[0].skillDetails
                            .map((r) => r.efficacyId)
                            .join(','),
                    )
                    .join(',')
            }`,
    ).then((x) => x.json())

    const chartData: APIResponseOf<'MusicChart'> = await fetch(
        Paths.api('MusicChart') + `?chartId=${chartId}`,
    ).then((x) => x.json())

    res.status(200).json(
        skillRunner(
            {
                skills: skillData,
                chartLine: chartData.chart[Number(track) as 1 | 2 | 3 | 4 | 5],
            },
            skillxData,
        ),
    )
}

export default SkillRunner

export const config = {
    api: {
        externalResolver: true,
    },
}
