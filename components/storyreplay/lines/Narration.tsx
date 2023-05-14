import type { Narration } from '@hoshimei/adv/types'
import { useTranslations } from 'next-intl'

import lfToBr from '#utils/lfToBr'

const CompNarration = ({ l }: { l: Narration }) => {
    const $t = useTranslations('storyreplay')

    return (
        <>
            <div className="uppercase text-gray-300 text-sm mb-2">
                {$t('Narration')}
            </div>
            <div
                className="text-gray-200 mx-1 md:mx-2 text-center md:text-left"
                lang="ja"
            >
                {lfToBr(l.text.replaceAll('\\n', '\n'))}
            </div>
        </>
    )
}

export default CompNarration
