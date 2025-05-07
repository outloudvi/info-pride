import { Card } from '@mantine/core'
import type { CommuX } from 'hoshimi-types/types'
import { useLocale } from 'next-intl'
import Link from 'next/link'

import managerize from '#utils/managerize'
import lfToBr from '#utils/lfToBr'

const StorySearchItem = ({ item }: { item: CommuX }) => {
    const locale = useLocale()

    return (
        <Card>
            <div className="mb-2">
                <b>{managerize(item.name)}</b>
                <p lang="ja">
                    {lfToBr(
                        // TODO: Why?
                        item.text.replaceAll('\\n', '\n'),
                    )}
                </p>
            </div>
            <Link href={`/${locale}/story/by-part/${item.advAssetId}`}>
                <small className="my-2">{item.title}</small>
            </Link>
        </Card>
    )
}

export default StorySearchItem
