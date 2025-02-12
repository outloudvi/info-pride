import {
    Anchor,
    Breadcrumbs,
    Button,
    Grid,
    GridCol,
    Group,
    Skeleton,
} from '@mantine/core'
import { AttributeType, CardType } from 'hoshimi-types/ProtoEnum'
import { Suspense } from 'react'
import { getLocale, getTranslations } from 'next-intl/server'
import Link from 'next/link'

import CardAsset from './CardAsset'
import Skills from './Skills'
import CardStories from './CardStories'
import CardParamsWrapper from './CardParamsWrapper'

import Paths from '#utils/paths'
import getCardColor from '#utils/getCardColor'
import type { APIResponseOf, UnArray } from '#utils/api'
import type { CharacterId } from '#data/vendor/characterId'
import CCIDTable from '#data/ccid'
import ApiData from '#locales/apiData'
import CardStoriesData from '#data/videos/cardStories.data'
import { fetchApi } from '#utils/fetchApi'
import lfToBr from '#utils/lfToBr'

const CardItem = async ({
    card,
    title,
}: {
    card: UnArray<APIResponseOf<'Card'>>
    title: string
}) => {
    const $t = await getTranslations('cards_slug')
    const $c = await getTranslations('common')
    const $v = await getTranslations('vendor')
    const $vc = await getTranslations('v-chr')

    const {
        name,
        description,
        type,
        initialRarity,
        stories,
        liveAbilityId,
        activityAbilityId,
    } = card

    const locale = await getLocale()

    const SkillData = await fetchApi('Skill', {
        ids: [
            card.skillId1,
            card.skillId2,
            card.skillId3,
            ...[card.skillId4 !== '' ? [card.skillId4] : []],
        ].join(','),
    })

    const YellLiveData = liveAbilityId
        ? await fetchApi('LiveAbility', {
              id: liveAbilityId,
          })
        : null

    const YellActivityData = activityAbilityId
        ? await fetchApi('ActivityAbility', {
              id: activityAbilityId,
          })
        : null

    const CardAliases = ApiData.alias?.[locale]?.[card.assetId]
    const WikiStories = CardStoriesData?.[locale]?.[card.id]

    const storiesDisplay = (() => {
        // Not fetched

        if (stories.length === 0) {
            // No stories
            return <p className="text-gray-500 mt-1 mb-2">{$t('no_stories')}</p>
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

        return <CardStories stories={WikiStories} />
    })()

    const cardCcidInfo = CCIDTable?.[card.characterId as CharacterId]?.find(
        (x) => x.cardId === card.id,
    )

    return (
        <>
            <Breadcrumbs className="mb-2">
                <Anchor href="/cards" className="no-underline">
                    {$t('Card list')}
                </Anchor>
                <Anchor>{name}</Anchor>
            </Breadcrumbs>
            <div>
                {title !== card.name ? (
                    <>
                        <div className="text-3xl mb-2" lang={locale}>
                            {title}
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
                <GridCol span={{ base: 12, lg: 6 }}>
                    <div className="text-gray-600 dark:text-gray-400">
                        {lfToBr(description)}
                    </div>

                    {CardAliases && (
                        <div>
                            {$t('aka')} {CardAliases}
                        </div>
                    )}
                    <div>
                        {$vc(card.characterId)} / {$v(CardType[type])} /{' '}
                        {$v(AttributeType[getCardColor(card)])} /{' '}
                        {$t('Initially')} {initialRarity}★
                    </div>
                    <Suspense fallback={<Skeleton height={200} />}>
                        <CardParamsWrapper card={card} />
                    </Suspense>
                    <h3>
                        {$t('Skills')}
                        <br />
                        <small className="font-normal text-gray-500">
                            {$t.rich('skill_icons_beta', {
                                a: (children) => (
                                    <a href={Paths.repoIssue()}>{children}</a>
                                ),
                            })}
                        </small>
                    </h3>
                    <Suspense fallback={<Skeleton height={300} />}>
                        <Skills
                            skills={SkillData}
                            yellSkill={
                                liveAbilityId === '' && activityAbilityId === ''
                                    ? null
                                    : YellLiveData || YellActivityData
                            }
                        />
                    </Suspense>
                </GridCol>
                <GridCol span={{ base: 12, lg: 6 }}>
                    <h3>{$t('Images')}</h3>
                    <CardAsset
                        cardAssetId={card.assetId}
                        isInitiallyAwaken={card.initialRarity >= 5}
                    />
                    <h3>{$t('Story replay')}</h3>
                    {stories.length > 0 && (
                        <Group>
                            {stories.map((item, key) => (
                                <Link
                                    href={`/${locale}/story/${item.storyId}`}
                                    key={key}
                                >
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
                                }`,
                            )}
                            target="_blank"
                            rel="noopener"
                        >
                            Wiki 页面
                        </Button>
                    )}
                </GridCol>
            </Grid>
        </>
    )
}

export default CardItem
