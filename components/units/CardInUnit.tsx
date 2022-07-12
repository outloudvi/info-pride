import { Skeleton } from '@mantine/core'
import { CardType } from 'hoshimi-types/ProtoEnum'
import { useTranslation } from 'next-i18next'

import SkillInUnit from './SkillInUnit'
import { CardTiny } from './types'

import useApi from '#utils/useApi'
import { CharacterChineseNameList, CharacterId } from '#data/vendor/characterId'
import AssetImage from '#components/AssetImage'

const CardInUnit = ({ card, col }: { card: CardTiny; col: number }) => {
  const { t: $v } = useTranslation('vendor')
  const { data: SkillData } = useApi(`Skill`, {
    ids: `${card.skillId1},${card.skillId2},${card.skillId3}`,
  })

  return (
    <>
      <div style={{ gridRow: 3, gridColumn: col }} className="w-3/4 mx-auto">
        <AssetImage
          name={`img_card_thumb_1_${card.assetId}`}
          ratio={1}
          alt={'Small square image'}
        />
      </div>
      <div style={{ gridRow: 4, gridColumn: col }}>
        <b>{card.name}</b>
      </div>
      <div style={{ gridRow: 5, gridColumn: col }}>
        {CharacterChineseNameList[card.characterId as CharacterId]}
      </div>
      <div className="mt-2 mb-3" style={{ gridRow: 6, gridColumn: col }}>
        {$v(CardType[card.type])}
      </div>
      {SkillData ? (
        SkillData.map((x, i) => (
          <SkillInUnit
            key={i}
            className="mb-2"
            style={{ gridRow: 7 + i, gridColumn: col }}
            skill={x}
          />
        ))
      ) : (
        <Skeleton
          height={300}
          style={{ gridRow: '7 / span 3', gridColumn: col }}
        />
      )}
    </>
  )
}

export default CardInUnit
