import { Card, Group } from '@mantine/core'
import { AttributeType, CardType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { getAssetSlug } from './CardAsset'
import PropValueBg from './PropValueBg'

import getCardColor from '#utils/getCardColor'
import { APIResponseOf, UnArray } from '#utils/api'
import AssetImage from '#components/AssetImage'

const CardCard = ({ card }: { card: UnArray<APIResponseOf<'Card/List'>> }) => {
    const $v = useTranslations('vendor')
    const $vc = useTranslations('v-chr')
    const $t = useTranslations('cards')
    const $vcn = useTranslations('v-card-name')
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

    return (
        <div>
            <Link href={`/cards/${id}`} passHref>
                <a className="no-underline">
                    <Card shadow="sm" p="sm" className="cursor-pointer">
                        <Card.Section>{assetImage}</Card.Section>

                        <div className="mt-3">
                            {$vcn(name) !== name ? (
                                <>
                                    <b className="text-xl">{$vcn(name)}</b>
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

                        <Group className="gap-1">
                            <PropValueBg
                                type={AttributeType.Vocal}
                                bold={cardColor === AttributeType.Vocal}
                                value={vocalPt}
                            />
                            <PropValueBg
                                type={AttributeType.Dance}
                                bold={cardColor === AttributeType.Dance}
                                value={dancePt}
                            />
                            <PropValueBg
                                type={AttributeType.Visual}
                                bold={cardColor === AttributeType.Visual}
                                value={visualPt}
                            />
                            <PropValueBg
                                type={'stamina'}
                                bold={false}
                                value={staminaPt}
                            />
                        </Group>
                    </Card>
                </a>
            </Link>
        </div>
    )
}

export default CardCard
