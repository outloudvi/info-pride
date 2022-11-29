import type { MessageDetail } from 'hoshimi-types/ProtoMaster'
import { useTranslations } from 'next-intl'
import type { Dispatch, SetStateAction } from 'react'

import type { CommuLine, EditorPref } from './types'

import renderMessage from '#components/messages/renderMessage'
import MessageItem from '#components/messages/MessageItem'

const Preview = ({
    commu,
    pref,
    setCommuData,
}: {
    commu: CommuLine[]
    pref: EditorPref
    setCommuData: Dispatch<SetStateAction<CommuLine[]>>
}) => {
    const $t = useTranslations('messages')

    const { editMode } = pref
    return (
        <>
            {commu.map((line, key) => (
                <MessageItem
                    key={key}
                    characterId={line.characterId}
                    user={line.characterId ? 'others' : 'self'}
                    showEditMenu={editMode}
                    deleteThis={() => {
                        setCommuData((x) => [
                            ...x.slice(0, key),
                            ...x.slice(key + 1),
                        ])
                    }}
                >
                    {renderMessage(line as MessageDetail, $t)}
                </MessageItem>
            ))}
        </>
    )
}

export default Preview
