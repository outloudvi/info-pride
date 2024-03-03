import type { Skill } from 'hoshimi-types/ProtoMaster'
import { Card, Grid, Group } from '@mantine/core'
import { AttributeType, CardType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'
import dayjs from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
import dayjsTz from 'dayjs/plugin/timezone'

import SkillDesc from './SkillDesc'

import { Link } from '#utils/navigation'
import type { APIResponseOf } from '#utils/api'
import getCardColor from '#utils/getCardColor'
import { SOURCE_TIMEZONE } from '#utils/constants'
import AssetImage from '#components/AssetImage'
import $tp from '#utils/transProtect'

dayjs.extend(dayjsUtc)
dayjs.extend(dayjsTz)

const CardWithSkills = ({
    card,
    highlightedSkills,
    skillData,
}: {
    card: APIResponseOf<'Card'>[number]
    highlightedSkills: string[]
    skillData: Skill[]
}) => {
    const $t = useTranslations('search')
    const $v = useTranslations('vendor')
    const $vcn = useTranslations('v-card-name')
    const $vca = useTranslations('v-card-alias')
    const $vc = useTranslations('v-chr')

    const { id, name, characterId, type, initialRarity, releaseDate, assetId } =
        card
    const cardColor = getCardColor(card)
    const releaseDateFmt = dayjs(Number(releaseDate))
        .tz(SOURCE_TIMEZONE)
        .format('YYYY-MM-DD')

    const hasTranslatedName = $vcn(name) !== name

    return (
        <Card className="bg-neutral-200 dark:bg-neutral-800 rounded-md mb-2">
            <Group align="start">
                <div>
                    <Link href={`/cards/${id}`}>
                        <b>{hasTranslatedName ? $vcn($tp(name)) : name}</b>
                    </Link>
                    {hasTranslatedName && (
                        <span className="ml-2 text-gray-700 dark:text-gray-300">
                            {name}
                        </span>
                    )}
                    {$vca(assetId) !== assetId && (
                        <small className="ml-3">{$vca($tp(assetId))}</small>
                    )}
                    <br />
                    <span>
                        {$vc(characterId)} / {$v(CardType[type])} /{' '}
                        {$v(AttributeType[cardColor])} / {initialRarity}★ /{' '}
                        {$t('Released')} {releaseDateFmt}
                    </span>
                </div>
                <div className="flex-grow"></div>
                <AssetImage
                    name={`img_card_thumb_1_${assetId}`}
                    ratio={1}
                    height={80}
                    alt={'Asset image'}
                />
            </Group>

            <Grid className="mt-1">
                {skillData.map((skill, index) => (
                    <Grid.Col
                        span={{
                            base: 12,
                            lg: 4,
                        }}
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
