import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { ActionIcon, Group, Textarea, TextInput } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEllipsisVertical,
    faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'

import type { CharacterIdWithManager, CommuLine, EditorPref } from './types'
import CharacterIcon from './CharacterIcon'

const Compose = ({
    currChrId,
    setCommuData,
    setPref,
}: {
    currChrId: CharacterIdWithManager
    setCommuData: Dispatch<SetStateAction<CommuLine[]>>
    setPref: Dispatch<SetStateAction<EditorPref>>
}) => {
    const [text, setText] = useState('')

    const submit = () => {
        if (text.trim() === '') return
        setCommuData((x) => [
            ...x,
            {
                characterId: currChrId,
                text,
            },
        ])
        setText('')
    }

    return (
        <Group className="p-2 min-h-[32px] max-h-[128px]">
            <ActionIcon
                variant="outline"
                onClick={() => {
                    setPref((x) => ({
                        ...x,
                        expandMenu: !x.expandMenu,
                    }))
                }}
            >
                <FontAwesomeIcon icon={faEllipsisVertical} color="white" />
            </ActionIcon>
            <CharacterIcon id={currChrId} />
            <Textarea
                className="flex-grow min-h-[32px] max-h-[128px]"
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
            />
            <ActionIcon variant="outline" onClick={submit}>
                <FontAwesomeIcon icon={faPaperPlane} color="white" />
            </ActionIcon>
        </Group>
    )
}

export default Compose
