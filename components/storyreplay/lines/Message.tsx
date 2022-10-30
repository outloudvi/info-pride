import type { Message } from '@hoshimei/adv/types'
import { useTranslations } from 'next-intl'

import AssetImage from '#components/AssetImage'

const CompMessage = ({ l }: { l: Message }) => {
    const $t = useTranslations('storyreplay')

    return (
        <>
            <div className="uppercase text-gray-300 text-sm mb-2">
                {$t('Message')}
            </div>
            <div className="flex items-center">
                <div className="flex flex-col items-center mr-2 w-24">
                    <div>
                        {l.thumbnail && (
                            <AssetImage
                                name={l.thumbnail}
                                height={40}
                                ratio={1}
                                alt={'Avatar'}
                            />
                        )}
                    </div>
                    <div className="mt-1 bg-blue-300 px-2 rounded text-black">
                        {l.name === '{user}' ? $t('Manager') : l.name}
                    </div>
                </div>
                <div className="grow">{l.text}</div>
            </div>
        </>
    )
}

export default CompMessage
