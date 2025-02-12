'use client'

import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { Group, Radio } from '@mantine/core'
import { useTranslations } from 'next-intl'

import type { CardImageType } from './cardHelper'
import { CardSizeConfig, getAssetSlug } from './cardHelper'

import AssetImage from '#components/AssetImage'

/**
 * Generate the asset ID for card-related images.
 *
 * For initially un-awaken cards, there are 8 assets. For example:
 *   * img_card_rect_1_ktn-02-eve-00
 *   * img_card_rect_0_ktn-02-eve-00
 *   * img_card_upper_1_ktn-02-eve-00
 *   * img_card_upper_0_ktn-02-eve-0
 *   * img_card_thumb_1_ktn-02-eve-00
 *   * img_card_thumb_0_ktn-02-eve-00
 *   * img_card_full_1_ktn-02-eve-00
 *   * img_card_full_0_ktn-02-eve-00
 *
 * For initially awaken cards, there are 4 assets. For example:
 *   * img_card_rect_1_ktn-05-idol-00
 *   * img_card_full_1_ktn-05-idol-00
 *   * img_card_thumb_1_ktn-05-idol-00
 *   * img_card_upper_1_ktn-05-idol-00
 *
 * @param {string} cardAssetId Card asset ID.
 * @param {string} type One of "rect", "full", "thumb", or "upper".
 * @param {boolean} isAwaken Whether to pick the awaken version. Note that some cards only have awaken variants.
 * @param {boolean} hasKizunaAwakening Whether the card have a kizuna awakening illustration.
 * @returns {string} Asset ID.
 */

const CardAsset = ({
    cardAssetId,
    isInitiallyAwaken,
    hasKizunaAwakening,
}: {
    cardAssetId: string
    isInitiallyAwaken: boolean
    hasKizunaAwakening: boolean
}) => {
    const $t = useTranslations('cards_slug')

    const [imageType, setImageType] = useState<CardImageType>('thumb')
    const [awakeningType, setAwakeningType] = useState<number>(1)
    const actualImageType =
        imageType === 'full' && awakeningType === 0 ? 'vfull' : imageType

    const assetSlug = getAssetSlug(cardAssetId, imageType, awakeningType)

    return (
        <div>
            <Radio.Group
                className="mb-3"
                label={$t('Select card type')}
                value={imageType}
                onChange={setImageType as Dispatch<SetStateAction<string>>}
            >
                <Group className="mt-2">
                    <Radio value="thumb" label={$t('Thumbnail')} />
                    <Radio value="upper" label={$t('Vertical')} />
                    <Radio value="rect" label={$t('Landscape')} />
                    <Radio
                        value="full"
                        label={
                            awakeningType > 0
                                ? $t('Landscape (large)')
                                : $t('Vertical (large)')
                        }
                    />
                </Group>
            </Radio.Group>
            <Radio.Group
                className="mb-3"
                label={$t('Select awakening type')}
                value={String(awakeningType)}
                onChange={(x) => {
                    setAwakeningType(Number(x))
                }}
            >
                <Group className="mt-2">
                    <Radio
                        value="0"
                        label={$t('Not awakened')}
                        disabled={isInitiallyAwaken}
                    />
                    <Radio value="1" label={$t('Awakened')} />
                    <Radio
                        value="2"
                        label={$t('Kizuna awakened')}
                        disabled={!hasKizunaAwakening}
                    />
                </Group>
            </Radio.Group>
            <AssetImage
                // TODO
                name={assetSlug}
                ratio={CardSizeConfig['r'][actualImageType]}
                height={CardSizeConfig['h'][actualImageType]}
                alt={'Asset image'}
            />
        </div>
    )
}

export default CardAsset
