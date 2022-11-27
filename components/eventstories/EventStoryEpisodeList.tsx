import { Button, Group } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import EventEpisodeDetail from './EventEpisodeDetail'

import type { APIResponseOf } from '#utils/api'
import useApi from '#utils/useApi'
import AssetImage from '#components/AssetImage'

const EventStoryEpisodeList = ({
    event,
}: {
    event: NonNullable<APIResponseOf<'EventStory'>>
}) => {
    const $t = useTranslations('eventstories')
    const $c = useTranslations('common')
    const [selectedStoryId, setSelectedStoryId] = useState(
        event.episodes[0].storyId
    )
    const { data: StoryData } = useApi('Story', {
        id: selectedStoryId,
    })

    useEffect(() => {
        setSelectedStoryId(event.episodes[0].storyId)
    }, [event])

    return (
        <>
            <div className="p-4 lg:float-right lg:clear-right">
                <AssetImage
                    name={`img_story_event_banner_${event.assetId}`}
                    ratio={2.95}
                    height={120}
                    alt={$t('Event banner')}
                />
            </div>
            <Group>
                {event.episodes.map((item, key) => (
                    <Button
                        key={key}
                        color={
                            selectedStoryId === item.storyId ? 'green' : 'blue'
                        }
                        onClick={() => {
                            setSelectedStoryId(item.storyId)
                        }}
                    >
                        {$t('episode', { ep: item.episode })}
                    </Button>
                ))}
            </Group>
            {StoryData ? (
                <EventEpisodeDetail id={selectedStoryId} story={StoryData} />
            ) : (
                <div className="text-gray-500 text-center">{$c('loading')}</div>
            )}
        </>
    )
}

export default EventStoryEpisodeList
