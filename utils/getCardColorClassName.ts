import { AttributeType } from 'hoshimi-types/ProtoEnum'
import type { Card } from 'hoshimi-types/ProtoMaster'

import getCardColor from './getCardColor'

export default function getCardColorClassName(
    card: Pick<
        Card,
        'vocalRatioPermil' | 'danceRatioPermil' | 'visualRatioPermil'
    >
): string {
    const cardColor = getCardColor(card)

    switch (cardColor) {
        case AttributeType[AttributeType.Vocal]:
            return 'text-vocal'
        case AttributeType[AttributeType.Dance]:
            return 'text-dance'
        case AttributeType[AttributeType.Visual]:
            return 'text-visual'
        default:
            return ''
    }
}
