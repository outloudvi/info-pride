import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { ActionIcon, Group, Modal, Textarea } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCirclePlus,
    faEllipsisVertical,
    faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
import { useTranslations } from 'next-intl'

import type { CharacterIdWithManager, CommuLine, EditorPref } from './types'
import CharacterIcon from './CharacterIcon'

import Stamps from '#data/stamps'
import AssetImage from '#components/AssetImage'

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
    }

    return (
        <>
            <Modal
                opened={insertStampModal}
                onClose={() => setInsertStampModal(false)}
                title={$t('Insert a stamp')}
                size="65%"
            >
                <Group>
                    {Stamps.map((stampAssetId, key) => (
                        <AssetImage
                            key={key}
                            name={`img_message_stamp_${stampAssetId}`}
                            ratio={1}
                            height="9rem"
                            alt={`Stamp: ${stampAssetId}`}
                            onClick={() => {
                                setCommuData((x) => [
                                    ...x,
                                    {
                                        characterId: currChrId,
                                        stampAssetId,
                                    },
                                ])
                                setInsertStampModal(false)
                            }}
                        />
                    ))}
                </Group>
            </Modal>

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
                <ActionIcon
                    variant="outline"
                    onClick={() => {
                        setInsertStampModal(true)
                    }}
                >
                    <FontAwesomeIcon icon={faCirclePlus} color="white" />
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
        </>
    )
}

export default Compose
