import { Dispatch, SetStateAction, useState } from 'react'
import { Radio, Switch } from '@mantine/core'

import AssetImage from '#components/AssetImage'

type CardImageType = 'thumb' | 'rect' | 'upper' | 'full'

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
 * @returns {string} Asset ID.
 */
export function getAssetSlug(
    cardAssetId: string,
    type: CardImageType,
    isAwaken: boolean
): string {
    return `img_card_${type}_${isAwaken ? 1 : 0}_${cardAssetId}`
}

const CONF: {
    r: Record<CardImageType, number>
    h: Record<CardImageType, string | number>
} = {
    r: {
        thumb: 1,
        full: 1 / 0.56,
        rect: 1 / 0.56,
        upper: 0.5,
    },
    h: {
        thumb: 150,
        full: 512,
        rect: 256,
        upper: 360,
    },
}

const CardAsset = ({
    cardAssetId,
    isInitiallyAwaken,
}: {
    cardAssetId: string
    isInitiallyAwaken: boolean
}) => {
    const [isAwaken, setIsAwaken] = useState(true)
    const [imageType, setImageType] = useState<CardImageType>('thumb')

    const assetSlug = getAssetSlug(cardAssetId, imageType, isAwaken)

    return (
        <div>
            <Radio.Group
                className="mb-3"
                label="选择卡面类型"
                value={imageType}
                onChange={setImageType as Dispatch<SetStateAction<string>>}
                required
            >
                <Radio value="thumb" label="缩略图" />
                <Radio value="upper" label="纵向" />
                <Radio value="rect" label="横向" />
                <Radio value="full" label="横向（大图）" />
            </Radio.Group>
            <Switch
                className="mb-3"
                checked={isAwaken}
                label={
                    isInitiallyAwaken
                        ? '此卡片只有觉醒后卡面'
                        : '显示觉醒后卡面'
                }
                disabled={isInitiallyAwaken}
                onChange={(event) => setIsAwaken(event.currentTarget.checked)}
            />
            <AssetImage
                // TODO
                name={assetSlug}
                ratio={CONF['r'][imageType]}
                height={CONF['h'][imageType]}
                alt={'Asset image'}
            />
        </div>
    )
}

export default CardAsset
