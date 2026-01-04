import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'

import { fetchApi } from '#utils/fetchApi'
import { getAssetSlug } from '#components/cards/cardHelper'
import getImageCopyrightMarks from '#data/getImageCopyrightMarks'
import Paths from '#utils/paths'
import { join } from 'node:path'

export default async function OGImage({
    params: { slug },
}: {
    params: { slug: string }
}) {
    const [cardResults, fontBuffer] = await Promise.all([
        fetchApi('Card', {
            id: slug,
        }),
        readFile(join(process.cwd(), 'public/fonts/DMSans-Regular.ttf')),
    ])

    if (cardResults.length === 0) {
        notFound()
    }

    const siteLogoBuf = await readFile(
        join(process.cwd(), 'public/android-chrome-512x512.png'),
    ).then((x) => Uint8Array.from(x).buffer)

    const cardMeta = cardResults[0]
    const { id, assetId } = cardMeta

    const fullIconSlug = getAssetSlug(assetId, 'full', 1)
    const imageBuf = await fetch(Paths.assetsImg(fullIconSlug) + '.png').then(
        (x) => {
            const contentType = x.headers.get('Content-Type')
            if (contentType?.toLowerCase() !== 'image/png') {
                throw new Error(`Invalid image Content-Type: ${contentType}`)
            }
            return x.arrayBuffer()
        },
    )

    const copyrightMarks = getImageCopyrightMarks(id)

    return new ImageResponse(
        <div tw="w-full h-full flex flex-col">
            <div tw="flex h-[80px] w-full items-center px-2">
                {/* @ts-expect-error */}
                <img tw="w-12 h-12 mx-4" src={siteLogoBuf} alt="site logo" />
                <div tw="flex text-3xl grow">
                    info-pride /{' '}
                    <span tw="ml-3 text-3xl text-neutral-500">Card</span>
                </div>
                <div tw="flex self-end pb-1 text-md text-neutral-600">
                    {copyrightMarks.reverse().join(' ')}
                </div>
            </div>
            <img
                width={864}
                height={486}
                tw="rounded-lg absolute bottom-[10px] left-[10px]"
                // @ts-expect-error
                src={imageBuf}
                alt={'asset full image'}
            />
        </div>,
        {
            width: 884,
            height: 575,
            fonts: [
                {
                    name: 'DMSans',
                    data: fontBuffer.buffer.slice(
                        fontBuffer.byteOffset,
                        fontBuffer.byteOffset + fontBuffer.byteLength,
                    ),
                    style: 'normal',
                },
            ],
        },
    )
}
