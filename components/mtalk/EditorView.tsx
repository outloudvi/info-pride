'use client'

import { Flex } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import { useViewportSize } from '@mantine/hooks'

import CharacterItem from './CharacterItem'
import TalkView from './TalkView'
import type { CharacterIdWithManager } from './types'

import { PrimaryCharacterIds } from '#data/vendor/characterId'

const EditorView = () => {
    const outer = useRef<HTMLDivElement | null>(null)
    const { height } = useViewportSize()

    useEffect(() => {
        if (!outer.current) return
        const elem = outer.current
        elem.style.height = String(height - elem.offsetTop - 140) + 'px'
    }, [height])

    const [currChrId, setCurrChrId] =
        useState<CharacterIdWithManager>('char-ktn')

    return (
        <div ref={outer}>
            <Flex className="h-full bg-[#4c4c4c] m-0 max-w-5xl mx-auto">
                <div
                    className="p-0 h-full overflow-y-auto"
                    style={{
                        flex: '1 0 200px',
                    }}
                >
                    <CharacterItem
                        id={''}
                        active={'' === currChrId}
                        setActive={setCurrChrId}
                    />
                    {PrimaryCharacterIds.map((item, key) => (
                        <CharacterItem
                            key={key}
                            id={item}
                            active={item === currChrId}
                            setActive={setCurrChrId}
                        />
                    ))}
                </div>
                <TalkView currChrId={currChrId} />
            </Flex>
        </div>
    )
}

export default EditorView
