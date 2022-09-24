import { Card } from '@mantine/core'
import { CardType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { getAssetSlug } from './CardAsset'

import getCardColor from '#utils/getCardColor'
import { APIResponseOf, UnArray } from '#utils/api'
import AssetImage from '#components/AssetImage'

const CardCard = ({
    card,
    nameCn,
}: {
    card: UnArray<APIResponseOf<'Card'>>
    nameCn?: string
}) => {
    const $v = useTranslations('vendor')
    const $vc = useTranslations('v-chr')
    const { id, name, characterId, assetId, type, initialRarity } = card

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

                    <p>
                        {$vc(characterId)} / {$v(CardType[type])} /{' '}
                        {$v(getCardColor(card))} / 初始 {initialRarity}★
                    </p>
                </Card>
            </a>
        </Link>
    )
}

export default CardCard
