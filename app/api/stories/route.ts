import type { NextRequest } from 'next/server'

import { DEFAULT_LANGUAGE } from '#utils/constants'
import storiesData from '#data/videos/stories.data'
import type { SeriesName } from '#data/stories'

// ?series=hoshimi&season=1&chapter=1
export function GET(request: NextRequest) {
    const q = request.nextUrl.searchParams
    const series = q.get('series')
    const season = Number.parseInt(q.get('season') ?? '')
    const chapter = Number.parseInt(q.get('chapter') ?? '')
    const locale = q.get('locale') ?? DEFAULT_LANGUAGE

    if (!series || Number.isNaN(season) || Number.isNaN(chapter)) {
        return new Response(null, { status: 400 })
    }

    const ret =
        storiesData?.[locale]?.data?.[series as SeriesName]?.[season]?.[chapter]
    if (!ret) {
        return new Response(null, { status: 404 })
    }

    return Response.json(ret)
}
