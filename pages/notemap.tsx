import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Grid, NativeSelect } from '@mantine/core'
import _range from 'lodash/range'
import useSWR, { SWRConfig } from 'swr'
import { UnwrapPromise } from '@outloudvi/hoshimi-types/helpers'
import { APIMapping } from '@outloudvi/hoshimi-types'

import Layout from '../components/Layout'
import { Colors } from '../data/colors'
import { fetchDb, UnArray } from '../utils/api'

const NotemapGraph = dynamic(() => import('../components/NotemapGraph'), {
  ssr: false,
})

const NotemapPage = () => {
  const { data: ChartListData } =
    useSWR<UnwrapPromise<ReturnType<APIMapping['MusicChartList']>>>(
      '/MusicChartList'
    )

  if (!ChartListData) {
    throw Error('Should be already populated by getServerSideProps')
  }

  const [song, setSong] = useState<UnArray<typeof ChartListData>>(
    ChartListData[0]
  )
  const chartList = song.charts
  const [chartId, setChartId] = useState<string>(chartList[0].id)

  useEffect(() => {
    // update notemap after switching songs
    setChartId(chartList[0].id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song])

  const [laneColors, setLaneColors] = useState<string[]>([
    'blue',
    'blue',
    'blue',
    'blue',
    'blue',
  ])

  return (
    <Layout>
      <h2>谱面</h2>
      <Grid gutter={20} className="my-3">
        <Grid.Col xs={12} lg={6}>
          <div>
            <NativeSelect
              label="曲目"
              data={ChartListData.map(({ musicId, title }) => ({
                value: musicId,
                label: title,
              }))}
              value={song.musicId}
              onChange={(i) => {
                const chartSongItem = ChartListData.filter(
                  (x) => x.musicId === i.target.value
                )[0]
                setSong(chartSongItem)
              }}
              required
            />
            <NativeSelect
              label="谱面"
              data={chartList.map(({ id, desc }) => ({
                label: desc,
                value: id,
              }))}
              value={chartId}
              onChange={(i) => {
                setChartId(i.target.value)
              }}
              required
            />
          </div>
          <div className="mt-4 flex justify-around">
            {_range(0, 5).map((val, key) => {
              const uiNumber = val + 1
              return (
                <NativeSelect
                  key={key}
                  label={`颜色${uiNumber}`}
                  value={laneColors[val]}
                  data={Object.entries(Colors).map(([label, value]) => ({
                    label,
                    value,
                  }))}
                  onChange={(i) => {
                    setLaneColors([
                      ...laneColors.slice(0, val),
                      i.target.value,
                      ...laneColors.slice(val + 1),
                    ])
                  }}
                />
              )
            })}
          </div>
        </Grid.Col>
        <Grid.Col xs={12} lg={6}>
          {<NotemapGraph chartId={chartId} laneColors={laneColors} />}
        </Grid.Col>
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps() {
  const musicChartList = await fetchDb('MusicChartList')()
  return {
    props: {
      fallback: {
        '/MusicChartList': musicChartList,
      },
    },
  }
}

const SWRd = ({ fallback }: { fallback: any }) => (
  <SWRConfig value={{ fallback }}>
    <NotemapPage />
  </SWRConfig>
)

export default SWRd
