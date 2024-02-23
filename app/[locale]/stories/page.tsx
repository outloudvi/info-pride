import { useLocale, useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Grid, GridCol, Skeleton } from '@mantine/core'
import _range from 'lodash/range'
import { Suspense } from 'react'

import StoriesList from '#components/stories/StoriesList'
import { withMessages } from '#utils/withMessages'
import getSpecialStories from '#components/stories/getSpecialStories'
import type { SeriesName } from '#data/stories'
import { Episodes, Series } from '#data/stories'
import storiesData from '#data/videos/stories.data'
import type { IStoriesData } from '#data/videos/stories.data/types'
import type { SearchParams } from '#components/stories/sp'
import { SPECIAL_SERIES_TAG } from '#components/stories/constants'
import SpecialStoriesItem from '#components/stories/SpecialStoriesItem'
import StoriesItem from '#components/stories/StoriesItem'

const StoriesPage = ({
    searchParams,
}: {
    searchParams: Partial<SearchParams>
}) => {
    const $t = useTranslations('stories')
    const locale = useLocale()

    const curSeries = Number(searchParams.series ?? 0)
    const curSeason = Number(searchParams.s ?? 1)
    const curChapter = Number(searchParams.c ?? 1)
    const seriesName = Series[curSeries]

    const special = getSpecialStories(locale)
    const completion = (() => {
        const ret: Partial<IStoriesData<0 | 1>> = {}
        for (let i = 0; i < Series.length; i++) {
            const seriesSlug = Series[i]
            ret[seriesSlug] = [
                // skip index 0
                [],
                ...Episodes[seriesSlug].map((length, episodeKey) =>
                    _range(1, length + 1).map((chapterId) =>
                        storiesData?.[locale]?.data?.[
                            seriesSlug as SeriesName
                        ]?.[episodeKey + 1]?.[chapterId]
                            ? 1
                            : 0,
                    ),
                ),
            ]
        }
        return ret as IStoriesData<0 | 1>
    })()

    return (
        <>
            <h2>{$t('Stories')}</h2>
            <Grid gutter={20} className="my-3">
                <GridCol span={{ base: 12, lg: 6 }}>
                    <Suspense>
                        <StoriesList
                            special={special}
                            completion={completion}
                        />
                    </Suspense>
                </GridCol>
                <GridCol span={{ base: 12, lg: 6 }}>
                    {curSeries === SPECIAL_SERIES_TAG ? (
                        <SpecialStoriesItem item={special[curChapter]} />
                    ) : (
                        <Suspense fallback={<Skeleton height={600} />}>
                            <StoriesItem
                                series={seriesName}
                                season={curSeason}
                                chapter={curChapter}
                            />
                        </Suspense>
                    )}
                </GridCol>
            </Grid>
        </>
    )
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'stories' })
    return {
        title: $t('Stories'),
    }
}

export default withMessages(StoriesPage, ['stories'])
