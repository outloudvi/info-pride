import { readFileSync } from 'node:fs'
import path from 'node:path'

import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import satori from 'satori'

import type { CommuLine } from '#components/mtalk/types'
import MTalkExport from '#components/api/img/mtalk/MTalkExport'

type BodyType = {
    lines: CommuLine[]
}

const FONT_OTF = readFileSync(
    path.join(process.cwd(), 'assets', 'notosans-sc.otf')
)

const imgMtalk = async (req: NextApiRequest, res: NextApiResponse) => {
    const body: BodyType = req.body
    if (!body.lines) {
        res.status(400).send({
            ok: false,
            message: 'Invalid lines',
        })
        return
    }

    const svgString = await satori(<MTalkExport lines={body.lines} />, {
        width: 500,
        fonts: [
            {
                name: 'NotoSansSc',
                data: FONT_OTF,
                weight: 400,
                style: 'normal',
            },
        ],
    })
    res.setHeader('Content-Type', 'image/svg+xml')
    res.status(200).send(
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' + svgString
    )
}

export default withSentry(imgMtalk)

export const config = {
    api: {
        externalResolver: true,
    },
}
