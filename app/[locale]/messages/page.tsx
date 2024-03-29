import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'

import MessageBoardView from '#components/messages/MessageBoardView'
import { fetchApi } from '#utils/fetchApi'
import { withAsyncMessages } from '#utils/withMessages'
import type { SearchParams } from '#components/messages/sp'
import ChatView from '#components/messages/ChatView'
import type { UnsafeSearchParams } from '#utils/typeutils'
import type { ParamsWithLocale } from '#utils/types'

const MessagesPage = async ({
    searchParams,
    params: { locale },
}: {
    searchParams: UnsafeSearchParams<SearchParams>
} & ParamsWithLocale) => {
    unstable_setRequestLocale(locale)
    const $t = await getTranslations('messages')
    const MessageGroups = await fetchApi('MessageGroup')

    const messageId = searchParams.d ?? null

    return (
        <>
            <h2>{$t('Messages')}</h2>
            <p>{$t('full_screen_advised')}</p>
            <MessageBoardView mdShowSidebar={!messageId} groups={MessageGroups}>
                {messageId ? (
                    <Suspense>
                        <ChatView messageId={String(messageId)} />
                    </Suspense>
                ) : (
                    <></>
                )}
            </MessageBoardView>
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
