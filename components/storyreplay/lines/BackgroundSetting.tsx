import type { BackgroundSetting } from '@hoshimei/adv/types'
import { useTranslations } from 'next-intl'

import AssetImage from '#components/AssetImage'

const CompBackgroundSetting = ({ l }: { l: BackgroundSetting }) => {
    const $t = useTranslations('storyreplay')

    return (
        <>
            <div className="uppercase text-gray-300 text-sm mb-2">
                {$t('Background')}
            </div>
            <div className="mx-[5%]">
                <AssetImage
                    name={`env_adv_2d_${l.id}`}
                    ratio={16 / 9}
                    width={'100%'}
                    alt={`Image: ${l.id}`}
                />
            </div>
        </>
    )
}

export default CompBackgroundSetting
