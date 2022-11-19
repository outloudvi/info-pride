import type { Skill } from 'hoshimi-types/ProtoMaster'
import { Card, Grid } from '@mantine/core'
import { AttributeType, CardType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'
import dayjs from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
import dayjsTz from 'dayjs/plugin/timezone'
import Link from 'next/link'

import SkillDesc from './SkillDesc'

import CCIDTable from '#data/ccid'
import type { APIResponseOf } from '#utils/api'
import getCardColor from '#utils/getCardColor'
import type { CharacterId } from '#data/vendor/characterId'
import Paths from '#utils/paths'

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
        .tz('Asia/Tokyo')
        .format('YYYY-MM-DD')

    const cardCcid = CCIDTable?.[card.characterId as CharacterId]?.find(
        (x) => x.cardId === card.id
    )

    const hasTranslatedName = $vcn(name) !== name

    return (
        <Card className="bg-neutral-200 dark:bg-neutral-800 rounded-md mb-2">
            <Link href={`/cards/${id}`}>
                <b>{hasTranslatedName ? $vcn(name) : name}</b>
            </Link>
            {hasTranslatedName && (
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                    {name}
                </span>
            )}
            {$vca(assetId) !== assetId && (
                <small className="ml-3">{$vca(assetId)}</small>
            )}
            {cardCcid && (
                <>
                    <br className="lg:hidden" />
                    <a
                        className="lg:float-right"
                        href={Paths.wiki(
                            `${$vc(characterId)}/卡牌/${cardCcid.ccid}`
                        )}
                    >
                        {$t('Wiki Page (Chinese)')}
                    </a>
                </>
            )}
            <br />
            <span>
                {$vc(characterId)} / {$v(CardType[type])} /{' '}
                {$v(AttributeType[cardColor])} / {initialRarity}★ /{' '}
                {$t('Released')} {releaseDateFmt}
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
