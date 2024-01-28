import { Skeleton } from '@mantine/core'
import { useTranslations } from 'next-intl'

import PhotoAbility from './PhotoAbility'

import useApi from '#utils/useApi'
import AssetImage from '#components/AssetImage'

const PhotoAioItem = ({ id }: { id: string }) => {
    const $t = useTranslations('photos')
    const $cs = useTranslations('cards_slug')

    const { data } = useApi('Photo', {
        id,
    })

    if (!data) {
        return <Skeleton height={300} />
    }

    const { name, assetId, rarity, abilities } = data

    return (
        <>
            <div className="float-right w-1/2">
                <AssetImage
                    name={`img_photo_full_${assetId}`}
                    ratio="16 / 9"
                    alt={'Photo image'}
                    className="object-fill"
                    width="100%"
                />
            </div>
            <h2 lang="ja">{name}</h2>
            <p>
                {$cs('Rarity')}: {rarity}
            </p>
            <div className="clear-both" />
            <h3>{$t('Skills')}</h3>
            <div>
                {abilities.map((item, key) => (
                    <PhotoAbility key={key} item={item} />
                ))}
            </div>
        </>
    )
}

export default PhotoAioItem
