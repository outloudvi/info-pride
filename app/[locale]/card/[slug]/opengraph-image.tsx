// @ts-nocheck - [TODO] ts checking fixes

import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'

import { fetchApi } from '#utils/fetchApi'
import { getAssetSlug } from '#components/cards/cardHelper'
import Paths from '#utils/paths'
import jaVChr from '#locales/ja/v-chr.json'

export const runtime = 'edge'

export default async function OGImage({
    params: { slug },
}: {
    params: { slug: string }
}) {
    const cardResults = await fetchApi('Card', {
        id: slug,
    })

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
    const { name, description, assetId, characterId } = cardMeta

    const fullIconSlug = getAssetSlug(assetId, 'full', true)

    return new ImageResponse(
        (
            <div tw="w-full h-full flex flex-col">
                <div tw="flex h-[80px] w-full items-center">
                    <img tw="w-12 h-12 mx-4" src={siteLogo} alt="site logo" />
                    <span tw="text-3xl">
                        info-pride /{' '}
                        <span tw="ml-3 text-3xl text-neutral-500">Card</span>
                    </span>
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
        },
    )
}
