import { AttributeType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'

import getCardColorClassName from '#utils/getCardColorClassName'

function formatNumber(n: number) {
    // add commas to number
    return n.toLocaleString('en-US')
}

const PropValueBg = ({
    type,
    bold,
    value,
}: {
    type: AttributeType | 'stamina'
    bold: boolean
    value: number
}) => {
    const $v = useTranslations('vendor')
    return (
        <span
            className={`text-lg px-1 border-solid border-0 border-b-4 rounded ${
                getCardColorClassName(type as AttributeType, 'border-') ||
                'border-stamina'
            } ${bold ? 'font-bold' : ''}${
                // generate their CSS
                // eslint-disable-next-line no-constant-condition
                0 ? 'border-vocal border-dance border-visual' : ''
            }`}
            aria-label={$v(AttributeType[type as AttributeType] || 'Stamina')}
        >
            {formatNumber(value)}
        </span>
    )
}

export default PropValueBg
