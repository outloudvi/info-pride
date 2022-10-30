import type { Bgm } from '@hoshimei/adv/types'
import { useTranslations } from 'next-intl'

const CompBgm = ({ l }: { l: Bgm }) => {
    const $t = useTranslations('storyreplay')

    return (
        <>
            <div className="uppercase text-gray-300 text-sm mb-2">
                {$t('BGM')}
            </div>
        </>
    )
}

export default CompBgm
