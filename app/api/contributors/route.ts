export async function GET() {
    const text = await fetch(
        'https://raw.githubusercontent.com/outloudvi/info-pride/master/.all-contributorsrc',
    ).then((x) => x.text())
    return Response.json(JSON.parse(text)?.contributors ?? [], {
        headers: {
            'Cache-Control': 'max-age=86400',
        },
    })
}
