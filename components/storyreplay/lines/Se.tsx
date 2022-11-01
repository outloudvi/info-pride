import type { Se } from '@hoshimei/adv/types'
import { useTranslations } from 'next-intl'

import AssetAudioButton from '#components/AssetAudioButton'

const CompSe = ({ l }: { l: Se }) => {
    const $t = useTranslations('storyreplay')

    return (
        <>
            <div className="uppercase text-gray-300 text-sm mb-2">
                {$t('SFX')}
                <div className="mt-1">
                    <AssetAudioButton id={l.se} />
                </div>
            </div>
        </>
    )
}

export default CompSe
