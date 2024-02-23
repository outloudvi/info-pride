import EventStoryEpisodeList from './EventStoryEpisodeList'

import { fetchApi } from '#utils/fetchApi'

const EventStoryLoader = async ({ eventId }: { eventId: string }) => {
    const eventStories = await fetchApi('EventStory', {
        id: eventId,
    })

    return <EventStoryEpisodeList event={eventStories!} />
}

export default EventStoryLoader
