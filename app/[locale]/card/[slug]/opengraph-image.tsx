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

    const thumbIconSlug = getAssetSlug(assetId, 'thumb', true)
    const fullIconSlug = getAssetSlug(assetId, 'full', true)

    return new ImageResponse(
        (
            <div tw="w-full h-full flex flex-col">
                <img
                    width={(500 * 16) / 9}
                    height={500}
                    tw="rounded-lg absolute top-[100px] left-[156px] opacity-30"
                    src={Paths.assetsImg(fullIconSlug) + '.webp'}
                    alt={'asset full image'}
                />
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
                            tw="rounded-lg border-4 border-blue-600"
                            src={Paths.assetsImg(thumbIconSlug) + '.webp'}
                            alt={'asset thumb image'}
                        />
                    </div>
                    <div tw="flex flex-col justify-center">
                        <div tw="flex flex-col rounded-md bg-blue-300 bg-opacity-80 px-4 py-2">
                            <div tw="flex text-6xl mb-2">{name}</div>
                            <div tw="flex text-4xl mb-5">
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
            </div>
        ),
        {
            width: 1200,
            height: 600,
        },
    )
}
