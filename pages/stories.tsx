import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import _range from 'lodash/range'
import Grid from '@mui/material/Grid'
import Layout from '../components/Layout'
import StoriesItem from '../components/StoriesItem'

import { Series, Episodes } from '../data/stories'
import StoriesData from '../data/stories.data'
import { tryToNumber, updateRoute } from '../rtUtils'

const Stories = () => {
  const router = useRouter()

  const [series, setSeries] = useState(0)
  const [season, setSeason] = useState(1)
  const [chapter, setChapter] = useState(1)
  const [openedSeries, setOpenedSeries] = useState(0)

  useEffect(() => {
    if (!router.isReady) return
    const { series, season, chapter } = router.query
    const _series =
      series &&
      !Array.isArray(series) &&
      Series.map((x) => x.toLowerCase()).indexOf(series.toLowerCase())
    const _season = tryToNumber(season)
    const _chapter = tryToNumber(chapter)
    if (_series && _series !== -1 && _season && _chapter) {
      setSeries(_series)
      setOpenedSeries(_series)
      setSeason(_season)
      setChapter(_chapter)
    }
  }, [router])

  console.log(series, season, chapter)

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
                  {Episodes[seriesSlug][1].map(
                    (episodeLengthInSeason, seasonKey) => (
                      <Box key={seasonKey}>
                        <p>
                          {Episodes[seriesSlug][0]} 第{seasonKey + 1}章
                        </p>
                        {_range(1, episodeLengthInSeason + 1).map(
                          (chapterNum, chapterKey) => {
                            const currentSelection =
                              series === seriesKey &&
                              season === seasonKey + 1 &&
                              chapter === chapterNum
                            return (
                              <Button
                                variant="text"
                                size="small"
                                color={
                                  completion?.[seriesSlug]?.[seasonKey]?.[
                                    chapterKey
                                  ]
                                    ? 'primary'
                                    : 'secondary'
                                }
                                key={chapterKey}
                                onClick={() => {
                                  setSeries(seriesKey)
                                  setSeason(seasonKey + 1)
                                  setChapter(chapterNum)
                                  updateRoute(
                                    `/stories/${Series[seriesKey]}/${
                                      seasonKey + 1
                                    }/${chapterNum}`
                                  )
                                }}
                                disabled={currentSelection}
                              >
                                {seasonKey + 1}-{chapterNum}
                              </Button>
                            )
                          }
                        )}
                      </Box>
                    )
                  )}
                </Box>
              )}
            </div>
          ))}
        </Grid>
        <Grid item xs={12} lg={6}>
          <StoriesItem
            series={Series[series]}
            season={season}
            chapter={chapter}
          />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Stories
