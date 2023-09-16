// see also: backend/denoland/backend/utils/calcPropValue.ts
export default function calcPropValue(
    base: number,
    paramValue: number,
    rarityBonusPermil: number,
): number {
    return Math.floor(
        (Math.floor((paramValue * base) / 1000) * rarityBonusPermil) / 1000,
    )
}
