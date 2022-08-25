import { AttributeType } from 'hoshimi-types/ProtoEnum'
import { Card } from 'hoshimi-types/ProtoMaster'

export default function getCardColor(
    card: Pick<
        Card,
        'vocalRatioPermil' | 'danceRatioPermil' | 'visualRatioPermil'
    >
): typeof AttributeType[number] {
    const { vocalRatioPermil, danceRatioPermil, visualRatioPermil } = card
    if (
        vocalRatioPermil > danceRatioPermil &&
        vocalRatioPermil > visualRatioPermil
    ) {
        return AttributeType[AttributeType.Vocal]
    }
    if (
        danceRatioPermil > vocalRatioPermil &&
        danceRatioPermil > visualRatioPermil
    ) {
        return AttributeType[AttributeType.Dance]
    }
    if (
        visualRatioPermil > vocalRatioPermil &&
        visualRatioPermil > danceRatioPermil
    ) {
        return AttributeType[AttributeType.Visual]
    }
    return AttributeType[AttributeType.Unknown]
}
