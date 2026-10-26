import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'
import { Skeleton } from '@mantine/core'

import { withMessages } from '#utils/withMessages'
import SearchBox from '#components/search/message/SearchBox'
import type { SearchParams } from '#components/search/common/sp'
import SearchResult from '#components/search/message/SearchResult'
import type { UnsafeSearchParams } from '#utils/typeutils'
import type { ParamsWithLocale } from '#utils/types'

const MessageSearchPage = async ({
    searchParams: searchParamsPromise,
    params,
}: {
    searchParams: Promise<UnsafeSearchParams<SearchParams & { chid?: string }>>
} & ParamsWithLocale) => {
    const searchParams = await searchParamsPromise
    const { locale } = await params
    unstable_setRequestLocale(locale)
    const $t = await getTranslations('message_search')
    const q = searchParams.q === undefined ? '' : String(searchParams.q)
    const characterId =
        searchParams.chid === undefined ? '' : String(searchParams.chid)

    return (
        <>
            <h2>{$t('Message Search')}</h2>
            <p>{$t('description')}</p>
            <div className="max-w-7xl mx-auto">
                <SearchBox q={q} returnType="id" character={characterId} />
                {q !== undefined && (
                    <Suspense fallback={<Skeleton height={600} />}>
                        <SearchResult q={q} characterId={characterId} />
                    </Suspense>
                )}
            </div>
        </>
    )
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const $t = await getTranslations({ locale, namespace: 'message_search' })
    return {
        title: $t('Message Search'),
    }
}

export default withMessages(MessageSearchPage, ['message_search', 'v-chr'])
