'use client'

import { Grid, GridCol } from '@mantine/core'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useViewportSize } from '@mantine/hooks'
import dynamic from 'next/dynamic'

import ChatItem from './ChatItem'
import type { SearchParams } from './sp'

import type { APIResponseOf } from '#utils/api'
import useSetSearchParams from '#utils/useSetSearchParams'

const FullScreenButton = dynamic(() => import('#components/FullScreenButton'), {
    ssr: false,
})

const MessageBoardView = ({
    groups,
    children,
    mdShowSidebar,
}: {
    groups: APIResponseOf<'MessageGroup'>
    children: JSX.Element
    mdShowSidebar: boolean
}) => {
    const [activeGroup, setActiveGroup] = useState<undefined | string>(
        undefined,
    )
    const outer = useRef<HTMLDivElement | null>(null)
    const { height } = useViewportSize()
    const { setSearch } = useSetSearchParams<SearchParams>()

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
                        <Suspense fallback={<div>3</div>}>
                            <FullScreenButton target={outer} />
                        </Suspense>
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
                                setSearch('d', a)
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
                    {children}
                </GridCol>
            </Grid>
        </div>
    )
}

export default MessageBoardView
