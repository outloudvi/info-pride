import { Cards } from '#data/wikiPages'

export function GET() {
    return Response.json(Cards, {
        headers: {
            // Cache for 1d
            'Cache-Control': 'max-age=86400',
        },
    })
}
