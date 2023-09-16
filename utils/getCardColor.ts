import { AttributeType } from 'hoshimi-types/ProtoEnum'
import { Card } from 'hoshimi-types/ProtoMaster'

export default function getCardColor(
    card: Pick<
        Card,
        'vocalRatioPermil' | 'danceRatioPermil' | 'visualRatioPermil'
    >,
): AttributeType {
    const { vocalRatioPermil, danceRatioPermil, visualRatioPermil } = card
    if (
        vocalRatioPermil > danceRatioPermil &&
        vocalRatioPermil > visualRatioPermil
    ) {
        return AttributeType.Vocal
    }
    if (
        danceRatioPermil > vocalRatioPermil &&
        danceRatioPermil > visualRatioPermil
    ) {
        return AttributeType.Dance
    }
    if (
        visualRatioPermil > vocalRatioPermil &&
        visualRatioPermil > danceRatioPermil
    ) {
        return AttributeType.Visual
    }
    return AttributeType.Unknown
}
