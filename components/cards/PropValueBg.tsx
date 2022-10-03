import { useTranslations } from 'next-intl'

function formatNumber(n: number) {
    // add commas to number
    return n.toLocaleString('en-US')
}

const PropValueBg = ({
    className,
    value,
}: {
    className?: string
    value: number
}) => {
    const $t = useTranslations('cards')

    return (
        <span
            className={`text-lg opacity-70 ${className ?? ''}`}
            aria-label={$t('maxRatioPermil')}
        >
            {formatNumber(value)}
        </span>
    )
}

export default PropValueBg
