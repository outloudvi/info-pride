import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group } from '@mantine/core'

import ChatBoard from './ChatBoard'

import useApi from '#utils/useApi'

const ChatView = ({ messageId }: { messageId: string }) => {
  const { data: msg } = useApi('Message', {
    id: messageId,
  })

  if (!msg) {
    return (
      <div className="flex h-full justify-center items-center">
        <div className="text-white">正在加载。</div>
      </div>
    )
  }

  return (
    <>
      <Group
        className="h-1/6 text-white bg-neutral-800 py-3 pl-3"
        align="center"
      >
        <FontAwesomeIcon icon={faMessage} color="white" size="4x" />
        <span className="ml-3 text-5xl">{msg.name}</span>
      </Group>
      <ChatBoard msg={msg} />
    </>
  )
}

export default ChatView
