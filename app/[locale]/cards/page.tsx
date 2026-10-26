import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'
import { Skeleton } from '@mantine/core'

import { MAX_LEVEL, MAX_RARITY } from '#utils/constants'
import { withMessages } from '#utils/withMessages'
import type { SearchParams } from '#components/cards/sp'
import CardsListFilter from '#components/cards/CardsListFilter'
import spToSo from '#components/cards/spToSo'
import type { UnsafeSearchParams } from '#utils/typeutils'
import CardsListWrapper from '#components/cards/CardsListWrapper'
import type { ParamsWithLocale } from '#utils/types'

const CardsPage = async ({
    searchParams: searchParamsPromise,
    params,
}: {
    searchParams: Promise<UnsafeSearchParams<SearchParams>>
} & ParamsWithLocale) => {
    const searchParams = await searchParamsPromise
    const { locale } = await params
    unstable_setRequestLocale(locale)
    const $t = await getTranslations({ locale, namespace: 'cards' })
    const searchOptions = spToSo(searchParams)

    return (
        <>
            <h2>{$t('Cards')}</h2>
            <p>
                {$t('page_header', {
                    rarity: MAX_RARITY,
                    level: MAX_LEVEL,
                })}
            </p>
            <Suspense fallback={<Skeleton height={300} />}>
                <CardsListFilter />
            </Suspense>
            <Suspense
                key={Object.entries(searchParams).sort().join('|')}
                fallback={<Skeleton height={600} />}
            >
                <CardsListWrapper searchOptions={searchOptions} />
            </Suspense>
        </>
    )
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const $t = await getTranslations({ locale, namespace: 'cards' })
    return {
        title: $t('Cards'),
    }
}

export default withMessages(CardsPage, [
    'cards',
    'vendor',
    'v-chr',
    'v-card-name',
])
