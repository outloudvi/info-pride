/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from 'react'

import type { CharacterId } from '#data/vendor/characterId'
import Paths from '#utils/paths'

const StaticMessageItem = ({
    children,
    characterId,
    user,
    isTransparent,
}: {
    children: ReactNode
    characterId: CharacterId | string
    user: 'self' | 'others'
    isTransparent: boolean
}) => {
    const isSelf = user === 'self'
    const userIcon =
        user === 'others' ? (
            <img
                alt={'icon'}
                src={Paths.assets('img')(
                    `img_message_icon_${characterId.split('-')[1]}`
                )}
                height={48}
                width={48}
            />
        ) : (
            <img
                alt={'icon'}
                src={Paths.s3('custom/message_icon_manager.png')}
                height={48}
                width={48}
            />
        )

    return (
        <div
            style={{
                display: 'flex',
                flexGrow: 1,
                width: '100%',
                padding: '8px',
                alignItems: 'flex-end',
                flexWrap: 'nowrap',
                flexDirection: isSelf ? 'row-reverse' : 'row',
            }}
        >
            {userIcon}
            <div
                style={{
                    color: 'black',

                    padding: '8px',
                    borderRadius: '16px',
                    display: 'flex',
                    backgroundColor: isTransparent
                        ? 'transparent'
                        : isSelf
                        ? '#22c522'
                        : 'white',
                    ...(isSelf
                        ? {
                              borderBottomRightRadius: 0,
                              marginRight: '16px', // replacement for flex-gap
                          }
                        : {
                              borderBottomLeftRadius: 0,
                              marginLeft: '16px', // replacement for flex-gap
                          }),
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default StaticMessageItem
