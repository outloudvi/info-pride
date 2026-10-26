import { notFound } from 'next/navigation'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'
import { Skeleton } from '@mantine/core'

import CardItem from '#components/cards/CardItem'
import { fetchApi } from '#utils/fetchApi'
import { withMessages } from '#utils/withMessages'
import $tp from '#utils/transProtect'

const CardInfoPageWrapper = async ({
    params,
}: {
    params: Promise<{ slug: string; locale: string }>
}) => {
    const { slug, locale } = await params
    unstable_setRequestLocale(locale)
    return (
        <Suspense fallback={<Skeleton height={800} />}>
            <CardInfoPage slug={slug} locale={locale} />
        </Suspense>
    )
}

const CardInfoPage = async ({ slug, locale }: { slug: string; locale: string }) => {
    const $vn = await getTranslations({ locale, namespace: 'v-card-name' })

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
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const cardResults = await fetchApi('Card', {
        id: slug,
    })
    return {
        title: cardResults?.[0]?.name,
    }
}

// Card detail follows the 1h card data cache. Next.js requires route
// segment config to be statically analyzable, so this mirrors
// CARD_CACHE_SECONDS from utils/cachePolicy.ts.
export const revalidate = 3600

export default withMessages(CardInfoPageWrapper, [
    'cards_slug',
    'vendor',
    'v-chr',
])
