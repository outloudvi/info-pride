import type { Card } from '../utils/wikiPages/cards'

import Grid from '@mui/material/Grid'

import Paths from '../utils/paths'
import { Props } from './CardItem'

const SkillDesc = ({
  name,
  desc,
  type,
}: {
  name: string
  desc: string
  type: 'A' | 'SP' | 'P'
}) => (
  <div className="basis-0 grow">
    <span>
      {name} / {type}
    </span>{' '}
    <br />
    <span
      dangerouslySetInnerHTML={{
        __html: desc.replace(/\n+/g, '<br/>'),
      }}
    ></span>
  </div>
)

const CardItem = ({ card }: { card: Card }) => {
  const {
    type,
    rarity,
    prop,
    ski1NameCn,
    ski1DescCn,
    ski1Typ,
    ski2NameCn,
    ski2DescCn,
    ski2Typ,
    ski3NameCn,
    ski3DescCn,
    ski3Typ,
    vocTop,
    danTop,
    visTop,
    staTop,
    nameCn,
    nameJa,
    ownerName,
    ownerId,
  } = card

  return (
    <div className="my-1 rounded-md border-solid border-6 border-gray-400 p-2">
      <div>
        <div>
          <b>{nameCn}</b> / <small lang="ja">{nameJa}</small> <br />
          {ownerName} / {type} / {prop} / {rarity}★
        </div>
        <Props
          cardType={prop}
          vocTop={vocTop}
          danTop={danTop}
          visTop={visTop}
          staTop={staTop}
        />
        <a
          href={Paths.wiki(`${ownerName}/卡牌/${ownerId}`)}
          target="_blank"
          rel="noopener"
        >
          Wiki 页面
        </a>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <SkillDesc name={ski1NameCn} type={ski1Typ} desc={ski1DescCn} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <SkillDesc name={ski2NameCn} type={ski2Typ} desc={ski2DescCn} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <SkillDesc name={ski3NameCn} type={ski3Typ} desc={ski3DescCn} />
        </Grid>
      </Grid>
    </div>
  )
}

export default CardItem
