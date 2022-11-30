import { Group } from '@mantine/core'
import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import EditMenu from './EditMenu'

import type { CharacterId } from '#data/vendor/characterId'
import CharacterIcon from '#components/mtalk/CharacterIcon'
import type { CharacterIdWithManager } from '#components/mtalk/types'

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
    const isSelf = user === 'self'
    const userIcon =
        user === 'others' ? (
            <CharacterIcon id={characterId as CharacterIdWithManager} />
        ) : (
            <CharacterIcon id={''} />
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
                <div
                    className={`text-black p-2 rounded-2xl inline-block ${bg} ${
                        isSelf ? 'rounded-br-none' : 'rounded-bl-none'
                    }`}
                >
                    {children}
                </div>
            </Group>
        </Group>
    )
}

export default MessageItem
