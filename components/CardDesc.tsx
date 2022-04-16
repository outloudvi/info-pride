import type { Card } from '../utils/wikiPages/cards'

import Grid from '@mui/material/Grid'

import Paths from '../utils/paths'
import { Props } from './CardItem'
import Link from 'next/link'
import { idolNameToSlug } from '../data/idols'

const SkillDesc = ({
  name,
  desc,
  type,
  highlight,
}: {
  name: string
  desc: string
  type: 'A' | 'SP' | 'P'
  highlight: boolean
}) => (
  <div
    className={'basis-0 p-1 rounded grow' + (highlight ? ' bg-yellow-200' : '')}
  >
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

const CardDesc = ({
  card,
  highlightSkills,
  owned,
}: {
  card: Card
  highlightSkills: number[]
  owned: boolean
}) => {
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
        <div className="float-right text-right">
          <Link href={Paths.wiki(`${ownerName}/卡牌/${ownerId}`)}>
            <a target="_blank" rel="noopener">
              Wiki 页面
            </a>
          </Link>
          <br />
          <Link href={`/cards/${idolNameToSlug(ownerName)}/${ownerId}`}>
            <a rel="noopener">卡片页面</a>
          </Link>
        </div>

        <div>
          <b>{nameCn}</b> / <small lang="ja">{nameJa}</small>
          {owned && <span className="bg-orange-200 ml-2 px-1">已持有</span>}
          <br />
          {ownerName} / {type} / {prop} / {rarity}★
        </div>
        <Props
          cardType={prop}
          vocTop={vocTop}
          danTop={danTop}
          visTop={visTop}
          staTop={staTop}
        />
      </div>
      <Grid container spacing={2} className="mt-1">
        <Grid item xs={12} lg={4}>
          <SkillDesc
            name={ski1NameCn}
            type={ski1Typ}
            desc={ski1DescCn}
            highlight={highlightSkills.includes(0)}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <SkillDesc
            name={ski2NameCn}
            type={ski2Typ}
            desc={ski2DescCn}
            highlight={highlightSkills.includes(1)}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <SkillDesc
            name={ski3NameCn}
            type={ski3Typ}
            desc={ski3DescCn}
            highlight={highlightSkills.includes(2)}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default CardDesc
