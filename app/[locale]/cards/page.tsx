import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { Skeleton } from '@mantine/core'
import { useTranslations } from 'next-intl'

import { MAX_LEVEL, MAX_RARITY } from '#utils/constants'
import { withMessages } from '#utils/withMessages'
import type { SearchParams } from '#components/cards/sp'
import CardsListFilter from '#components/cards/CardsListFilter'
import spToSo from '#components/cards/spToSo'
import type { UnsafeSearchParams } from '#utils/typeutils'
import CardsListWrapper from '#components/cards/CardsListWrapper'

const CardsPage = ({
    searchParams,
}: {
    searchParams: UnsafeSearchParams<SearchParams>
}) => {
    const $t = useTranslations('cards')
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
    params: { locale },
}: {
    params: { locale: string }
}) {
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
