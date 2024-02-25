export type CardImageType = 'thumb' | 'rect' | 'upper' | 'full'

export function getAssetSlug(
    cardAssetId: string,
    type: CardImageType,
    isAwaken: boolean,
): string {
    return `img_card_${type}_${isAwaken ? 1 : 0}_${cardAssetId}`
}

export const CardSizeConfig: {
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
