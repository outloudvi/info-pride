import { Button, Stack } from '@mantine/core'

import useApi from '#utils/useApi'

const ChatList = ({
    groupId,
    setActiveMessageId,
}: {
    groupId: string
    setActiveMessageId: (s: string) => void
}) => {
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
                <div className="text-white text-center">加载中。</div>
            )}
        </div>
    )
}

export default ChatList
