import { useTranslations } from 'next-intl'

import { toVideoLink } from '#components/ExternalVideo'
import { ChapterItem } from '#data/types'

const SpecialStoriesItem = ({ item }: { item: ChapterItem }) => {
    const $c = useTranslations('common')
    const { name, video } = item

    return (
        <>
            <div className="text-4xl">{name}</div>
            <p>
                <a
                    href={toVideoLink(video)}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {$c('Video')}
                </a>
            </p>
        </>
    )
}

export default SpecialStoriesItem
