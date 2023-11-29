import type { NextRequest } from 'next/server'

import apiData from '#locales/apiData'
import { DEFAULT_LANGUAGE } from '#utils/constants'

export async function GET(request: NextRequest) {
    const q = request.nextUrl

    const assetId = q.searchParams.get('assetId') ?? null
    const locale = q.searchParams.get('locale') ?? DEFAULT_LANGUAGE

    if (assetId === null || !locale) {
        return new Response(null, { status: 400 })
    }

    if (apiData.alias?.[locale]?.[assetId] === undefined) {
        return new Response(null, { status: 400 })
    }

    return Response.json({
        aliases: apiData.alias?.[locale]?.[assetId],
    })
}
