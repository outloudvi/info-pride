import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Episodes, SeriesName } from '../data/stories'
import StoriesData, { SubTitles } from '../data/stories.data'
import { toVideoLink } from './ExternalVideo'

type PropType = {
  series: SeriesName
  episode: number
  chapter: number
}

function findSubtitle({ series, episode, chapter }: PropType): string | null {
  const subTitlesList = SubTitles?.[series]?.[episode]
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
  const { series, episode, chapter } = props
  const data = StoriesData?.[series]?.[episode]?.[chapter]
  const subtitle = findSubtitle(props)

  return data === undefined ? (
    <p>数据尚未收录 :D</p>
  ) : (
    <>
      <Typography
        sx={{
          fontSize: '2.3rem',
        }}
      >
        {Episodes[series][0]}
        {episode}章
      </Typography>
      <Typography
        sx={{
          fontSize: '1.5rem',
        }}
      >
        {subtitle}
      </Typography>
      <br />
      <Typography
        sx={{
          fontSize: '1.3rem',
        }}
      >
        {data.name}
      </Typography>
      <p>
        <Link href={toVideoLink(data.video)} target="_blank" rel="noopener">
          视频
        </Link>
      </p>
    </>
  )
}

export default StoriesItem
