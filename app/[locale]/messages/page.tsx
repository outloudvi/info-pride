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
    searchParams: searchParamsPromise,
    params,
}: {
    searchParams: Promise<UnsafeSearchParams<SearchParams>>
} & ParamsWithLocale) => {
    const searchParams = await searchParamsPromise
    const { locale } = await params
    unstable_setRequestLocale(locale)
    const $t = await getTranslations({ locale, namespace: 'messages' })
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
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const $t = await getTranslations({ locale, namespace: 'messages' })
    return {
        title: $t('Messages'),
    }
}

export default withAsyncMessages(MessagesPage, ['messages'])
