import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'

import { fetchApi } from '#utils/fetchApi'
import { getAssetSlug } from '#components/cards/cardHelper'
import getImageCopyrightMarks from '#data/getImageCopyrightMarks'
import Paths from '#utils/paths'

export const runtime = 'edge'

export default async function OGImage({
    params: { slug },
}: {
    params: { slug: string }
}) {
    const [cardResults, fontData] = await Promise.all([
        fetchApi('Card', {
            id: slug,
        }),
        fetch(
            new URL('../../../../assets/DMSans-Regular.ttf', import.meta.url),
        ).then((x) => x.arrayBuffer()),
    ])

    if (cardResults.length === 0) {
        notFound()
    }

    const siteLogo = await fetch(
        new URL(
            '../../../../public/android-chrome-512x512.png',
            import.meta.url,
        ),
    ).then((x) => x.arrayBuffer())

    const cardMeta = cardResults[0]
    const { id, assetId } = cardMeta

    const fullIconSlug = getAssetSlug(assetId, 'full', 1)

    const copyrightMarks = getImageCopyrightMarks(id)

    return new ImageResponse(
        (
            <div tw="w-full h-full flex flex-col">
                <div tw="flex h-[80px] w-full items-center px-2">
                    <img
                        tw="w-12 h-12 mx-4"
                        src={siteLogo as unknown as string}
                        alt="site logo"
                    />
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
                    src={Paths.assetsImg(fullIconSlug) + '.webp'}
                    alt={'asset full image'}
                />
            </div>
        ),
        {
            width: 884,
            height: 575,
            fonts: [
                {
                    name: 'DMSans',
                    data: fontData,
                    style: 'normal',
                },
            ],
        },
    )
}
