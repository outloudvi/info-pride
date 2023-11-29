import type { NextRequest } from 'next/server'

import { DEFAULT_LANGUAGE } from '#utils/constants'
import eventStoriesData from '#data/videos/eventStories.data'

export async function GET(request: NextRequest) {
    const q = request.nextUrl.searchParams
    const id = q.get('id') ?? null
    const locale = q.get('locale') ?? DEFAULT_LANGUAGE

    if (id === null) {
        return new Response(null, { status: 400 })
    }

    const ret = eventStoriesData[locale]?.data?.[id]
    if (!ret) {
        return new Response(null, { status: 404 })
    }

    return Response.json(ret)
}
