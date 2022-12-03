import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { ActionIcon, Group, Textarea, Tooltip } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCirclePlus,
    faEllipsisVertical,
    faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
import { useTranslations } from 'next-intl'

import type { CharacterIdWithManager, CommuLine, EditorPref } from './types'
import CharacterIcon from './CharacterIcon'
import InsertStampModal from './InsertStampModal'

const Compose = ({
    currChrId,
    setCommuData,
    setPref,
}: {
    currChrId: CharacterIdWithManager
    setCommuData: Dispatch<SetStateAction<CommuLine[]>>
    setPref: Dispatch<SetStateAction<EditorPref>>
}) => {
    const $t = useTranslations('mtalk')

    const [text, setText] = useState('')
    const [insertStampModal, setInsertStampModal] = useState(false)

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
        setPref((x) => ({
            ...x,
            setupScrollToBottom: true,
        }))
    }

    const insertStamp = (stampAssetId: string) => {
        setCommuData((x) => [
            ...x,
            {
                characterId: currChrId,
                stampAssetId,
            },
        ])
    }

    return (
        <>
            <InsertStampModal
                visible={insertStampModal}
                setVisible={setInsertStampModal}
                insertStamp={insertStamp}
            />
            <Group className="p-2 min-h-[32px] max-h-[128px]">
                <Tooltip label={$t('Toggle menu')}>
                    <ActionIcon
                        variant="outline"
                        onClick={() => {
                            setPref((x) => ({
                                ...x,
                                expandMenu: !x.expandMenu,
                            }))
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            color="white"
                            aria-label={$t('Toggle menu')}
                        />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label={$t('Insert a stamp')}>
                    <ActionIcon
                        variant="outline"
                        onClick={() => {
                            setInsertStampModal(true)
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faCirclePlus}
                            color="white"
                            aria-label={$t('Insert a stamp')}
                        />
                    </ActionIcon>
                </Tooltip>
                <CharacterIcon id={currChrId} />
                <Textarea
                    className="flex-grow min-h-[32px] max-h-[128px]"
                    value={text}
                    onChange={(e) => setText(e.currentTarget.value)}
                />
                <Tooltip label={$t('Send')}>
                    <ActionIcon variant="outline" onClick={submit}>
                        <FontAwesomeIcon
                            icon={faPaperPlane}
                            color="white"
                            aria-label={$t('Send')}
                        />
                    </ActionIcon>
                </Tooltip>
            </Group>
        </>
    )
}

export default Compose
