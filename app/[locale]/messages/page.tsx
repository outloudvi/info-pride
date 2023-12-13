import { getTranslations } from 'next-intl/server'

import MessageBoardView from '#components/messages/MessageBoardView'
import { fetchApi } from '#utils/fetchApi'
import { withAsyncMessages } from '#utils/withMessages'

const MessagesPage = async () => {
    const $t = await getTranslations('messages')
    const MessageGroups = await fetchApi('MessageGroup')

    return (
        <>
            <h2>{$t('Messages')}</h2>
            <p>{$t('full_screen_advised')}</p>
            <MessageBoardView groups={MessageGroups} />
        </>
    )
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'messages' })
    return {
        title: $t('Messages'),
    }
}

export default withAsyncMessages(MessagesPage, ['messages'])
