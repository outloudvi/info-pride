import { Group } from '@mantine/core'
import { MessageGroup } from 'hoshimi-types/ProtoMaster'

import ChatList from './ChatList'

import AssetImage from '#components/AssetImage'

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
        <AssetImage
          name={`img_message_icon_${group.assetId}`}
          width={50}
          ratio={1}
          className="rounded-full"
          alt="Chat icon"
        />
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
