import { Button, Card } from '@mantine/core'
import type { CommuX } from 'hoshimi-types/types'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import managerize from '#utils/managerize'

const StorySearchItem = ({ item }: { item: CommuX }) => {
    const $t = useTranslations('story_search')

    return (
        <Card>
            <div>
                <span>
                    <b>{managerize(item.name)}</b>
                </span>
                <p lang="ja">{item.text}</p>
            </div>
            <Link href={`/story/by-part/${item.advAssetId}`}>
                <Button>{$t('Original story')}</Button>
            </Link>
            <small className="ml-3">{item.title}</small>
        </Card>
    )
}

export default StorySearchItem
