import { Button, Stack } from '@mantine/core'
import { useTranslations } from 'next-intl'

import useApi from '#utils/useApi'

const ChatList = ({
    groupId,
    setActiveMessageId,
}: {
    groupId: string
    setActiveMessageId: (s: string) => void
}) => {
    const $c = useTranslations('common')
    const { data: dialogues } = useApi('Message/Group', {
        messageGroupId: groupId,
    })

    return (
        <div className="max-h-72 overflow-y-auto p-2">
            {dialogues ? (
                <Stack>
                    {dialogues.map((item, key) => (
                        <Button
                            key={key}
                            onClick={() => {
                                setActiveMessageId(item.id)
                            }}
                        >
                            {item.name}
                        </Button>
                    ))}
                </Stack>
            ) : (
                <div className="text-white text-center">{$c('Loading...')}</div>
            )}
        </div>
    )
}

export default ChatList
