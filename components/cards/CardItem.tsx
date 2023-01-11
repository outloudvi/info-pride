import { useMemo, useState } from 'react'
import {
    Anchor,
    Breadcrumbs,
    Button,
    Grid,
    Group,
    Skeleton,
    Slider,
    Switch,
    Tooltip,
} from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import type { CardRarity } from 'hoshimi-types/ProtoMaster'
import { AttributeType, CardType } from 'hoshimi-types/ProtoEnum'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

import CardAsset from './CardAsset'
import Props from './Props'
import Skills from './Skills'
import CardStories from './CardStories'

import type { Card as WikiCard } from '#data/wikiPages/cards'
import useApi from '#utils/useApi'
import Paths from '#utils/paths'
import getCardColor from '#utils/getCardColor'
import type { APIResponseOf, UnArray } from '#utils/api'
import type { CharacterId } from '#data/vendor/characterId'
import useFrontendApi from '#utils/useFrontendApi'
import CCIDTable from '#data/ccid'
import { MAX_LEVEL, MAX_LEVEL_BEFORE_POTENTIAL } from '#utils/constants'

const CardItem = ({
    card,
    rarityData,
}: {
    card: UnArray<APIResponseOf<'Card'>>
    rarityData: CardRarity[]
}) => {
    const $t = useTranslations('cards_slug')
    const $c = useTranslations('common')
    const $v = useTranslations('vendor')
    const $vc = useTranslations('v-chr')
    const $vcn = useTranslations('v-card-name')

    const {
        name,
        description,
        type,
        initialRarity,
        cardParameterId,
        vocalRatioPermil,
        danceRatioPermil,
        visualRatioPermil,
        staminaRatioPermil,
        stories,
    } = card

    const maxRarity = Math.max(...rarityData.map((x) => x.rarity))
    const [rarity, setRarity] = useState(maxRarity)
    const rarityInfo = rarityData.filter((x) => x.rarity === rarity)[0]
    const [level, setLevel] = useState(rarityInfo?.levelLimit ?? 1)
    const locale = useLocale()
    const [cnTrans, setCnTrans] = useState(false)

    const { data: SkillData } = useApi(`Skill`, {
        ids: `${card.skillId1},${card.skillId2},${card.skillId3}`,
    })

    const { data: WikiCardData } = useFrontendApi('wikiCard', {
        nameJa: name,
    })
    const { data: CardAliasData } = useFrontendApi('cardAliases', {
        assetId: card.assetId,
        locale,
    })
    const { data: WikiStories, isFetched: isWikiStoriesFetched } =
        useFrontendApi('cardStories', {
            id: card.id,
            locale,
        })

    const useCn = cnTrans && (WikiCardData?.length ?? 0) > 0

    const storiesDisplay = useMemo(() => {
        // Not fetched

        if (stories.length === 0) {
            // No stories
            return <p className="text-gray-500 mt-1 mb-2">{$t('no_stories')}</p>
        }

        if (!isWikiStoriesFetched) {
            return <Skeleton height={200} className="mt-1 mb-2" />
        }

        // Translation does not exist
        if (WikiStories === undefined) {
            return (
                <p className="text-gray-500 mt-1 mb-2">
                    {$c.rich('no_trans', {
                        field: card.id,
                        file: `data/videos/cardStories.data/${locale}.ts`,
                    })}
                </p>
            )
        }

        return <CardStories stories={WikiStories.stories} />
    }, [
        WikiStories,
        isWikiStoriesFetched,
        card.id,
        locale,
        $t,
        $c,
        stories.length,
    ])

    if (!rarityData) {
        return <Skeleton height={300} />
    }

    const wikiCard = WikiCardData?.[0] as WikiCard | undefined
    const cardCcidInfo = CCIDTable?.[card.characterId as CharacterId]?.find(
        (x) => x.cardId === card.id
    )
    const levelDisplay =
        level <= MAX_LEVEL_BEFORE_POTENTIAL ? (
            <span>{level}</span>
        ) : (
            <span>
                {MAX_LEVEL_BEFORE_POTENTIAL} +{' '}
                {level - MAX_LEVEL_BEFORE_POTENTIAL} = {level}
            </span>
        )

    return (
        <>
            <Breadcrumbs className="mb-2">
                <Link href="/cards" passHref className="no-underline">
                    <Anchor>{$t('Card list')}</Anchor>
                </Link>
                <Anchor>{name}</Anchor>
            </Breadcrumbs>
            <div>
                {$vcn(card.name) !== card.name ? (
                    <>
                        <div className="text-3xl mb-2" lang={locale}>
                            {$vcn(card.name)}
                        </div>
                        <div className="text-xl mb-2" lang="ja">
                            {name}
                        </div>
                    </>
                ) : (
                    <div className="text-3xl mb-2" lang="ja">
                        {name}
                    </div>
                )}
            </div>
            <Grid gutter={20}>
                <Grid.Col xs={12} lg={6}>
                    {!useCn && (
                        <div
                            className="text-gray-600 dark:text-gray-400"
                            dangerouslySetInnerHTML={{
                                __html: description.replace(/\n/g, '<br/>'),
                            }}
                        ></div>
                    )}
                    {CardAliasData?.aliases && (
                        <div>
                            {$t('aka')} {CardAliasData.aliases}
                        </div>
                    )}
                    <div>
                        {$vc(card.characterId)} / {$v(CardType[type])} /{' '}
                        {$v(AttributeType[getCardColor(card)])} /{' '}
                        {$t('Initially')} {initialRarity}★
                    </div>
                    <div className="mt-2">
                        {$t('Rarity')} / {rarity}
                    </div>
                    <Slider
                        min={initialRarity}
                        max={maxRarity}
                        value={rarity}
                        onChange={(r) => {
                            setRarity(r)
                        }}
                        aria-label={$t('Rarity')}
                    />
                    <div className="mt-2">
                        {$t('Level')} / {levelDisplay}
                    </div>
                    <Slider
                        min={1}
                        max={MAX_LEVEL}
                        value={level}
                        onChange={(l) => {
                            setLevel(l)
                        }}
                        marks={[
                            {
                                value: MAX_LEVEL_BEFORE_POTENTIAL,
                                label: '200',
                            },
                        ]}
                        aria-label={$t('Level') + '44'}
                    />
                    <div className="mt-2">
                        {$t('Props')}{' '}
                        <Tooltip label={$t('props_tooltip')}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </Tooltip>
                    </div>
                    <Props
                        cardParameterId={cardParameterId}
                        vocalRatioPermil={vocalRatioPermil}
                        danceRatioPermil={danceRatioPermil}
                        visualRatioPermil={visualRatioPermil}
                        staminaRatioPermil={staminaRatioPermil}
                        rarityInfo={rarityInfo}
                        level={level}
                    />
                    <h3>
                        {$t('Skills')} {useCn && $t('skills_bwiki')}
                        <br />
                        <small className="font-normal text-gray-500">
                            {$t.rich('skill_icons_beta', {
                                a: (children) => (
                                    <a href={Paths.repoIssue()}>{children}</a>
                                ),
                            })}
                        </small>
                    </h3>

                    {SkillData ? (
                        <Skills
                            skills={SkillData}
                            useCn={useCn}
                            wikiCardData={wikiCard}
                        />
                    ) : (
                        <Skeleton height={200} />
                    )}
                    <br />
                    <Switch
                        label={$t('Use biliwiki translations')}
                        checked={cnTrans}
                        onChange={(e) => setCnTrans(e.target.checked)}
                    />
                </Grid.Col>
                <Grid.Col xs={12} lg={6}>
                    <h3>{$t('Images')}</h3>
                    <CardAsset
                        cardAssetId={card.assetId}
                        isInitiallyAwaken={card.initialRarity >= 5}
                    />
                    <h3>{$t('Story replay')}</h3>
                    {stories.length > 0 && (
                        <Group>
                            {stories.map((item, key) => (
                                <Link href={`/story/${item.storyId}`} key={key}>
                                    <Button>
                                        {$t('part', { s: key + 1 })}
                                    </Button>
                                </Link>
                            ))}
                        </Group>
                    )}
                    <h3>{$t('Story videos')}</h3>
                    {storiesDisplay}
                    {locale === 'zh-Hans' && cardCcidInfo && (
                        <Button
                            className="mt-2"
                            variant="outline"
                            component="a"
                            href={Paths.wiki(
                                `${$vc(card.characterId)}/卡牌/${
                                    cardCcidInfo.ccid
                                }`
                            )}
                            target="_blank"
                            rel="noopener"
                        >
                            Wiki 页面
                        </Button>
                    )}
                </Grid.Col>
            </Grid>
        </>
    )
}

export default CardItem
