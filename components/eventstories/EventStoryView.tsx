'use client'

import { Skeleton } from '@mantine/core'

import EventStoryEpisodeList from './EventStoryEpisodeList'

import type { APIResponseOf } from '#utils/api'
import useApi from '#utils/useApi'

const EventStoryView = ({
    currEvent,
}: {
    currEvent: APIResponseOf<'EventStory/List'>[number]
}) => {
    const { data } = useApi('EventStory', {
        id: currEvent.id,
    })

    return (
        <div>
            <h2>{currEvent.description}</h2>
            {data ? (
                <EventStoryEpisodeList event={data} />
            ) : (
                <Skeleton height={300} />
            )}
        </div>
    )
}

export default EventStoryView
