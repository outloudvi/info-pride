import type { NextRequest } from 'next/server'

import { DATA_CACHE_SECONDS } from '#utils/cachePolicy'
import { fetchApi } from '#utils/fetchApi'
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

    const skillData = await fetchApi('Skill', { ids: skillIds })
    const chartData = await fetchApi('MusicChart', { chartId })

    return Response.json(
        skillRunner({
            skills: skillData,
            chartLine: chartData.chart[Number(track) as 1 | 2 | 3 | 4 | 5],
        }),
        {
            headers: {
                'Cache-Control': `public, max-age=${DATA_CACHE_SECONDS}, s-maxage=${DATA_CACHE_SECONDS}, must-revalidate`,
            },
        },
    )
}
