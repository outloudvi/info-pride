import { Grid, GridCol, Slider } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import type { PhotoAioDetail } from 'hoshimi-types/types'

import PhotoAbility from './PhotoAbility'

import AssetImage from '#components/AssetImage'

const PhotoAioItem = ({ data }: { data: PhotoAioDetail }) => {
    const $t = useTranslations('photos')
    const $cs = useTranslations('cards_slug')

    const { name, assetId, rarity, abilities, level: initialLevel } = data
    const maxLevel = useMemo(
        () =>
            data.abilities[0].photoAbilityLevels[
                data.abilities[0].photoAbilityLevels.length - 1
            ].level,
        [data],
    )
    const [level, setLevel] = useState(initialLevel)

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
                {$cs('Rarity')}: {rarity} <br />
                {$t('Initial level')}: {initialLevel}
            </p>
            <div className="clear-both" />
            <h3>{$t('Skills')}</h3>
            <p>{$t('select_level')}</p>
            <Grid>
                <GridCol span={{ base: 7, lg: 9 }}>
                    <Slider
                        min={initialLevel}
                        max={maxLevel}
                        value={level}
                        marks={[
                            {
                                value: initialLevel,
                                label: String(initialLevel),
                            },
                            {
                                value: maxLevel,
                                label: String(maxLevel),
                            },
                        ]}
                        label={(v) => `Level ${v}`}
                        onChange={setLevel}
                        aria-label={'Level'}
                        step={5}
                    />
                </GridCol>
                <GridCol
                    span={{ base: 5, lg: 3 }}
                    className="flex items-center justify-center"
                >
                    <div className="mr-1">Lv.</div>
                    <div className="text-center text-2xl">{level}</div>
                </GridCol>
            </Grid>

            <div>
                {abilities.map((item, key) => (
                    <PhotoAbility key={key} item={item} level={level} />
                ))}
            </div>
        </>
    )
}

export default PhotoAioItem
