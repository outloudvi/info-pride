import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group } from '@mantine/core'
import { MessageGroup } from '@outloudvi/hoshimi-types/ProtoMaster'

import ChatList from './ChatList'

const ChatItem = ({
  group,
  active,
  onActivate,
  setActiveMessageId,
}: {
  group: MessageGroup
  active: boolean
  onActivate: () => void
  setActiveMessageId: (s: string) => void
}) => {
  return (
    <>
      <Group
        className={`px-2 py-3 ${active ? 'bg-blue-800' : ''}`}
        onClick={onActivate}
      >
        <FontAwesomeIcon icon={faUserCircle} color="white" size="3x" />
        <div>
          <b className="text-white">{group.name}</b>
          <br />
          <span className="text-gray-400">{group.name}</span>
        </div>
      </Group>
      {active && (
        <ChatList groupId={group.id} setActiveMessageId={setActiveMessageId} />
      )}
    </>
  )
}

export default ChatItem
