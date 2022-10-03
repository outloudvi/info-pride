import { AttributeType } from 'hoshimi-types/ProtoEnum'

export default function getCardColorClassName(color: AttributeType): string {
    switch (color) {
        case AttributeType.Vocal:
            return 'text-vocal'
        case AttributeType.Dance:
            return 'text-dance'
        case AttributeType.Visual:
            return 'text-visual'
        default:
            return ''
    }
}
