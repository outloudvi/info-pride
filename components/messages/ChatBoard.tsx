import { useMemo } from 'react'

import MessageItem from './MessageItem'
import renderMessage from './renderMessage'
import buildMessageTree from './buildMessageTree'

import { APIResponseOf } from '#utils/api'

const ChatBoard = ({ msg }: { msg: NonNullable<APIResponseOf<'Message'>> }) => {
  const { details } = msg

  const { msgs, backlinks } = useMemo(
    () => buildMessageTree(details),
    [details]
  )

  return (
    <div className="h-5/6 overflow-y-auto">
      {msgs.map((line, key) => (
        <MessageItem
          key={key}
          characterId={line.characterId}
          user={line.characterId ? 'others' : 'self'}
        >
          {renderMessage(line, backlinks[line.messageDetailId])}
        </MessageItem>
      ))}
    </div>
  )
}

export default ChatBoard
