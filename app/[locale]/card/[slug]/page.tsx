import { notFound } from 'next/navigation'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'
import { Skeleton } from '@mantine/core'

import CardItem from '#components/cards/CardItem'
import { fetchApi } from '#utils/fetchApi'
import { withMessages } from '#utils/withMessages'
import $tp from '#utils/transProtect'
import type { ParamsWithLocale } from '#utils/types'
import locales from '#locales/locales.json'
import { MAX_LEVEL, MAX_RARITY } from '#utils/constants'

const CardInfoPageWrapper = ({
    params: { slug, locale },
}: {
    params: { slug: string }
} & ParamsWithLocale) => {
    unstable_setRequestLocale(locale)
    return (
        <Suspense fallback={<Skeleton height={800} />}>
            <CardInfoPage slug={slug} />
        </Suspense>
    )
}

const CardInfoPage = async ({ slug }: { slug: string }) => {
    const $vn = await getTranslations('v-card-name')

    const cardResults = await fetchApi('Card', {
        id: slug,
    })
    if (cardResults.length === 0) {
        notFound()
    }

    const Card = cardResults[0]

    return <CardItem card={Card} title={$vn($tp(Card.name))} />
}

export async function generateMetadata({
    params: { slug },
}: {
    params: { slug: string }
}) {
    const cardResults = await fetchApi('Card', {
        id: slug,
    })
    return {
        title: cardResults?.[0]?.name,
    }
}

// cache it after the first generation
export const dynamic = 'force-static'

export async function generateStaticParams() {
    // pre-render 12 latest cards on build
    const latest12CardIds = await fetchApi('Card/List', {
        level: String(MAX_LEVEL),
        rarity: String(MAX_RARITY),
    }).then((x) =>
        x
            .sort((a, b) => {
                const diff = Number(b.releaseDate) - Number(a.releaseDate)
                if (isNaN(diff)) return 0
                return diff
            })
            .slice(0, 8)
            .map((y) => y.id),
    )

    return locales.flatMap((locale) =>
        latest12CardIds.map((id) => ({
            locale,
            slug: id,
        })),
    )
}

export default withMessages(CardInfoPageWrapper, [
    'cards_slug',
    'vendor',
    'v-chr',
])
