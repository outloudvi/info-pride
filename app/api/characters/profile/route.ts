import type { NextRequest } from 'next/server'

import { DEFAULT_LANGUAGE } from '#utils/constants'
import data from '#data/profile.data'
import type { CharacterId } from '#data/vendor/characterId'

export function GET(request: NextRequest) {
    const q = request.nextUrl.searchParams

    const id = q.get('id')
    const locale = q.get('locale') ?? DEFAULT_LANGUAGE

    if (id === null) {
        return new Response(null, { status: 400 })
    }

    const profile = data?.[locale]?.[id as CharacterId]
    if (profile) {
        return Response.json(
            { profile },
            {
                headers: {
                    // Cache for 7d
                    'Cache-Control': 'max-age=604800',
                },
            },
        )
    }

    return new Response(null, { status: 404 })
}
