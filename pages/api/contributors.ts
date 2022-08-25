import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { got } from 'got'

export type Contributor = {
    login: string
    name: string
    avatar_url: string
    profile: string
    contributions: string[]
}

const Contributors = async (
    _: NextApiRequest,
    res: NextApiResponse<Contributor[]>
) => {
    res.setHeader('Cache-Control', 'max-age=86400')
    const text = await got(
        'https://raw.githubusercontent.com/outloudvi/info-pride/master/.all-contributorsrc',
        {
            responseType: 'text',
        }
    ).text()
    res.status(200).json(JSON.parse(text)?.contributors ?? [])
}

export default withSentry(Contributors)

export const config = {
    api: {
        externalResolver: true,
    },
}
