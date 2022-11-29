import { Grid } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import { useViewportSize } from '@mantine/hooks'

import CharacterItem from './CharacterItem'
import TalkView from './TalkView'
import type { CharacterIdWithManager } from './types'

import { MessageCharacterIds } from '#data/vendor/characterId'

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
            <Grid className="h-full bg-[#4c4c4c] m-0">
                <Grid.Col xs={3} className="p-0 h-full overflow-y-auto">
                    <CharacterItem
                        id={''}
                        active={'' === currChrId}
                        setActive={setCurrChrId}
                    />
                    {MessageCharacterIds.map((item, key) => (
                        <CharacterItem
                            key={key}
                            id={item}
                            active={item === currChrId}
                            setActive={setCurrChrId}
                        />
                    ))}
                </Grid.Col>
                <Grid.Col xs={9} className="p-0 h-full">
                    <TalkView currChrId={currChrId} />
                </Grid.Col>
            </Grid>
        </div>
    )
}

export default EditorView
