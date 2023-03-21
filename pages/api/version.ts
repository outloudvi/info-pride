import type { NextApiRequest, NextApiResponse } from 'next'
import { got } from 'got'
import * as cheerio from 'cheerio'

import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'

const IOS_APP_PAGE = 'https://apps.apple.com/jp/app/id1535925293'

async function getVersion(): Promise<
    FrontendAPIResponseMapping['version'] | null
> {
    const html = await got
        .get(IOS_APP_PAGE, {
            responseType: 'text',
        })
        .text()

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

const Version = async (
    _req: NextApiRequest,
    res: NextApiResponse<FrontendAPIResponseMapping['version']>
) => {
    const ver = await getVersion()

    if (!ver) {
        res.status(404).end()
        return
    }

    // Cache for 1d
    res.setHeader('Cache-Control', 'max-age=43200')
    res.status(200).json(ver)
}

export default Version

export const config = {
    api: {
        externalResolver: true,
    },
}
