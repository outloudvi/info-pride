import { getTranslations } from 'next-intl/server'

import { fetchApi } from '#utils/fetchApi'
import Title from '#components/Title'
import EventStoriesMainView from '#components/eventstories/EventStoriesMainView'

const EventStoriesPage = async () => {
    const $t = await getTranslations('eventstories')

    const EventStoriesData = await fetchApi('EventStory/List')

    return (
        <>
            <Title title={$t('Event Stories')} />
            <p>{$t('stories_ordering')}</p>
            <EventStoriesMainView EventStoriesData={EventStoriesData} />
        </>
    )
}

export default EventStoriesPage
