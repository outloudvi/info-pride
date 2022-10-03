import { Card, Group } from '@mantine/core'
import { AttributeType, CardType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { getAssetSlug } from './CardAsset'
import PropValueBg from './PropValueBg'

import getCardColor from '#utils/getCardColor'
import { APIResponseOf, UnArray } from '#utils/api'
import AssetImage from '#components/AssetImage'
import getCardColorClassName from '#utils/getCardColorClassName'

const CardCard = ({
    card,
    nameCn,
}: {
    card: UnArray<APIResponseOf<'Card/List'>>
    nameCn?: string
}) => {
    const $v = useTranslations('vendor')
    const $vc = useTranslations('v-chr')
    const $t = useTranslations('cards')
    const {
        id,
        name,
        characterId,
        assetId,
        type,
        initialRarity,
        vocalPt,
        dancePt,
        visualPt,
        staminaPt,
    } = card

    const assetImage =
        initialRarity < 5 ? (
            <div className="flex">
                <AssetImage
                    name={getAssetSlug(assetId, 'rect', false)}
                    ratio="2 / 9"
                    width="12.5%"
                    alt={'Card image'}
                    objectFit="cover"
                />
                <AssetImage
                    name={getAssetSlug(assetId, 'rect', true)}
                    ratio="14 / 9"
                    width="87.5%"
                    alt={'Card image'}
                    objectFit="cover"
                />
            </div>
        ) : (
            <AssetImage
                name={getAssetSlug(assetId, 'rect', true)}
                ratio="16 / 9"
                alt={'Card image'}
            />
        )

    const cardColor = getCardColor({
        // shall be safe since large RatioPermil gives larger Pt
        vocalRatioPermil: vocalPt,
        danceRatioPermil: dancePt,
        visualRatioPermil: visualPt,
    })
    const cardColorClassName = getCardColorClassName(cardColor)

    return (
        <Link href={`/cards/${id}`} passHref>
            <a className="no-underline">
                <Card shadow="sm" p="sm" className="cursor-pointer">
                    <Card.Section>{assetImage}</Card.Section>

                    <div className="mt-3">
                        {nameCn ? (
                            <>
                                <b className="text-xl">{nameCn}</b>
                                <br />
                                <span>{name}</span>
                            </>
                        ) : (
                            <b className="text-xl">{name}</b>
                        )}
                    </div>

                    <div className="my-2">
                        {$vc(characterId)} / {$v(CardType[type])} /{' '}
                        {$v(AttributeType[cardColor])} / {$t('Initially')}{' '}
                        {initialRarity}★
                    </div>

                    <Group>
                        <PropValueBg
                            className={`text-vocal ${
                                cardColorClassName === 'text-vocal'
                                    ? 'font-bold'
                                    : ''
                            }`}
                            value={vocalPt}
                        />
                        <PropValueBg
                            className={`text-dance ${
                                cardColorClassName === 'text-dance'
                                    ? 'font-bold'
                                    : ''
                            }`}
                            value={dancePt}
                        />
                        <PropValueBg
                            className={`text-visual ${
                                cardColorClassName === 'text-visual'
                                    ? 'font-bold'
                                    : ''
                            }`}
                            value={visualPt}
                        />
                        <PropValueBg
                            className={'text-stamina'}
                            value={staminaPt}
                        />
                    </Group>
                </Card>
            </a>
        </Link>
    )
}

export default CardCard
