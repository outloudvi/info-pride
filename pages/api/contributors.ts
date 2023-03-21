import type { NextApiRequest, NextApiResponse } from 'next'
import { got } from 'got'

import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'

const contributors = async (
    _: NextApiRequest,
    res: NextApiResponse<FrontendAPIResponseMapping['contributors']>
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

export default contributors

export const config = {
    api: {
        externalResolver: true,
    },
}
