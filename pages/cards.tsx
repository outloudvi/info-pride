import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import { Cards } from '../utils/dataset'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import _range from 'lodash/range'
import Layout from '../components/Layout'
import CardItem from '../components/CardItem'

import { tryToNumber, updateRoute } from '../rtUtils'
import type { TheRootSchema } from '../utils/wikiPages/cards'
import { idolNameToSlug, idolSlugToName } from '../data/idols'

type IdolName = keyof TheRootSchema

const CardPage = () => {
  const router = useRouter()

  const idolList = Object.keys(Cards) as IdolName[]
  const [idol, setIdol] = useState<IdolName>(idolList[0])
  const cardList = Cards[idol]
  const [cardSlug, setCardSlug] = useState('')

  useEffect(() => {
    if (!router.isReady) return
    const { idol, slug } = router.query

    if (idol === undefined) return
    if (Array.isArray(idol)) return
    const maybeIdolName = idolSlugToName(idol.toLowerCase())
    if (!maybeIdolName) return
    setIdol(maybeIdolName)

    if (tryToNumber(slug) !== null) {
      const cardId = tryToNumber(slug)
      setCardSlug(cardId)
    }
  }, [router])

  return (
    <Layout>
      <Typography variant="h2">卡片</Typography>
      <Grid container spacing={2} className="my-3">
        <Grid item xs={12} lg={6}>
          <Box>
            <FormControl fullWidth className="mb-3">
              <InputLabel id="lIdol">偶像</InputLabel>
              <Select
                labelId="lIdol"
                value={idol}
                label="偶像"
                onChange={(i) => {
                  setIdol(i.target.value as IdolName)
                }}
              >
                {idolList.map((item, key) => (
                  <MenuItem key={key} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <List>
              {Object.entries(cardList).map(([slug, card], key) => (
                <ListItem key={key} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setCardSlug(slug)
                      const cardId = slug.split('/').reverse()[0]
                      updateRoute(`/cards/${idolNameToSlug(idol)}/${cardId}`)
                    }}
                  >
                    <ListItemText>
                      <span lang="zh-CN">
                        [{card.type}] {card.nameCn}
                        <br />
                        <span className="text-sm text-gray-600" lang="ja">
                          {card.nameJa}
                        </span>
                      </span>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          {cardList[cardSlug] && (
            <CardItem card={cardList[cardSlug]} slug={cardSlug} />
          )}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default CardPage
