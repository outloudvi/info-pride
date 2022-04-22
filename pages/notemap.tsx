import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { Grid, NativeSelect } from '@mantine/core'
import _range from 'lodash/range'

import Layout from '../components/Layout'
import { Notemap, Songs } from '../utils/dataset'
import { Colors } from '../data/colors'

const NotemapGraph = dynamic(() => import('../components/NotemapGraph'), {
  ssr: false,
})

const NotemapPage = () => {
  const songList = Object.keys(Notemap)
  const songTitleList = useMemo(() => {
    const songSlugToName: Record<string, string> = {}
    Object.values(Songs).map((x) => {
      songSlugToName[x.slug] = x.name
    })
    return songSlugToName
  }, [])
  const [song, setSong] = useState<string>(songList[0])
  const notemapList = song !== undefined ? Object.keys(Notemap[song]) : []
  const [notemap, setNotemap] = useState<string>(notemapList[0])
  const selectedNotemap = song && notemap ? Notemap[song][notemap] : undefined

  useEffect(() => {
    // update notemap after switching songs
    setNotemap(notemapList[0])
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
              data={songList.map((item) => ({
                label: songTitleList[item],
                value: item,
              }))}
              value={song}
              onChange={(i) => {
                setSong(i.target.value)
              }}
              required
            />
            <NativeSelect
              label="谱面"
              data={notemapList}
              value={notemap}
              onChange={(i) => {
                setNotemap(i.target.value)
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
          {selectedNotemap !== undefined && (
            <NotemapGraph notemap={selectedNotemap} laneColors={laneColors} />
          )}
        </Grid.Col>
      </Grid>
    </Layout>
  )
}

export default NotemapPage
