import { useTranslations } from 'next-intl'

function formatNumber(n: number) {
    // add commas to number
    return n.toLocaleString('en-US')
}

const PropValueBg = ({
    className,
    maxValue,
}: {
    className?: string
    maxValue: number
}) => {
    const $t = useTranslations('cards')

    return (
        <div
            className={`text-right text-3xl opacity-70 ${className ?? ''}`}
            aria-label={$t('maxValue')}
        >
            {formatNumber(maxValue)}
        </div>
    )
}

export default PropValueBg
