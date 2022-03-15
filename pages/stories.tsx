import { useMemo, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import _range from 'lodash/range'
import Grid from '@mui/material/Grid'
import StoriesItem from '../components/StoriesItem'

import { Series, Episodes } from '../data/stories'
import StoriesData from '../data/stories.data'
import Layout from '../components/Layout'

const Stories = () => {
  const [series, setSeries] = useState(0)
  const [episode, setEpisode] = useState(1)
  const [chapter, setChapter] = useState(1)
  const [openedSeries, setOpenedSeries] = useState(0)

  const completion = useMemo(() => {
    const ret: any = {}
    for (let i = 0; i < Series.length; i++) {
      const seriesSlug = Series[i]
      ret[seriesSlug] = Episodes[seriesSlug][1].map((length, episodeKey) =>
        _range(1, length + 1).map((chapterId) =>
          Boolean(StoriesData?.[seriesSlug]?.[episodeKey + 1]?.[chapterId])
        )
      )
    }
    console.log(ret)
    return ret
  }, [])

  return (
    <Layout>
      <Typography variant="h2">剧情</Typography>
      <Grid container spacing={2} className="my-3">
        <Grid item xs={12} lg={6}>
          <Tabs
            value={openedSeries}
            onChange={(_, value) => {
              setOpenedSeries(value)
            }}
            aria-label="tabs of story chapters"
          >
            {Series.map((name, seriesKey) => (
              <Tab
                key={seriesKey}
                id={`tab-${seriesKey}`}
                label={Episodes[name][0]}
                aria-controls={`tabpanel-${seriesKey}`}
              />
            ))}
          </Tabs>
          {Series.map((seriesSlug, seriesKey) => (
            <div
              key={seriesKey}
              role="tabpanel"
              hidden={openedSeries !== seriesKey}
              id={`tabpanel-${seriesKey}`}
              aria-labelledby={`tab-${seriesKey}`}
            >
              {openedSeries === seriesKey && (
                <Box className="max-h-[60vh] overflow-y-auto">
                  {Episodes[seriesSlug][1].map((episodeLength, episodeKey) => (
                    <Box key={episodeKey}>
                      <p>
                        {Episodes[seriesSlug][0]} 第{episodeKey + 1}章
                      </p>
                      {_range(1, episodeLength + 1).map(
                        (chapterNum, chapterKey) => {
                          const currentSelection =
                            series === seriesKey &&
                            episode === episodeKey + 1 &&
                            chapter === chapterNum
                          return (
                            <Button
                              variant="text"
                              size="small"
                              color={
                                completion?.[seriesSlug]?.[episodeKey]?.[
                                  chapterKey
                                ]
                                  ? 'primary'
                                  : 'secondary'
                              }
                              key={chapterKey}
                              onClick={() => {
                                setSeries(seriesKey)
                                setEpisode(episodeKey + 1)
                                setChapter(chapterNum)
                              }}
                              disabled={currentSelection}
                            >
                              {episodeKey + 1}-{chapterNum}
                            </Button>
                          )
                        }
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </div>
          ))}
        </Grid>
        <Grid item xs={12} lg={6}>
          <StoriesItem
            series={Series[series]}
            episode={episode}
            chapter={chapter}
          />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Stories
