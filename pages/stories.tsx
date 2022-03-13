import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import _range from 'lodash/range'
import Grid from '@mui/material/Grid'
import StoriesItem from '../components/StoriesItem'

import { SeriesName, Series, Episodes } from '../data/stories'

const Stories = () => {
  const [series, setSeries] = useState<SeriesName | ''>(Series[0])
  const episodeLength = series === '' ? 0 : Episodes[series][1].length
  const [episode, setEpisode] = useState<number>(1)
  const chapterLength =
    series === '' || episode === 0 ? 0 : Episodes[series][1][episode - 1]
  const [chapter, setChapter] = useState<number>(1)

  return (
    <Container className="mt-3">
      <Typography variant="h2">剧情</Typography>
      <Grid container spacing={2} className="my-3">
        <Grid item xs={12} lg={4}>
          <FormControl fullWidth>
            <InputLabel id="lSeries">系列</InputLabel>
            <Select
              labelId="lSeries"
              value={series}
              label="系列"
              onChange={(i) => {
                setSeries(i.target.value as SeriesName)
                setEpisode(1)
                setChapter(1)
              }}
            >
              {Series.map((item, key) => (
                <MenuItem key={key} value={item}>
                  {Episodes[item][0]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={4}>
          <FormControl fullWidth>
            <InputLabel id="lEpisode">章节</InputLabel>
            <Select
              labelId="lEpisode"
              value={episode}
              label="章节"
              onChange={(i) => {
                setEpisode(Number(i.target.value))
                setChapter(1)
              }}
            >
              {_range(1, episodeLength + 1).map((item, key) => (
                <MenuItem key={key} value={item}>
                  第{item}章
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={4}>
          <FormControl fullWidth>
            <InputLabel id="lChapter">话数</InputLabel>
            <Select
              labelId="lChapter"
              value={chapter}
              label="话数"
              onChange={(i) => {
                setChapter(Number(i.target.value))
              }}
            >
              {_range(1, chapterLength + 1).map((item, key) => (
                <MenuItem key={key} value={item}>
                  第{item}话
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {series !== '' && episode > 0 && chapter > 0 && (
        <StoriesItem series={series} episode={episode} chapter={chapter} />
      )}
    </Container>
  )
}

export default Stories
