import type { Voice } from '@hoshimei/adv/types'
import { useTranslations } from 'next-intl'

import AssetAudioButton from '#components/AssetAudioButton'
import { ForwardedRef, forwardRef } from 'react'

const CompVoice = forwardRef(
    ({ l }: { l: Voice }, ref: ForwardedRef<HTMLAudioElement>) => {
        const $t = useTranslations('storyreplay')

        return (
            <>
                <div className="uppercase text-gray-300 text-sm mb-2">
                    {$t('Voice')}
                    <AssetAudioButton id={l.voice} ref={ref} />
                </div>
            </>
        )
    },
)

export default CompVoice
