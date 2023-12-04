import { getVersion } from '#components/api/version'

export async function GET() {
    const ver = await getVersion()

    if (!ver) {
        return new Response(null, { status: 404 })
    }

    return Response.json(ver, {
        headers: {
            // Cache for 1d
            'Cache-Control': 'max-age=86400',
        },
    })
}
