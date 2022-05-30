import { Skill } from '@outloudvi/hoshimi-types/ProtoMaster'
import { Card, Grid } from '@mantine/core'
import { CardType } from '@outloudvi/hoshimi-types/ProtoEnum'
import { useTranslation } from 'next-i18next'
import dayjs from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
import dayjsTz from 'dayjs/plugin/timezone'

import SkillDesc from './SkillDesc'

import { APIResponseOf } from '#utils/api'
import getCardColor from '#utils/getCardColor'
import { CharacterChineseNameList, CharacterId } from '#data/vendor/characterId'

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
  const { t: $v } = useTranslation('vendor')

  const { name, characterId, type, initialRarity, releaseDate } = card
  const cardColor = getCardColor(card)
  const releaseDateFmt = dayjs(Number(releaseDate))
    .tz('Asia/Tokyo')
    .format('YYYY-MM-DD')

  return (
    <Card className="bg-neutral-200 dark:bg-neutral-800 rounded-md mb-2">
      <b>{name}</b>
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
              highlightedSkills.includes(skill.id) ? 'bg-yellow-300' : ''
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
