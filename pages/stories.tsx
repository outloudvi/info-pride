import { useEffect, useMemo, useState } from 'react'
import { Button, Grid, Tabs } from '@mantine/core'
import _range from 'lodash/range'

import Layout from '../components/Layout'
import StoriesItem, { SpecialStoriesItem } from '../components/StoriesItem'
import { tryToNumber } from '../rtUtils'
import { Episodes, Series } from '../data/stories'
import StoriesData from '../data/stories.data'
import useStateWithHash from '../utils/useStateWithHash'

const Stories = () => {
  const [series, setSeries] = useStateWithHash(0, {
    name: 'series',
    serialize: String,
    deserialize: Number,
  })
  const [season, setSeason] = useStateWithHash(1, {
    name: 'season',
    serialize: String,
    deserialize: Number,
  })
  const [chapter, setChapter] = useStateWithHash(1, {
    name: 'chapter',
    serialize: String,
    deserialize: Number,
  })
  const seriesName = Series[series]

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
            {Series.filter((x) => x !== 'Special').map(
              (seriesSlug, seriesKey) => (
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
              )
            )}
            <Tabs.Tab label="其它">
              <div className="max-h-[60vh] overflow-y-auto">
                {Object.entries(StoriesData.Special![1]).map(
                  ([chapterId, chapterItem], key) => {
                    const seriesKey = Series.indexOf('Special')
                    const chapterNum = Number(chapterId)
                    const currentSelection =
                      series === seriesKey &&
                      season === 1 &&
                      chapter === chapterNum
                    return (
                      <Button
                        variant="subtle"
                        compact
                        key={key}
                        onClick={() => {
                          setSeries(seriesKey)
                          setSeason(1)
                          setChapter(Number(chapterId))
                        }}
                        disabled={currentSelection}
                      >
                        {chapterItem.name}
                      </Button>
                    )
                  }
                )}
              </div>
            </Tabs.Tab>
          </Tabs>
        </Grid.Col>
        <Grid.Col xs={12} lg={6}>
          {seriesName === 'Special' ? (
            <SpecialStoriesItem
              series={seriesName}
              season={season}
              chapter={chapter}
            />
          ) : (
            <StoriesItem
              series={seriesName}
              season={season}
              chapter={chapter}
            />
          )}
        </Grid.Col>
      </Grid>
    </Layout>
  )
}

export default Stories
