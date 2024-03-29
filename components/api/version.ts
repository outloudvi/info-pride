import * as cheerio from 'cheerio'

const IOS_APP_PAGE = 'https://apps.apple.com/jp/app/id1535925293'

export async function getVersion(): Promise<{
    releaseDate: string
    releaseNotes: string
    releaseTimestamp: string
    versionDisplay: string
} | null> {
    const html = await fetch(IOS_APP_PAGE).then((x) => x.text())

    const $ = cheerio.load(html)
    const shoeboxMeta = $('#shoebox-media-api-cache-apps').html()
    if (!shoeboxMeta) return null
    const obj = JSON.parse(shoeboxMeta)
    for (const i of Object.values(obj)) {
        try {
            const item = JSON.parse(i as string)
            const ver =
                item.d[0].attributes.platformAttributes.ios.versionHistory[0]
            return ver
        } catch (_) {
            continue
        }
    }
    return null
}
