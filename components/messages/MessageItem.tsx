import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group } from '@mantine/core'
import { ReactNode } from 'react'

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

export default MessageItem
