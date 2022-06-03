import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { got } from 'got'
import * as cheerio from 'cheerio'

const IOS_APP_PAGE = 'https://apps.apple.com/jp/app/id1535925293'

export type VersionInfo = {
  releaseDate: string
  releaseNotes: string
  releaseTimestamp: string
  versionDisplay: string
}

async function getVersion(): Promise<VersionInfo | null> {
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
      const ver = item.d[0].attributes.platformAttributes.ios.versionHistory[0]
      return ver
    } catch (_) {
      continue
    }
  }
  return null
}

const Version = async (
  req: NextApiRequest,
  res: NextApiResponse<VersionInfo | unknown>
) => {
  // Cache for 1d
  res.setHeader('Cache-Control', 'max-age=43200')
  res.status(200).json((await getVersion()) ?? {})
}

export default withSentry(Version)

export const config = {
  api: {
    externalResolver: true,
  },
}
