import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import _range from 'lodash/range'
import Grid from '@mui/material/Grid'

import { Notemap, Songs } from '../utils/dataset'
import Layout from '../components/Layout'

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

  return (
    <Layout>
      <Typography variant="h2">谱面</Typography>
      <Grid container spacing={2} className="my-3">
        <Grid item xs={12} lg={6}>
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
              <MenuItem value=""></MenuItem>
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
              <MenuItem value=""></MenuItem>
              {notemapList.map((item, key) => (
                <MenuItem key={key} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={6}>
          {selectedNotemap !== undefined && (
            <NotemapGraph notemap={selectedNotemap} />
          )}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default NotemapPage
