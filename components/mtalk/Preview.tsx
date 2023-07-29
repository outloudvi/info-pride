import type { MessageDetail } from 'hoshimi-types/ProtoMaster'
import { useTranslations } from 'next-intl'
import type { Dispatch, RefObject, SetStateAction } from 'react'

import type { CommuLine, EditorPref } from './types'

import renderMessage from '#components/messages/renderMessage'
import MessageItem from '#components/messages/MessageItem'

const Preview = ({
    refItem,
    commu,
    pref,
    setCommuData,
}: {
    refItem: RefObject<HTMLDivElement>
    commu: CommuLine[]
    pref: EditorPref
    setCommuData: Dispatch<SetStateAction<CommuLine[]>>
}) => {
    const $t = useTranslations('messages')

    const { editMode } = pref
    return (
        <div className="bg-[#4c4c4c]" ref={refItem}>
            {commu.map((line, key) => (
                <MessageItem
                    key={key}
                    characterId={line.characterId}
                    user={line.characterId ? 'others' : 'self'}
                    showEditMenu={editMode}
                    isTransparent={Boolean(line.stampAssetId)}
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
        </div>
    )
}

export default Preview
