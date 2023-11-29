import type { NextRequest } from 'next/server'

import BirthdayCommu from '#data/videos/birthday.data'
import type { CharacterId } from '#data/vendor/characterId'
import { DEFAULT_LANGUAGE } from '#utils/constants'

export async function GET(request: NextRequest) {
    const q = request.nextUrl.searchParams
    const id = q.get('charaId') ?? null
    const locale = q.get('locale') ?? DEFAULT_LANGUAGE

    if (id === null) {
        return new Response(null, {
            status: 400,
        })
        return
    }

    return Response.json(BirthdayCommu?.[locale]?.[id as CharacterId] ?? {})
}
