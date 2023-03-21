import type { NextApiRequest, NextApiResponse } from 'next'
import satori from 'satori'

import type { CommuLine } from '#components/mtalk/types'
import MTalkExport from '#components/api/img/mtalk/MTalkExport'
import FontLoader from '#components/api/img/mtalk/FontLoader'
import Paths from '#utils/paths'

type BodyType = {
    lines: CommuLine[]
}

const fontSC = new FontLoader(
    'https://cdn.jsdelivr.net/gh/googlefonts/noto-cjk@main/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Regular.otf'
)
const fontJP = new FontLoader(
    'https://cdn.jsdelivr.net/gh/googlefonts/noto-cjk@main/Sans/OTF/Japanese/NotoSansCJKjp-Regular.otf'
)
const fontTC = new FontLoader(
    'https://cdn.jsdelivr.net/gh/googlefonts/noto-cjk@main/Sans/OTF/TraditionalChinese/NotoSansCJKtc-Regular.otf'
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

    const [
        fontScBlob,
        // fontJpBlob,
        // fontTcBlob
    ] = await Promise.all([
        fontSC.get(),
        // fontJP.get(),
        // fontTC.get(),
    ])
    const svgString = await satori(<MTalkExport lines={body.lines} />, {
        width: 500,
        fonts: [
            {
                name: 'NotoSansSc',
                data: fontScBlob,
                weight: 400,
                style: 'normal',
            },
            // {
            //     name: 'NotoSansJp',
            //     data: fontJpBlob,
            //     weight: 400,
            //     style: 'normal',
            // },
            // {
            //     name: 'NotoSansTc',
            //     data: fontTcBlob,
            //     weight: 400,
            //     style: 'normal',
            // },
        ],
    })
    res.setHeader('Content-Type', 'image/svg+xml')
    res.status(200).send(
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' + svgString
    )
}

export default imgMtalk

export const config = {
    api: {
        externalResolver: true,
    },
}
