import { AttributeType } from 'hoshimi-types/ProtoEnum'

export default function getCardColorClassName(
    color: AttributeType,
    prefix = 'text-',
): string {
    switch (color) {
        case AttributeType.Vocal:
            return prefix + 'vocal'
        case AttributeType.Dance:
            return prefix + 'dance'
        case AttributeType.Visual:
            return prefix + 'visual'
        default:
            return ''
    }
}
