import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import MessageSearchMainView from '#components/search/message/MessageSearchMainView'
import { withMessages } from '#utils/withMessages'

const MessageSearchPage = () => {
    const $t = useTranslations('message_search')

    return (
        <>
            <h2>{$t('Message Search')}</h2>
            <p>{$t('description')}</p>
            <MessageSearchMainView />
        </>
    )
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'message_search' })
    return {
        title: $t('Message Search'),
    }
}

export default withMessages(MessageSearchPage, ['message_search', 'v-chr'])
