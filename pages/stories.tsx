import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { Grid, Tabs } from '@mantine/core'
import Button from '../components/vendor/Button'
import _range from 'lodash/range'

import Layout from '../components/Layout'
import StoriesItem from '../components/StoriesItem'
import { tryToNumber, updateRoute } from '../rtUtils'

import { Series, Episodes } from '../data/stories'
import StoriesData from '../data/stories.data'

const Stories = () => {
  const router = useRouter()

  const [series, setSeries] = useState(0)
  const [season, setSeason] = useState(1)
  const [chapter, setChapter] = useState(1)

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
      setSeason(_season)
      setChapter(_chapter)
    }
  }, [router])

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
      <h2>剧情</h2>
      <Grid gutter={20} className="my-3">
        <Grid.Col xs={12} lg={6}>
          <Tabs>
            {Series.map((seriesSlug, seriesKey) => (
              <Tabs.Tab label={Episodes[seriesSlug][0]} key={seriesKey}>
                <div className="max-h-[60vh] overflow-y-auto">
                  {Episodes[seriesSlug][1].map(
                    (episodeLengthInSeason, seasonKey) => (
                      <div key={seasonKey}>
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
                                variant="subtle"
                                compact
                                color={
                                  completion?.[seriesSlug]?.[seasonKey]?.[
                                    chapterKey
                                  ]
                                    ? 'blue'
                                    : 'teal'
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
                      </div>
                    )
                  )}
                </div>
              </Tabs.Tab>
            ))}
          </Tabs>
        </Grid.Col>
        <Grid.Col xs={12} lg={6}>
          <StoriesItem
            series={Series[series]}
            season={season}
            chapter={chapter}
          />
        </Grid.Col>
      </Grid>
    </Layout>
  )
}

export default Stories
