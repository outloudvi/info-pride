import type { Card } from '../utils/wikiPages/cards'

import { Colors } from '../data/colors'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paths from '../utils/paths'

const Status = ({
  vocTop,
  danTop,
  visTop,
  staTop,
}: Pick<Card, 'vocTop' | 'danTop' | 'visTop' | 'staTop'>) => (
  <Box>
    <span className="mr-3" style={{ color: Colors.Vocal }}>
      {vocTop}
    </span>
    <span className="mr-3" style={{ color: Colors.Dance }}>
      {danTop}
    </span>
    <span className="mr-3" style={{ color: Colors.Visual }}>
      {visTop}
    </span>
    <span className="mr-3" style={{ color: Colors.Stamina }}>
      {staTop}
    </span>
  </Box>
)

const CardItem = ({ card, slug }: { card: Card; slug: string }) => {
  const {
    type,
    rarity,
    prop,
    ski1Typ,
    ski2Typ,
    ski3Typ,
    vocTop,
    danTop,
    visTop,
    staTop,
    nameCn,
    nameJa,
  } = card

  return (
    <>
      <div className="text-4xl mb-2" lang="zh-CN">
        {nameCn}
      </div>
      <div className="text-xl mb-2" lang="ja">
        {nameJa}
      </div>
      <div>
        {type} / {prop} / {rarity}★
      </div>
      <br />
      <Status vocTop={vocTop} danTop={danTop} visTop={visTop} staTop={staTop} />
      <br />
      <Button
        variant="outlined"
        component="a"
        href={Paths.wiki(slug)}
        target="_blank"
        rel="noopener"
      >
        Wiki 页面
      </Button>
    </>
  )
}

export default CardItem
