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
import { CardType } from 'hoshimi-types/ProtoEnum'
import { useTranslation } from 'next-i18next'
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
import { CharacterChineseNameList, CharacterId } from '#data/vendor/characterId'
import useFrontendApi from '#utils/useFrontendApi'
import CCIDTable from '#data/ccid'

const MAX_LEVEL = 200

const CardItem = ({
  card,
  rarityData,
}: {
  card: UnArray<APIResponseOf<'Card'>>
  rarityData: CardRarity[]
}) => {
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

  const { t: $v } = useTranslation('vendor')

  const maxRarity = Math.max(...rarityData.map((x) => x.rarity))
  const [rarity, setRarity] = useState(maxRarity)
  const rarityInfo = rarityData.filter((x) => x.rarity === rarity)[0]
  const [level, setLevel] = useState(rarityInfo?.levelLimit ?? 1)
  const [cnTrans, setCnTrans] = useState(true)

  const { data: SkillData } = useApi(`Skill`, {
    ids: `${card.skillId1},${card.skillId2},${card.skillId3}`,
  })

  const { data: WikiCardData } = useFrontendApi('wikiCard', {
    nameJa,
  })
  const { data: WikiStories, isFetched: isWikiStoriesFetched } = useFrontendApi(
    'cardStories',
    {
      id: card.id,
    }
  )

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
          <h3>??????</h3>
          <p className="text-gray-500">
            ?????????????????????????????????{' '}
            <a href={Paths.repo('data/cardStories.data.ts')}>
              `cardStories.data.ts`
            </a>{' '}
            ??? <code>{card.id}</code> ???
          </p>
        </>
      )
    }

    // Stories do not exist
    if (WikiStories.stories === null) {
      return (
        <>
          <h3>??????</h3>
          <p className="text-gray-500">?????????????????????</p>
        </>
      )
    }

    return (
      <>
        <h3>??????</h3>
        <CardStories stories={WikiStories.stories} />
      </>
    )
  }, [WikiStories, isWikiStoriesFetched, card.id])

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
          <Anchor>????????????</Anchor>
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
            {$v(CardType[type])} / {$v(getCardColor(card))} / ??????{' '}
            {initialRarity}???
          </div>
          <div className="mt-2">?????? / {rarity}</div>
          <Slider
            min={initialRarity}
            max={maxRarity}
            value={rarity}
            onChange={(r) => {
              setRarity(r)
            }}
          />
          <div className="mt-2">?????? / {level}</div>
          <Slider
            min={1}
            max={MAX_LEVEL}
            value={level}
            onChange={(l) => {
              setLevel(l)
            }}
          />
          <div className="mt-2">
            ??????{' '}
            <Tooltip label="???????????????????????????????????????">
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
            ??????{useCn && '???????????????????????????'}
            <br />
            <small className="font-normal text-gray-500">
              ????????????????????????????????????????????????
              <a href={Paths.repoIssue()}>??????</a>
              ????????????????????????
            </small>
          </h3>

          {SkillData ? (
            <Skills skills={SkillData} useCn={useCn} wikiCardData={wikiCard} />
          ) : (
            <Skeleton height={200} />
          )}
          <br />
          <Switch
            label="??????????????????"
            checked={cnTrans}
            onChange={(e) => setCnTrans(e.target.checked)}
          />
        </Grid.Col>
        <Grid.Col xs={12} lg={6}>
          <h3>??????</h3>
          <CardAsset
            cardAssetId={card.assetId}
            isInitiallyAwaken={card.initialRarity >= 5}
          />
          {storiesDisplay}
          {cardCcidInfo && (
            <Button
              className="mt-2"
              variant="outline"
              component="a"
              href={Paths.wiki(
                `${
                  CharacterChineseNameList[card.characterId as CharacterId]
                }/??????/${cardCcidInfo.ccid}`
              )}
              target="_blank"
              rel="noopener"
            >
              Wiki ??????
            </Button>
          )}
        </Grid.Col>
      </Grid>
    </>
  )
}

export default CardItem
