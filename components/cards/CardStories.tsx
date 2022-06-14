import { Button } from '@mantine/core'

import { toVideoLink } from '#components/ExternalVideo'
import Paths from '#utils/paths'
import { Stories } from '#data/types'

const CardStories = ({ stories }: { stories: Stories | null }) => {
  if (stories === null) {
    return (
      <div className="mb-2 text-gray-500">
        尚无剧情翻译信息。请添加翻译信息到{' '}
        <a href={Paths.repo('data/cardStories.data.ts')}>
          data/cardStories.data.ts
        </a>
        。
      </div>
    )
  }
  return (
    <div className="mb-2">
      {[1, 2, 3].map((id) => {
        const _id = id as unknown as 1 | 2 | 3
        const storyName = ['', 'TODO'].includes(stories[_id].name)
          ? `剧情第${_id}话`
          : `${_id} - ${stories[_id].name}`
        return (
          <Button
            key={id}
            component="a"
            href={toVideoLink(stories[_id].video)}
            target="_blank"
            rel="noopener"
            className="mr-2"
          >
            {storyName}
          </Button>
        )
      })}
      {stories.phone && (
        <Button
          component="a"
          href={toVideoLink(stories.phone.video)}
          target="_blank"
          rel="noopener"
        >
          来电
        </Button>
      )}
    </div>
  )
}

export default CardStories
