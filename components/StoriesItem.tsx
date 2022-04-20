import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Episodes, SeriesName } from '../data/stories'
import StoriesData, { SubTitles } from '../data/stories.data'
import { StoriesTitle } from '../utils/dataset'

import Paths from '../utils/paths'
import { toVideoLink } from './ExternalVideo'

type PropType = {
  series: SeriesName | 'Special'
  season: number
  chapter: number
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

const SpecialStoriesItem = (props: PropType) => {
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
  if (series === 'Special') {
    return <SpecialStoriesItem {...props} />
  }
  const data = StoriesData?.[series]?.[season]?.[chapter]
  const subtitle = findSubtitle(props)

  const cnTitle = data?.name && data.name !== 'TODO' ? data.name : null
  const jaTitle = StoriesTitle[series][season][chapter]

  return (
    <>
      <Typography className="text-4xl">
        {Episodes[series][0]}
        {season}章 - {chapter}
      </Typography>

      <Typography className="text-2xl">{subtitle}</Typography>
      <br />
      <Typography className="text-xl">
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
      </Typography>
      {data && (
        <p>
          <Link href={toVideoLink(data.video)} target="_blank" rel="noopener">
            视频
          </Link>
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
