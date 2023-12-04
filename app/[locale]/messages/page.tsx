import { getTranslations } from 'next-intl/server'

import Title from '#components/Title'
import MessageBoardView from '#components/messages/MessageBoardView'
import { fetchApi } from '#utils/fetchApi'

const MessagesPage = async () => {
    const $t = await getTranslations('messages')
    const MessageGroups = await fetchApi('MessageGroup')

    return (
        <>
            <Title title={$t('Messages')} />
            <p>{$t('full_screen_advised')}</p>
            <MessageBoardView groups={MessageGroups} />
        </>
    )
}

export default MessagesPage
