import { Blockquote, Button, Group, Skeleton } from '@mantine/core'
import { useEffect, useState } from 'react'

import { APIResponseOf } from '#utils/api'
import useApi from '#utils/useApi'
import EventStoriesData from '#data/eventStories.data'
import { toVideoLink } from '#components/ExternalVideo'
import Paths from '#utils/paths'
import AssetImage from '#components/AssetImage'

const EventEpisodeDetail = ({ story }: { story: APIResponseOf<'Story'> }) => {
  const { id, name: jaName, description } = story
  const zhData = EventStoriesData[id]

  return (
    <>
      {zhData ? (
        <h3 lang="zh">
          {zhData.name} /{' '}
          <small lang="ja" className="">
            {jaName}
          </small>
        </h3>
      ) : (
        <h3 lang="ja">{jaName}</h3>
      )}
      <Blockquote>{description}</Blockquote>
      {zhData ? (
        <div>
          <a
            href={toVideoLink(zhData.video)}
            target="_blank"
            rel="noopener noreferrer"
          >
            视频
          </a>
        </div>
      ) : (
        <div className="mt-4 text-gray-500">
          尚无剧情翻译信息。请添加翻译信息到{' '}
          <a href={Paths.repo('data/eventStories.data.ts')}>
            data/eventStories.data.ts
          </a>{' '}
          的 data[{id}] 。
        </div>
      )}
    </>
  )
}

const EventStoryEpisodeList = ({
  event,
}: {
  event: NonNullable<APIResponseOf<'EventStory'>>
}) => {
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
          alt="Album art"
        />
      </div>
      <Group>
        {event.episodes.map((item, key) => (
          <Button
            key={key}
            color={selectedStoryId === item.storyId ? 'green' : 'blue'}
            onClick={() => {
              setSelectedStoryId(item.storyId)
            }}
          >
            第 {item.episode} 章
          </Button>
        ))}
      </Group>
      {StoryData ? (
        <EventEpisodeDetail story={StoryData} />
      ) : (
        <div className="text-gray-500 text-center">加载中。</div>
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
