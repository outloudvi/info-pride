import { Grid } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'

import ChatItem from './ChatItem'
import ChatView from './ChatView'

import { APIResponseOf } from '#utils/api'

const MessageBoardView = ({
  groups,
}: {
  groups: APIResponseOf<'MessageGroup'>
}) => {
  const [activeGroup, setActiveGroup] = useState<undefined | string>(undefined)
  const [activeMessageId, setActiveMessageId] = useState<undefined | string>(
    undefined
  )
  const [mdShowSidebar, setMdShowSidebar] = useState(true)
  const outer = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!outer.current) return
    const elem = outer.current
    console.log(window.innerHeight, elem.offsetHeight)
    elem.style.height = String(window.innerHeight - elem.offsetTop - 100) + 'px'
  }, [outer])

  return (
    <div ref={outer}>
      <Grid className="h-full bg-[#4c4c4c] mb-2">
        <Grid.Col
          xs={12}
          lg={3}
          className={`p-0 h-full overflow-y-auto ${
            mdShowSidebar ? '' : 'hidden lg:block'
          }`}
        >
          {groups.map((group, key) => (
            <ChatItem
              key={key}
              group={group}
              active={group.id === activeGroup}
              onActivate={() => {
                setActiveGroup(group.id)
              }}
              setActiveMessageId={(a) => {
                setMdShowSidebar(false)
                setActiveMessageId(a)
              }}
            />
          ))}
        </Grid.Col>
        <Grid.Col
          xs={12}
          lg={9}
          className={`p-0 h-full ${mdShowSidebar ? 'hidden lg:block' : ''}`}
        >
          {activeMessageId ? (
            <ChatView
              messageId={activeMessageId}
              mdBackToSidebar={() => {
                setMdShowSidebar(true)
              }}
            />
          ) : (
            <div className="flex h-full justify-center items-center">
              <div className="text-white">选择消息。</div>
            </div>
          )}
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default MessageBoardView
