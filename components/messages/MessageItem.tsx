import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group } from '@mantine/core'
import { ReactNode } from 'react'

import { CharacterChineseNameList, CharacterId } from '#data/vendor/characterId'
import AssetImage from '#components/AssetImage'

const MessageItem = ({
  children,
  characterId,
  user,
}: {
  children: ReactNode
  characterId: CharacterId | string
  user: 'self' | 'others'
}) => {
  const isSelf = user === 'self'
  const userIcon =
    user === 'others' ? (
      <AssetImage
        name={`img_message_icon_${characterId.split('-')[1]}`}
        height={40}
        ratio={1}
        alt="Contact icon"
      />
    ) : (
      <FontAwesomeIcon icon={faUserCircle} color="white" size="2x" />
    )
  return (
    <Group
      className={`p-2 items-end ${isSelf ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {userIcon}
      <div>
        <div className="text-white mb-1">
          {CharacterChineseNameList[characterId as CharacterId]}
        </div>
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

export default MessageItem
