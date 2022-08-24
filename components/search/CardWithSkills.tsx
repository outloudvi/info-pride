import { Skill } from 'hoshimi-types/ProtoMaster'
import { Card, Grid } from '@mantine/core'
import { CardType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'
import dayjs from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
import dayjsTz from 'dayjs/plugin/timezone'

import SkillDesc from './SkillDesc'

import CCIDTable from '#data/ccid'
import { APIResponseOf } from '#utils/api'
import getCardColor from '#utils/getCardColor'
import { CharacterChineseNameList, CharacterId } from '#data/vendor/characterId'
import Paths from '#utils/paths'

dayjs.extend(dayjsUtc)
dayjs.extend(dayjsTz)

const CardWithSkills = ({
  card,
  highlightedSkills,
  skillData,
  skillxData,
}: {
  card: APIResponseOf<'Card'>[number]
  highlightedSkills: string[]
  skillData: Skill[]
  skillxData: APIResponseOf<'Skill/X'>
}) => {
  const $v = useTranslations('vendor')

  const { name, characterId, type, initialRarity, releaseDate } = card
  const cardColor = getCardColor(card)
  const releaseDateFmt = dayjs(Number(releaseDate))
    .tz('Asia/Tokyo')
    .format('YYYY-MM-DD')

  const cardCcid = CCIDTable?.[card.characterId as CharacterId]?.find(
    (x) => x.cardId === card.id
  )

  return (
    <Card className="bg-neutral-200 dark:bg-neutral-800 rounded-md mb-2">
      <b>{name}</b>
      {cardCcid && (
        <>
          <br className="lg:hidden" />
          <a
            className="lg:float-right"
            href={Paths.wiki(
              `${CharacterChineseNameList[characterId as CharacterId]}/卡牌/${
                cardCcid.ccid
              }`
            )}
          >
            Wiki 页面
          </a>
        </>
      )}
      <br />
      <span>
        {CharacterChineseNameList[characterId as CharacterId]} /{' '}
        {$v(CardType[type])} / {$v(cardColor)} / {initialRarity}★ / 发布于{' '}
        {releaseDateFmt}
      </span>

      <Grid className="mt-1">
        {skillData.map((skill, index) => (
          <Grid.Col
            xs={12}
            lg={4}
            key={index}
            className={
              highlightedSkills.includes(skill.id)
                ? 'bg-yellow-300 dark:bg-yellow-700'
                : ''
            }
          >
            <SkillDesc skill={skill} />
          </Grid.Col>
        ))}
      </Grid>
    </Card>
  )
}

export default CardWithSkills
