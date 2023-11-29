import type { NextRequest } from 'next/server'

import CardStories from '#data/videos/cardStories.data'
import { DEFAULT_LANGUAGE } from '#utils/constants'

export async function GET(request: NextRequest) {
    const q = request.nextUrl.searchParams

    const id = q.get('id') ?? null
    const locale = q.get('locale') ?? DEFAULT_LANGUAGE

    if (id === null || !locale) {
        return new Response(null, {
            status: 400,
        })
    }

    if (CardStories?.[locale]?.[id] === undefined) {
        return new Response(null, {
            status: 404,
        })
    }

    return Response.json({
        stories: CardStories?.[locale]?.[id],
    })
}
