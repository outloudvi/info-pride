import { Card } from '@mantine/core'
import type { MessageX } from 'hoshimi-types/types'
import { useTranslations } from 'next-intl'

import { Link } from '#utils/navigation'

const MessageSearchItem = ({ item }: { item: MessageX }) => {
    const $v = useTranslations('v-chr')

    return (
        <Card>
            <div>
                <small>
                    {$v(item.characterGroupId)} -{' '}
                    <Link href={`/messages?d=${item.id}`}>{item.name}</Link>
                </small>
                <p lang="ja">
                    <span>
                        {item.characterId ? $v(item.characterId) : 'マネジャー'}
                    </span>
                    <br />
                    <b>{item.text}</b>
                </p>
            </div>
        </Card>
    )
}

export default MessageSearchItem
