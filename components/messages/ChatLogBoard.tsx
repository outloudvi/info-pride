import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

import MessageItem from './MessageItem'
import renderMessage from './renderMessage'
import buildMessageTree from './buildMessageTree'

import type { APIResponseOf } from '#utils/api'

const ChatLogBoard = ({
    msg,
}: {
    msg: NonNullable<APIResponseOf<'Message'>>
}) => {
    const $t = useTranslations('messages')

    const { details } = msg

    const { msgs, branchSrc } = useMemo(
        () => buildMessageTree(details),
        [details]
    )

    return (
        <div
            className="overflow-y-auto"
            style={{
                height: 'calc(100% - 4rem)',
            }}
        >
            {msgs.map((line, key) => (
                <MessageItem
                    key={key}
                    characterId={line.characterId}
                    user={line.characterId ? 'others' : 'self'}
                    isTransparent={Boolean(line.stampAssetId)}
                >
                    {renderMessage(line, $t, branchSrc[line.messageDetailId])}
                </MessageItem>
            ))}
            <div className="text-gray-300 text-center my-4">
                [{$t('Communication ended.')}]
            </div>
        </div>
    )
}

export default ChatLogBoard
