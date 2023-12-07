import { getTranslations } from 'next-intl/server'

import { fetchApi } from '#utils/fetchApi'
import EventStoriesMainView from '#components/eventstories/EventStoriesMainView'
import { withAsyncMessages } from '#utils/withMessages'

const EventStoriesPage = async () => {
    const $t = await getTranslations('eventstories')

    const EventStoriesData = await fetchApi('EventStory/List')

    return (
        <>
            <h2>{$t('Event Stories')}</h2>
            <p>{$t('stories_ordering')}</p>
            <EventStoriesMainView EventStoriesData={EventStoriesData} />
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
