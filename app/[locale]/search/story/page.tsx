import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'
import { Skeleton } from '@mantine/core'

import { withMessages } from '#utils/withMessages'
import SearchBox from '#components/search/story/SearchBox'
import SearchResult from '#components/search/story/SearchResult'
import type { SearchParams } from '#components/search/common/sp'
import type { UnsafeSearchParams } from '#utils/typeutils'
import type { ParamsWithLocale } from '#utils/types'

const StorySearchPage = ({
    searchParams,
    params: { locale },
}: {
    searchParams: UnsafeSearchParams<SearchParams>
} & ParamsWithLocale) => {
    unstable_setRequestLocale(locale)
    const $t = useTranslations('story_search')
    const q = searchParams.q === undefined ? '' : String(searchParams.q)

    return (
        <>
            <h2>{$t('Story search')}</h2>
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
    const $t = await getTranslations({ locale, namespace: 'story_search' })
    return {
        title: $t('Story search'),
    }
}

export default withMessages(StorySearchPage, ['story_search'])
