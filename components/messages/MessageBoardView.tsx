import { Grid } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

import ChatItem from './ChatItem'
import ChatView from './ChatView'

import { APIResponseOf } from '#utils/api'

const FullScreenButton = dynamic(() => import('#components/FullScreenButton'), {
  ssr: false,
})

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
    const callback = () => {
      if (!outer.current) return
      const elem = outer.current
      elem.style.height =
        String(window.innerHeight - elem.offsetTop - 140) + 'px'
    }
    callback()
    window.addEventListener('resize', callback)
    return () => window.removeEventListener('resize', callback)
  }, [])

  return (
    <div ref={outer} className="p-[8px]">
      <Grid className="h-full bg-[#4c4c4c] mb-2">
        <Grid.Col
          xs={12}
          lg={3}
          className={`p-0 h-full overflow-y-auto ${
            mdShowSidebar ? '' : 'hidden lg:block'
          }`}
        >
          <div className="flex justify-center my-2">
            <FullScreenButton target={outer} />
          </div>
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
