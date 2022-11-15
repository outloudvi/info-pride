import { useTranslations } from 'next-intl'

import AssetImage from '#components/AssetImage'

const CompBackgroundSetting = ({ id }: { id: string }) => {
    const $t = useTranslations('storyreplay')

    return (
        <>
            <div className="uppercase text-gray-300 text-sm mb-2">
                {$t('Background')}
            </div>
            <div className="mx-[5%]">
                <AssetImage
                    name={id}
                    ratio={16 / 9}
                    width={'100%'}
                    alt={`Image: ${id}`}
                />
            </div>
        </>
    )
}

export default CompBackgroundSetting
