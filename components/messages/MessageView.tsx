import { faMessage, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Grid, Group, Stack } from '@mantine/core'
import { MessageGroup } from '@outloudvi/hoshimi-types/ProtoMaster'
import { ReactNode, useState } from 'react'

import { APIResponseOf } from '#utils/api'
import useApi from '#utils/useApi'
import { CharacterChineseNameList, CharacterId } from '#data/vendor/characterId'

// TODO: Responsiveness

const MANAGER_NAME = 'マネージャー'

const ChatList = ({
  groupId,
  setActiveMessageId,
}: {
  groupId: string
  setActiveMessageId: (s: string) => void
}) => {
  const { data: dialogues } = useApi('Message/Group', {
    messageGroupId: groupId,
  })

  return (
    <div className="max-h-72 overflow-y-auto p-2">
      {dialogues ? (
        <Stack>
          {dialogues.map((item, key) => (
            <Button
              key={key}
              onClick={() => {
                setActiveMessageId(item.id)
              }}
            >
              {item.name}
            </Button>
          ))}
        </Stack>
      ) : (
        <div className="text-white text-center">加载中。</div>
      )}
    </div>
  )
}

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

const MessageItem = ({
  children,
  name,
  user,
}: {
  children: ReactNode
  name: string
  user: 'self' | 'others'
}) => {
  const isSelf = user === 'self'
  return (
    <Group className={`p-2 ${isSelf ? 'flex-row-reverse' : 'flex-row'}`}>
      <FontAwesomeIcon icon={faUserCircle} color="white" size="2x" />
      <div>
        {name && <div className="text-white mb-1">{name}</div>}
        <div
          className={`text-black p-2 rounded-2xl ${
            isSelf ? 'bg-green-500 rounded-br-none' : 'bg-white rounded-bl-none'
          }`}
        >
          {children}
        </div>
      </div>
    </Group>
  )
}

const ChatBoard = ({ msg }: { msg: NonNullable<APIResponseOf<'Message'>> }) => {
  const { details } = msg

  return (
    <div className="h-5/6 overflow-y-auto">
      {details.map((line, key) => {
        // TODO
        const isSelection = line.messageDetailId.includes('-')
        return line.text ? (
          <MessageItem
            key={key}
            user={line.characterId ? 'others' : 'self'}
            name={CharacterChineseNameList[line.characterId as CharacterId]}
          >
            {isSelection && <span className="text-gray-600">[选项] </span>}
            {line.text.replaceAll('{user}', MANAGER_NAME)}
          </MessageItem>
        ) : (
          <MessageItem
            key={key}
            user={line.characterId ? 'others' : 'self'}
            name={CharacterChineseNameList[line.characterId as CharacterId]}
          >
            <span className="text-gray-500">[TODO: 其它类别的消息]</span>
          </MessageItem>
        )
      })}
    </div>
  )
}

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

const MessageView = ({ groups }: { groups: APIResponseOf<'MessageGroup'> }) => {
  const [activeGroup, setActiveGroup] = useState<undefined | string>(undefined)
  const [activeMessageId, setActiveMessageId] = useState<undefined | string>(
    undefined
  )

  return (
    <Grid className="h-[80vh] bg-[#4c4c4c] mb-2">
      <Grid.Col xs={12} lg={3} className="p-0 h-full overflow-y-auto">
        {groups.map((group, key) => (
          <ChatItem
            key={key}
            group={group}
            active={group.id === activeGroup}
            onActivate={() => {
              setActiveGroup(group.id)
            }}
            setActiveMessageId={setActiveMessageId}
          />
        ))}
      </Grid.Col>
      <Grid.Col xs={12} lg={9} className="p-0">
        {activeMessageId ? (
          <ChatView messageId={activeMessageId} />
        ) : (
          <div className="flex h-full justify-center items-center">
            <div className="text-white">选择消息。</div>
          </div>
        )}
      </Grid.Col>
    </Grid>
  )
}

export default MessageView
