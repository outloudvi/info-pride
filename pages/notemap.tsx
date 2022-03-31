import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

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

  const [laneColors, setLaneColors] = useState<string[]>([
    'blue',
    'blue',
    'blue',
    'blue',
    'blue',
  ])

  return (
    <Layout>
      <Typography variant="h2">谱面</Typography>
      <Grid container spacing={2} className="my-3">
        <Grid item xs={12} lg={6}>
          <Box>
            <FormControl fullWidth className="mb-3">
              <InputLabel id="lSong">曲目</InputLabel>
              <Select
                labelId="lSong"
                value={song}
                label="系列"
                onChange={(i) => {
                  setSong(i.target.value)
                  setNotemap('')
                }}
              >
                {songList.map((item, key) => (
                  <MenuItem key={key} value={item}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: songTitleList[item],
                      }}
                    ></span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="lNotemap">谱面</InputLabel>
              <Select
                labelId="lNotemap"
                value={notemap}
                label="谱面"
                onChange={(i) => {
                  setNotemap(i.target.value)
                }}
              >
                {notemapList.map((item, key) => (
                  <MenuItem key={key} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className="mt-4 flex justify-around">
            {_range(0, 5).map((val, key) => {
              const uiNumber = val + 1
              return (
                <FormControl key={key}>
                  <InputLabel id={`lColColor${uiNumber}`}>
                    颜色{uiNumber}
                  </InputLabel>
                  <Select
                    labelId={`lColColor${uiNumber}`}
                    value={laneColors[val]}
                    label={`颜色${uiNumber}`}
                    onChange={(i) => {
                      setLaneColors([
                        ...laneColors.slice(0, val),
                        i.target.value,
                        ...laneColors.slice(val + 1),
                      ])
                    }}
                  >
                    {Object.entries(Colors).map(([name, value], key) => (
                      <MenuItem key={key} value={value}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )
            })}
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          {selectedNotemap !== undefined && (
            <NotemapGraph notemap={selectedNotemap} laneColors={laneColors} />
          )}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default NotemapPage
