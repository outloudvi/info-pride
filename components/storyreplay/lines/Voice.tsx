import type { Voice } from '@hoshimei/adv/types'
import { useTranslations } from 'next-intl'

import AssetAudioButton from '#components/AssetAudioButton'

const CompVoice = ({ l }: { l: Voice }) => {
    const $t = useTranslations('storyreplay')

    return (
        <>
            <div className="uppercase text-gray-300 text-sm mb-2">
                {$t('Voice')}
                <AssetAudioButton id={l.voice} />
            </div>
        </>
    )
}

export default CompVoice
