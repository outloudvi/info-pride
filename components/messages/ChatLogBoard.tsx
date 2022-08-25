import { useMemo } from 'react'

import MessageItem from './MessageItem'
import renderMessage from './renderMessage'
import buildMessageTree from './buildMessageTree'

import { APIResponseOf } from '#utils/api'

const ChatBoard = ({ msg }: { msg: NonNullable<APIResponseOf<'Message'>> }) => {
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
                >
                    {renderMessage(line, branchSrc[line.messageDetailId])}
                </MessageItem>
            ))}
            <div className="text-gray-300 text-center my-4">[对话结束]</div>
        </div>
    )
}

export default ChatBoard
