import useSWR from 'swr'
import * as Sentry from '@sentry/browser'

import { StoriesTitle } from '../utils/dataset'
import Paths from '../utils/paths'
import { Episodes, SeriesName } from '../data/stories'
import StoriesData, { SubTitles } from '../data/stories.data'
import { APIResponseOf } from '../utils/api'

import { toVideoLink } from './ExternalVideo'

type PropType = {
  // "Special" won't appear here
  series: Exclude<SeriesName, 'Special'>
  season: number
  chapter: number
}

function getBackendStoryId(props: PropType): string {
  const { series, season, chapter } = props
  const Prefix: Record<SeriesName, string> = {
    Hoshimi: 'st-original-cmn',
    Tokyo: 'st-main-cmn',
    TRINITYAiLE: 'st-group-tri',
    LizNoir: 'st-group-liz',
    Mana: 'st-group-mna',
    Special: '',
  }
  return [
    Prefix[series],
    '01',
    String(season).padStart(2, '0'),
    String(chapter).padStart(2, '0'),
  ].join('-')
}

function findSubtitle({ series, season, chapter }: PropType): string | null {
  const subTitlesList = SubTitles?.[series]?.[season]
  if (!subTitlesList) return null
  let ret: string | null = null
  for (const i of Object.keys(subTitlesList)
    .map(Number)
    .sort((a, b) => a - b)) {
    if (chapter >= i) {
      ret = subTitlesList[i]
    } else {
      break
    }
  }
  return ret
}

export const SpecialStoriesItem = (props: {
  series: 'Special'
  season: number
  chapter: number
}) => {
  const { series, season, chapter } = props
  const data = StoriesData?.[series]?.[season]?.[chapter]!
  return (
    <>
      <div className="text-4xl">{data.name}</div>

      <p>
        <a href={toVideoLink(data.video)} target="_blank" rel="noopener">
          视频
        </a>
      </p>
    </>
  )
}

const StoriesItem = (props: PropType) => {
  const { series, season, chapter } = props

  const { data: StoryData } = useSWR<APIResponseOf<'Story'>>(
    `/Story?id=${getBackendStoryId(props)}`
  )

  const data = StoriesData?.[series]?.[season]?.[chapter]
  const subtitle = StoryData?.sectionName ?? findSubtitle(props)

  const cnTitle = data?.name && data.name !== 'TODO' ? data.name : null
  const jaTitle =
    StoryData?.name.replace(/\n/g, '') ?? StoriesTitle[series][season][chapter]

  // Report data inconsistencies
  if (
    StoriesTitle[series][season][chapter] &&
    StoryData?.name &&
    StoriesTitle[series][season][chapter] !== StoryData.name.replace(/\n/g, '')
  ) {
    Sentry.captureMessage(
      `[INFOP] StoriesTitle data inconsistency at StoriesTitle[${series}][${season}][${chapter}] == ${
        StoriesTitle[series][season][chapter]
      } != ${StoryData.name.replace(/\n/g, '')}`
    )
  }

  return (
    <>
      <div className="text-4xl">
        {Episodes[series][0]}
        {season}章 - {chapter}
      </div>

      <div className="text-2xl">{subtitle}</div>
      <br />
      <div className="text-xl">
        {cnTitle !== null ? (
          <>
            <span>{cnTitle}</span> /{' '}
            <small>
              <span lang="ja">{jaTitle}</span>
            </small>
          </>
        ) : (
          <span lang="ja">{jaTitle}</span>
        )}
      </div>
      {StoryData && (
        <div>
          <p lang="ja">{StoryData.description}</p>
        </div>
      )}
      {data && (
        <p>
          <a href={toVideoLink(data.video)} target="_blank" rel="noopener">
            视频
          </a>
        </p>
      )}

      {(data === undefined || cnTitle === null) && (
        <div className="mt-4 text-gray-500">
          尚无{data === undefined ? '剧情' : '标题'}翻译信息。请添加翻译信息到{' '}
          <a href={Paths.repo('data/stories.data.ts')}>data/stories.data.ts</a>{' '}
          的 StoriesData[{series}][{season}][{chapter}] 。
        </div>
      )}
    </>
  )
}

export default StoriesItem
