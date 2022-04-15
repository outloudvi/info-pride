import type { Card } from '../utils/wikiPages/cards'
import type { IdolName } from '../data/idols'
import CardStoriesData from '../data/cardStories.data'

import { Colors } from '../data/colors'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

import Paths from '../utils/paths'
import { toVideoLink } from './ExternalVideo'

export const Props = ({
  cardType,
  vocTop,
  danTop,
  visTop,
  staTop,
}: Pick<Card, 'cardType' | 'vocTop' | 'danTop' | 'visTop' | 'staTop'>) => {
  return (
    <Box>
      <span className="mr-3" style={{ color: Colors.Vocal }}>
        {cardType === '歌唱' ? <b>{vocTop}</b> : <span>{vocTop}</span>}
      </span>
      <span className="mr-3" style={{ color: Colors.Dance }}>
        {cardType === '舞蹈' ? <b>{danTop}</b> : <span>{danTop}</span>}
      </span>
      <span className="mr-3" style={{ color: Colors.Visual }}>
        {cardType === '表演' ? <b>{visTop}</b> : <span>{visTop}</span>}
      </span>
      <span className="mr-3" style={{ color: Colors.Stamina }}>
        {staTop}
      </span>
    </Box>
  )
}

const CardStories = ({
  idolName,
  cardNumber,
}: {
  idolName: IdolName
  cardNumber: number
}) => {
  const stories = CardStoriesData?.[idolName]?.[cardNumber]

  if (!stories) {
    return (
      <div className="mb-2 text-gray-500">
        尚无剧情翻译信息。请添加翻译信息到{' '}
        <a href={Paths.repo('data/cardStories.data.ts')}>
          data/cardStories.data.ts
        </a>{' '}
        的 data[
        {idolName}][{cardNumber}] 。
      </div>
    )
  }

  return (
    <Box className="mb-2">
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        {[1, 2, 3].map((id) => {
          const _id = id as unknown as 1 | 2 | 3
          const storyName = ['', 'TODO'].includes(stories[_id].name)
            ? `剧情第${_id}话`
            : `${_id} - ${stories[_id].name}`
          return (
            <Button
              key={id}
              component="a"
              href={toVideoLink(stories[_id].video)}
              target="_blank"
              rel="noopener"
            >
              {storyName}
            </Button>
          )
        })}
        {stories.phone && (
          <Button
            component="a"
            href={toVideoLink(stories.phone.video)}
            target="_blank"
            rel="noopener"
          >
            来电
          </Button>
        )}
      </ButtonGroup>
    </Box>
  )
}

const CardItem = ({
  card,
  idolName,
  cardNumber,
}: {
  card: Card
  idolName: IdolName
  cardNumber: number
}) => {
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
      <Props
        cardType={prop}
        vocTop={vocTop}
        danTop={danTop}
        visTop={visTop}
        staTop={staTop}
      />
      <br />

      <CardStories idolName={idolName} cardNumber={cardNumber} />

      <Button
        variant="outlined"
        component="a"
        href={Paths.wiki(`${idolName}/卡牌/${cardNumber}`)}
        target="_blank"
        rel="noopener"
      >
        Wiki 页面
      </Button>
    </>
  )
}

export default CardItem
