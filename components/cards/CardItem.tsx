import { useMemo, useState } from 'react'
import {
    Anchor,
    Breadcrumbs,
    Button,
    Grid,
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
import { APIResponseOf, UnArray } from '#utils/api'
import { CharacterId } from '#data/vendor/characterId'
import useFrontendApi from '#utils/useFrontendApi'
import CCIDTable from '#data/ccid'
import { MAX_LEVEL } from '#utils/constants'

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

    const {
        name: nameJa,
        description,
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
    const locale = useLocale()
    const [cnTrans, setCnTrans] = useState(locale === 'zh-hans')

    const { data: SkillData } = useApi(`Skill`, {
        ids: `${card.skillId1},${card.skillId2},${card.skillId3}`,
    })

    const { data: WikiCardData } = useFrontendApi('wikiCard', {
        nameJa,
    })
    const { data: WikiStories, isFetched: isWikiStoriesFetched } =
        useFrontendApi('cardStories', {
            id: card.id,
            locale,
        })

    const useCn = cnTrans && (WikiCardData?.length ?? 0) > 0

    const storiesDisplay = useMemo(() => {
        // Not fetched
        if (!isWikiStoriesFetched) {
            return <Skeleton height={200} className="my-2" />
        }

        // Translation does not exist
        if (WikiStories === undefined) {
            return (
                <>
                    <h3>{$t('Stories')}</h3>
                    <p className="text-gray-500">
                        {$c.rich('no_trans', {
                            field: card.id,
                            file: `data/videos/cardStories.data/${locale}.ts`,
                        })}
                    </p>
                </>
            )
        }

        // Stories do not exist
        if (WikiStories.stories === null) {
            return (
                <>
                    <h3>{$t('Stories')}</h3>
                    <p className="text-gray-500">{$t('no_stories')}</p>
                </>
            )
        }

        return (
            <>
                <h3>{$t('Stories')}</h3>
                <CardStories stories={WikiStories.stories} />
            </>
        )
    }, [WikiStories, isWikiStoriesFetched, card.id, locale, $t, $c])

    if (!rarityData) {
        return <Skeleton height={300} />
    }

    const wikiCard = WikiCardData?.[0] as WikiCard | undefined
    const cardCcidInfo = CCIDTable?.[card.characterId as CharacterId]?.find(
        (x) => x.cardId === card.id
    )

    return (
        <>
            <Breadcrumbs className="mb-2">
                <Link href="/cards" passHref>
                    <Anchor>{$t('Card list')}</Anchor>
                </Link>
                <Link href="#" passHref>
                    <Anchor>{nameJa}</Anchor>
                </Link>
            </Breadcrumbs>
            <div>
                {useCn ? (
                    <>
                        {' '}
                        <div className="text-3xl mb-2" lang="zh-CN">
                            {wikiCard?.nameCn}
                        </div>
                        <div className="text-xl mb-2" lang="ja">
                            {nameJa}
                        </div>
                    </>
                ) : (
                    <div className="text-3xl mb-2" lang="zh-CN">
                        {nameJa}
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
                    <div>
                        {$v(CardType[type])} /{' '}
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
                    />
                    <div className="mt-2">
                        {$t('Level')} / {level}
                    </div>
                    <Slider
                        min={1}
                        max={MAX_LEVEL}
                        value={level}
                        onChange={(l) => {
                            setLevel(l)
                        }}
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
                    {storiesDisplay}
                    {locale === 'zh-hans' && cardCcidInfo && (
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
