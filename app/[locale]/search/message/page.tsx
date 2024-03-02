import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { Skeleton } from '@mantine/core'

import { withMessages } from '#utils/withMessages'
import SearchBox from '#components/search/message/SearchBox'
import type { SearchParams } from '#components/search/common/sp'
import SearchResult from '#components/search/message/SearchResult'
import type { UnsafeSearchParams } from '#utils/typeutils'

const MessageSearchPage = ({
    searchParams,
}: {
    searchParams: UnsafeSearchParams<SearchParams>
}) => {
    const $t = useTranslations('message_search')
    const q = searchParams.q === undefined ? '' : String(searchParams.q)

    return (
        <>
            <h2>{$t('Message Search')}</h2>
            <p>{$t('description')}</p>
            <div className="max-w-7xl mx-auto">
                <SearchBox q={q} />
                {q !== undefined && (
                    <Suspense fallback={<Skeleton height={600} />}>
                        <SearchResult q={q} />
                    </Suspense>
                )}
            </div>
        </>
    )
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'message_search' })
    return {
        title: $t('Message Search'),
    }
}

export default withMessages(MessageSearchPage, ['message_search', 'v-chr'])
