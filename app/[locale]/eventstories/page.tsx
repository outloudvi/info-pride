import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { pick } from 'lodash'
import { Grid, GridCol, Skeleton } from '@mantine/core'
import { Suspense } from 'react'

import { fetchApi } from '#utils/fetchApi'
import { withAsyncMessages } from '#utils/withMessages'
import EventStoriesList from '#components/eventstories/EventStoriesList'
import type { SearchParams } from '#components/eventstories/sp'
import EventStoryLoader from '#components/eventstories/EventStoryLoader'
import type { UnsafeSearchParams } from '#utils/typeutils'
import type { ParamsWithLocale } from '#utils/types'

const EventStoriesPage = async ({
    searchParams,
    params: { locale },
}: {
    searchParams: UnsafeSearchParams<SearchParams>
} & ParamsWithLocale) => {
    unstable_setRequestLocale(locale)
    const $t = await getTranslations('eventstories')

    const EventStoriesData = await fetchApi('EventStory/List')
    const currEvent = EventStoriesData.find((x) => x.id === searchParams.id)

    return (
        <>
            <h2>{$t('Event Stories')}</h2>
            <p>{$t('stories_ordering')}</p>
            <Grid gutter={20} className="my-3">
                <GridCol span={{ base: 12, lg: 3 }}>
                    <Suspense>
                        <EventStoriesList
                            eventStories={EventStoriesData.sort(
                                (a, b) => b.order - a.order,
                            ).map((x) => pick(x, ['id', 'description']))}
                        />
                    </Suspense>
                </GridCol>
                <GridCol span={{ base: 12, lg: 9 }}>
                    {currEvent && (
                        <div>
                            <h2>{currEvent.description}</h2>
                            <Suspense fallback={<Skeleton height={300} />}>
                                <EventStoryLoader eventId={currEvent.id} />
                            </Suspense>
                        </div>
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
    const $t = await getTranslations({ locale, namespace: 'eventstories' })
    return {
        title: $t('Event Stories'),
    }
}

export default withAsyncMessages(EventStoriesPage, [
    'eventstories',
    'v-event-name',
])
