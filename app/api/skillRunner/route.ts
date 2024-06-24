import type { NextRequest } from 'next/server'

import Paths from '#utils/paths'
import type { APIResponseOf } from '#utils/api'
import skillRunner from '#utils/skillRunner'

export async function GET(request: NextRequest) {
    const q = request.nextUrl

    const chartId = q.searchParams.get('chartId')
    const track = q.searchParams.get('track')
    const skillIds = q.searchParams.get('skillIds')

    if (
        chartId === null ||
        skillIds === null ||
        !['1', '2', '3', '4', '5'].includes(String(track))
    ) {
        return new Response(null, { status: 400 })
    }

    if (skillIds === '' || chartId === '') {
        return Response.json([])
    }

    const skillData: APIResponseOf<'Skill'> = await fetch(
        Paths.api('Skill') + `?ids=${skillIds}`,
    ).then((x) => x.json())

    const chartData: APIResponseOf<'MusicChart'> = await fetch(
        Paths.api('MusicChart') + `?chartId=${chartId}`,
    ).then((x) => x.json())

    return Response.json(
        skillRunner({
            skills: skillData,
            chartLine: chartData.chart[Number(track) as 1 | 2 | 3 | 4 | 5],
        }),
        {
            headers: {
                'Cache-Control': 'public, s-maxage=86400',
            },
        },
    )
}
