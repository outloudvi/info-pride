// @ts-nocheck - [TODO] ts checking fixes

// IDENTICAL WITH opengraph-image.tsx - cannot do by import due to issues

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

    const assetSlug = getAssetSlug(assetId, 'thumb', true)

    return new ImageResponse(
        (
            <div tw="w-full h-full flex flex-col">
                <div tw="flex h-1/6 w-full items-center">
                    <img tw="w-12 h-12 mx-4" src={siteLogo} alt="site logo" />
                    <span tw="text-3xl">
                        info-pride /{' '}
                        <span tw="ml-3 text-3xl text-neutral-500">Card</span>
                    </span>
                </div>
                <div tw="flex flex-row grow justify-center">
                    <div tw="flex items-center justify-center mr-6">
                        <img
                            width={144}
                            height={144}
                            tw="rounded-lg"
                            // TODO
                            src={Paths.assetsImg(assetSlug) + '.webp'}
                            alt={'asset image'}
                        />
                    </div>
                    <div tw="flex flex-col justify-center">
                        <div tw="flex text-6xl mb-4">{name}</div>
                        <div tw="flex text-4xl mb-3">
                            {jaVChr[characterId] ?? characterId}
                        </div>
                        <div tw="flex flex-col text-2xl text-neutral-600">
                            {description.split('\n').map((line, key) => (
                                <div key={key} tw="flex flex-row">
                                    {line}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 600,
        },
    )
}
