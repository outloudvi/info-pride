import { Blockquote, Button, Group, Skeleton } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

import { APIResponseOf } from '#utils/api'
import useApi from '#utils/useApi'
import { toVideoLink } from '#components/ExternalVideo'
import AssetImage from '#components/AssetImage'
import useFrontendApi from '#utils/useFrontendApi'

const EventEpisodeDetail = ({
    id,
    story,
}: {
    id: string
    story: APIResponseOf<'Story'>
}) => {
    const $c = useTranslations('common')
    const { name: jaName, description } = story
    const locale = useLocale()
    const { data: VideoInfoData, isSuccess } = useFrontendApi(
        'eventStories',
        {
            id,
            locale,
        },
        !!locale
    )

    return (
        <>
            {isSuccess && VideoInfoData ? (
                <h3 lang="zh">
                    {VideoInfoData.name} /{' '}
                    <small lang="ja" className="">
                        {jaName}
                    </small>
                </h3>
            ) : (
                <h3 lang="ja">{jaName}</h3>
            )}
            <Blockquote>{description}</Blockquote>
            <Link href={`/story/${id}`} passHref>
                <Button>{$c('Story replay')}</Button>
            </Link>
            {isSuccess ? (
                VideoInfoData ? (
                    <div>
                        <a
                            href={toVideoLink(VideoInfoData.video)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {$c('Video')}
                        </a>
                    </div>
                ) : (
                    <div className="mt-4 text-gray-500">
                        {$c.rich('no_trans', {
                            field: `data[${id}]`,
                            file: 'data/eventStories.data.ts',
                        })}
                    </div>
                )
            ) : (
                <Skeleton height={120} />
            )}
        </>
    )
}

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
