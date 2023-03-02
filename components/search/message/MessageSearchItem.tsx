import { Card } from '@mantine/core'
import type { MessageX } from 'hoshimi-types/types'
import { useTranslations } from 'next-intl'

const MessageSearchItem = ({ item }: { item: MessageX }) => {
    const $v = useTranslations('v-chr')

    return (
        <Card>
            <div>
                <small>
                    {$v(item.characterGroupId)} - {item.name}
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
