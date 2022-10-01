import { Card } from '@mantine/core'
import { CardType } from 'hoshimi-types/ProtoEnum'
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
    displayMaxValue,
}: {
    card: UnArray<APIResponseOf<'Card'>>
    displayMaxValue: boolean
    nameCn?: string
}) => {
    const $v = useTranslations('vendor')
    const $vc = useTranslations('v-chr')
    const $t = useTranslations('cards')
    const { id, name, characterId, assetId, type, initialRarity, maxValue } =
        card

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

    const cardColorClassName = getCardColorClassName(card)

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
                        {$v(getCardColor(card))} / {$t('Initially')}{' '}
                        {initialRarity}★
                    </div>

                    {displayMaxValue && (
                        <PropValueBg
                            className={cardColorClassName}
                            maxValue={maxValue}
                        />
                    )}
                </Card>
            </a>
        </Link>
    )
}

export default CardCard
