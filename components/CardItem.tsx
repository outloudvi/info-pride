import { Button, Skeleton, Slider } from '@mantine/core'

import Paths from '../utils/paths'
import { toVideoLink } from './ExternalVideo'

import CardStoriesData from '../data/cardStories.data'
import type { Card, CardRarity } from '@outloudvi/hoshimi-types/ProtoMaster'
import useSWR from 'swr'
import { UnwrapPromise } from '../utils/api'
import { APIMapping } from '@outloudvi/hoshimi-types'
import { useEffect, useState } from 'react'
import { initial } from 'lodash'
import { CardType } from '@outloudvi/hoshimi-types/ProtoEnum'

export const Props = ({
  level,
  rarityInfo,
  cardParameterId,
  vocalRatioPermil,
  danceRatioPermil,
  visualRatioPermil,
  staminaRatioPermil,
}: Pick<
  Card,
  | 'cardParameterId'
  | 'vocalRatioPermil'
  | 'danceRatioPermil'
  | 'visualRatioPermil'
  | 'staminaRatioPermil'
> & { level: number; rarityInfo: CardRarity }) => {
  const { data: ParamData } =
    useSWR<UnwrapPromise<ReturnType<APIMapping['CardParameter']>>>(
      'CardParameter'
    )

  const parameterInfo = (ParamData ?? []).filter(
    (x) => x.id === cardParameterId && x.level === level
  )?.[0]

  const valueAtMaxType = Math.max(
    vocalRatioPermil,
    danceRatioPermil,
    visualRatioPermil
  )

  if (!parameterInfo) {
    return <Skeleton height={100} />
  }

  const calc = (base: number) =>
    Math.floor(
      (Math.floor((parameterInfo.value * base) / 1000) *
        rarityInfo.parameterBonusPermil) /
        1000
    )

  const stamina = Math.floor(
    (Math.floor((parameterInfo.staminaValue * staminaRatioPermil) / 1000) *
      rarityInfo.parameterBonusPermil) /
      1000
  )

  return (
    <div>
      <span className="mr-3 text-vocal">
        {vocalRatioPermil === valueAtMaxType ? (
          <b>{calc(vocalRatioPermil)}</b>
        ) : (
          <span>{calc(vocalRatioPermil)}</span>
        )}
      </span>
      <span className="mr-3 text-dance">
        {danceRatioPermil === valueAtMaxType ? (
          <b>{calc(danceRatioPermil)}</b>
        ) : (
          <span>{calc(danceRatioPermil)}</span>
        )}
      </span>
      <span className="mr-3 text-visual">
        {visualRatioPermil === valueAtMaxType ? (
          <b>{calc(visualRatioPermil)}</b>
        ) : (
          <span>{calc(visualRatioPermil)}</span>
        )}
      </span>
      <span className="mr-3 text-stamina">{stamina}</span>
    </div>
  )
}

// const CardStories = ({
//   idolName,
//   cardNumber,
// }: {
//   idolName: IdolName
//   cardNumber: number
// }) => {
//   const stories = CardStoriesData?.[idolName]?.[cardNumber]

//   if (!stories) {
//     return (
//       <div className="mb-2 text-gray-500">
//         尚无剧情翻译信息。请添加翻译信息到{' '}
//         <a href={Paths.repo('data/cardStories.data.ts')}>
//           data/cardStories.data.ts
//         </a>{' '}
//         的 data[
//         {idolName}][{cardNumber}] 。
//       </div>
//     )
//   }

//   return (
//     <div className="mb-2">
//       {[1, 2, 3].map((id) => {
//         const _id = id as unknown as 1 | 2 | 3
//         const storyName = ['', 'TODO'].includes(stories[_id].name)
//           ? `剧情第${_id}话`
//           : `${_id} - ${stories[_id].name}`
//         return (
//           <Button
//             key={id}
//             component="a"
//             href={toVideoLink(stories[_id].video)}
//             target="_blank"
//             rel="noopener"
//             className="mr-2"
//           >
//             {storyName}
//           </Button>
//         )
//       })}
//       {stories.phone && (
//         <Button
//           component="a"
//           href={toVideoLink(stories.phone.video)}
//           target="_blank"
//           rel="noopener"
//         >
//           来电
//         </Button>
//       )}
//     </div>
//   )
// }

const CardItem = ({
  card,
  rarityData,
}: {
  card: Card
  rarityData: CardRarity[]
}) => {
  const {
    name: nameJa,
    type,
    initialRarity,
    cardParameterId,
    vocalRatioPermil,
    danceRatioPermil,
    visualRatioPermil,
    staminaRatioPermil,
  } = card

  const maxRarity = Math.max(...rarityData.map((x) => x.rarity))
  const [rarity, setRarity] = useState(maxRarity)
  const rarityInfo = rarityData.filter((x) => x.rarity === rarity)[0]
  const [level, setLevel] = useState(rarityInfo?.levelLimit ?? 1)

  if (!rarityData) {
    return <Skeleton height={300} />
  }

  if (level > rarityInfo.levelLimit) {
    setLevel(rarityInfo.levelLimit)
  }

  return (
    <>
      <div className="text-3xl mb-2" lang="zh-CN">
        {nameJa}
      </div>
      <div className="text-xl mb-2" lang="ja">
        {nameJa}
      </div>
      <div>
        {CardType[type]} / 初始 {initialRarity}★
      </div>
      <hr />
      <p>稀有度 / {rarity}</p>
      <Slider
        min={initialRarity}
        max={maxRarity}
        value={rarity}
        onChange={(r) => {
          setRarity(r)
        }}
      />
      <p>等级 / {level}</p>
      <Slider
        min={1}
        max={rarityInfo.levelLimit}
        value={level}
        onChange={(l) => {
          setLevel(l)
        }}
      />
      <p>数值</p>
      <Props
        cardParameterId={cardParameterId}
        vocalRatioPermil={vocalRatioPermil}
        danceRatioPermil={danceRatioPermil}
        visualRatioPermil={visualRatioPermil}
        staminaRatioPermil={staminaRatioPermil}
        rarityInfo={rarityInfo}
        level={level}
      />
      <br />

      {/* <CardStories idolName={idolName} cardNumber={cardNumber} /> */}

      {/* <Button
        variant="outline"
        component="a"
        href={Paths.wiki(`${idolName}/卡牌/${cardNumber}`)}
        target="_blank"
        rel="noopener"
      >
        Wiki 页面
      </Button> */}
    </>
  )
}

export default CardItem
