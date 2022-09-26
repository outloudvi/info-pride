import { faArrowLeft, faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Group } from '@mantine/core'
import { useTranslations } from 'next-intl'

import ChatBoard from './ChatLogBoard'

import useApi from '#utils/useApi'

const ChatView = ({
    messageId,
    mdBackToSidebar,
}: {
    messageId: string
    mdBackToSidebar: () => void
}) => {
    const $c = useTranslations('common')
    const { data: msg } = useApi('Message', {
        id: messageId,
    })

    if (!msg) {
        return (
            <div className="flex h-full justify-center items-center flex-col">
                <div className="text-white">{$c('Loading...')}</div>
                <Button
                    className="mt-2"
                    onClick={() => {
                        mdBackToSidebar()
                    }}
                >
                    {$c('Back')}
                </Button>
            </div>
        )
    }

    return (
        <>
            <Group
                className="h-[4rem] text-white bg-neutral-800 py-3 pl-3 flex-nowrap"
                align="center"
            >
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    color="white"
                    size="2x"
                    onClick={mdBackToSidebar}
                    className="lg:hidden"
                />
                <FontAwesomeIcon icon={faMessage} color="white" size="2x" />
                <span className="text-2xl">{msg.name}</span>
            </Group>
            <ChatBoard msg={msg} />
        </>
    )
}

export default ChatView
