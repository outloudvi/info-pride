import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Grid, NativeSelect, Skeleton } from '@mantine/core'
import _range from 'lodash/range'

import useIpSWR from '../utils/useIpSWR'
import { Colors } from '../data/colors'
import { APIResponseOf, UnArray } from '../utils/api'

const NotemapGraph = dynamic(() => import('../components/NotemapGraph'), {
  ssr: false,
})

const NotemapPage = ({
  ChartListData,
}: {
  ChartListData: APIResponseOf<'MusicChartList'>
}) => {
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
    <>
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
    </>
  )
}

const SkeletonNotemapPage = () => {
  const { data: ChartListData } = useIpSWR('MusicChartList')

  return ChartListData ? (
    <NotemapPage ChartListData={ChartListData} />
  ) : (
    <Skeleton height={600} />
  )
}

export default SkeletonNotemapPage
