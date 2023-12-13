'use client'

import { Grid, GridCol } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import { useViewportSize } from '@mantine/hooks'
import { useTranslations } from 'next-intl'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'

import ChatItem from './ChatItem'
import ChatView from './ChatView'

import type { APIResponseOf } from '#utils/api'
import withQueryParam from '#utils/withQueryParam'
import FullScreenButton from '#components/FullScreenButton'

const MessageBoardView = ({
    groups,
}: {
    groups: APIResponseOf<'MessageGroup'>
}) => {
    const $t = useTranslations('messages')
    const [activeGroup, setActiveGroup] = useState<undefined | string>(
        undefined,
    )
    const [activeMessageId, setActiveMessageId] = useQueryParam(
        'd',
        withDefault(StringParam, ''),
    )
    const [mdShowSidebar, setMdShowSidebar] = useState(true)
    const outer = useRef<HTMLDivElement | null>(null)
    const { height } = useViewportSize()

    useEffect(() => {
        if (activeMessageId) {
            setMdShowSidebar(false)
        }
    }, [activeMessageId])

    useEffect(() => {
        if (!outer.current) return
        const elem = outer.current
        elem.style.height = String(height - elem.offsetTop - 140) + 'px'
    }, [height])

    return (
        <div ref={outer}>
            <Grid
                className="h-full bg-[#4c4c4c] m-0"
                classNames={{
                    inner: 'h-full w-full m-0',
                }}
            >
                <GridCol
                    span={{
                        base: 12,
                        lg: 3,
                    }}
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
                                setActiveMessageId(a)
                            }}
                        />
                    ))}
                </GridCol>
                <GridCol
                    span={{
                        base: 12,
                        lg: 9,
                    }}
                    className={`p-0 h-full ${
                        mdShowSidebar ? 'hidden lg:block' : ''
                    }`}
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
                            <div className="text-white">
                                {$t('select_a_commu')}
                            </div>
                        </div>
                    )}
                </GridCol>
            </Grid>
        </div>
    )
}

export default withQueryParam(MessageBoardView)
