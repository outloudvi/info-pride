import type { Se } from '@hoshimei/adv/types'
import { useTranslations } from 'next-intl'

const CompSe = ({ l }: { l: Se }) => {
    const $t = useTranslations('storyreplay')

    return (
        <>
            <div className="uppercase text-gray-300 text-sm mb-2">
                {$t('SFX')}
            </div>
        </>
    )
}

export default CompSe
