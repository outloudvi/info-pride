import type { Bgm } from '@hoshimei/adv/types'
import { useTranslations } from 'next-intl'

import AssetAudio from '#components/AssetAudio'

const CompBgm = ({ l }: { l: Bgm }) => {
    const $t = useTranslations('storyreplay')

    return (
        <>
            <div className="uppercase text-gray-300 text-sm mb-2">
                {$t('BGM')}
                <div className="mt-1">
                    <AssetAudio id={l.bgm} />
                </div>
            </div>
        </>
    )
}

export default CompBgm
