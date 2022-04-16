import { useEffect, useState } from 'react'
import rfdc from 'rfdc'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import { Cards } from '../utils/dataset'
import Layout from '../components/Layout'
import { Card } from '../utils/wikiPages/cards'
import { idolNameToSlug } from '../data/idols'

const clone = rfdc({
  proto: true,
})

export const LOCALSTORAGE_BOX_TAG = 'localBox'
export type LocalBox = Record<string, boolean[]>

const SettingsPage = () => {
  const [localBox, setLocalBox] = useState<LocalBox>({})

  useEffect(() => {
    try {
      const boxJson = localStorage.getItem(LOCALSTORAGE_BOX_TAG)
      if (boxJson === null) return
      const box = JSON.parse(boxJson)
      setLocalBox(box)
    } catch (_) {
      //
    }
  }, [])

  const updateLocalBox = (slug: string, id: number, have: boolean) => {
    const thisBox = clone(localBox)
    if (!thisBox[slug]) thisBox[slug] = []
    thisBox[slug][id] = have
    setLocalBox(thisBox)
  }

  const saveLocalBox = () => {
    if (!window.localStorage) {
      alert('此浏览器不支持 localStorage。请升级至更新的浏览器以保存设置。')
      return
    }
    localStorage.setItem(LOCALSTORAGE_BOX_TAG, JSON.stringify(localBox))
  }

  return (
    <Layout>
      <Typography variant="h2">设置</Typography>
      <h3>我的 box</h3>
      <p>在此设置 box 后，搜索时将会显示卡片的持有状态。</p>
      <Grid container rowSpacing={2} columnSpacing={2}>
        {Object.entries(Cards).map(([name, _], _key) => (
          <Grid key={_key} item xs={12} lg={3} className="rounded">
            <b>{name}</b>
            <FormGroup>
              {Object.values(Cards[name as keyof typeof Cards]).map(
                (card: Card, __key) => (
                  <FormControlLabel
                    key={__key}
                    control={
                      <Checkbox
                        checked={Boolean(
                          localBox?.[idolNameToSlug(card.ownerName)!]?.[
                            card.ownerId
                          ]
                        )}
                        onChange={(e) => {
                          updateLocalBox(
                            idolNameToSlug(card.ownerName)!,
                            card.ownerId,
                            e.target.checked
                          )
                        }}
                      />
                    }
                    label={
                      <>
                        <span>{card.nameCn}</span> <br />
                        <small>{card.nameJa}</small>
                      </>
                    }
                    className="my-1"
                  />
                )
              )}
            </FormGroup>
          </Grid>
        ))}
      </Grid>
      <Button variant="outlined" onClick={() => saveLocalBox()}>
        保存
      </Button>
    </Layout>
  )
}

export default SettingsPage
