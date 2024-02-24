import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group } from '@mantine/core'
import { getTranslations } from 'next-intl/server'

import ChatBoard from './ChatLogBoard'
import BackButton from './BackButton'

import { fetchApi } from '#utils/fetchApi'

const ChatView = async ({ messageId }: { messageId: string }) => {
    const $c = await getTranslations('common')
    const msg = await fetchApi('Message', {
        id: messageId,
    })

    if (!msg) {
        return (
            <div className="flex h-full justify-center items-center flex-col">
                <div className="text-white">{$c('loading')}</div>
                <BackButton style="button" />
            </div>
        )
    }

    return (
        <>
            <Group
                className="h-[4rem] text-white bg-neutral-800 py-3 pl-3 flex-nowrap"
                align="center"
            >
                <BackButton style="icon" />
                <FontAwesomeIcon icon={faMessage} color="white" size="2x" />
                <span className="text-2xl">{msg.name}</span>
            </Group>
            <ChatBoard msg={msg} />
        </>
    )
}

export default ChatView
