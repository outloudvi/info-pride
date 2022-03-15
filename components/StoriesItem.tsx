import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Episodes, SeriesName } from '../data/stories'
import StoriesData, { SubTitles } from '../data/stories.data'
import { toVideoLink } from './ExternalVideo'

type PropType = {
  series: SeriesName
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

const StoriesItem = (props: PropType) => {
  const { series, season, chapter } = props
  const data = StoriesData?.[series]?.[season]?.[chapter]
  const subtitle = findSubtitle(props)

  return (
    <>
      <Typography className="text-4xl">
        {Episodes[series][0]}
        {season}章 - {chapter}
      </Typography>
      {data === undefined ? (
        <p>数据尚未收录 :D</p>
      ) : (
        <>
          <Typography className="text-2xl">{subtitle}</Typography>
          <br />
          <Typography className="text-xl">{data.name}</Typography>
          <p>
            <Link href={toVideoLink(data.video)} target="_blank" rel="noopener">
              视频
            </Link>
          </p>
        </>
      )}
    </>
  )
}

export default StoriesItem
