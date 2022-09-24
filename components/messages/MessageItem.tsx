import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group } from '@mantine/core'
import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import { CharacterId } from '#data/vendor/characterId'
import AssetImage from '#components/AssetImage'

const MessageItem = ({
    children,
    characterId,
    user,
}: {
    children: ReactNode
    characterId: CharacterId | string
    user: 'self' | 'others'
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
    return (
        <Group
            className={`p-2 items-end flex-nowrap ${
                isSelf ? 'flex-row-reverse' : 'flex-row'
            }`}
        >
            {userIcon}
            <div>
                <div className="text-white mb-1">{$vc(characterId)}</div>
                <div
                    className={`text-black p-2 rounded-2xl ${
                        isSelf
                            ? 'bg-green-500 rounded-br-none'
                            : 'bg-white rounded-bl-none'
                    }`}
                >
                    {children}
                </div>
            </div>
        </Group>
    )
}

export default MessageItem
