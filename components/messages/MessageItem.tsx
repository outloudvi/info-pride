import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group } from '@mantine/core'
import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import EditMenu from './EditMenu'

import type { CharacterId } from '#data/vendor/characterId'
import AssetImage from '#components/AssetImage'

const MessageItem = ({
    children,
    characterId,
    user,
    isTransparent,
    showEditMenu,
    deleteThis,
}: {
    children: ReactNode
    characterId: CharacterId | string
    user: 'self' | 'others'
    isTransparent: boolean
    showEditMenu?: boolean
    deleteThis?: () => void
}) => {
    const $vc = useTranslations('v-chr')

    const isSelf = user === 'self'
    const userIcon =
        user === 'others' ? (
            <AssetImage
                name={`img_message_icon_${characterId.split('-')[1]}`}
                ratio={1}
                height="3rem"
                alt="Contact icon"
            />
        ) : (
            <FontAwesomeIcon icon={faUserCircle} color="white" size="2x" />
        )
    const bg = isTransparent ? '' : isSelf ? 'bg-green-500' : 'bg-white'
    return (
        <Group>
            {showEditMenu && (
                <EditMenu
                    deleteThis={
                        deleteThis ??
                        (() => {
                            //
                        })
                    }
                />
            )}
            <Group
                className={`flex-grow p-2 items-end flex-nowrap ${
                    isSelf ? 'flex-row-reverse' : 'flex-row'
                }`}
            >
                {userIcon}
                <div>
                    <div className="text-white mb-1">{$vc(characterId)}</div>
                    <div
                        className={`text-black p-2 rounded-2xl inline-block ${bg} ${
                            isSelf ? 'rounded-br-none' : 'rounded-bl-none'
                        }`}
                    >
                        {children}
                    </div>
                </div>
            </Group>
        </Group>
    )
}

export default MessageItem
