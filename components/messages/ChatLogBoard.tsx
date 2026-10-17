'use client'

import { Fragment, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Box } from '@mantine/core'

import MessageItem from './MessageItem'
import renderMessage from './renderMessage'
import buildMessagePath from './buildMessagePath'
import type { BranchSelection } from './buildMessagePath'
import BranchSelector from './BranchSelector'
import styles from './index.module.css'

import type { APIResponseOf } from '#utils/api'

const ChatLogBoard = ({
    msg,
}: {
    msg: NonNullable<APIResponseOf<'Message'>>
}) => {
    const $t = useTranslations('messages')

    const { details } = msg

    const [selections, setSelections] = useState<BranchSelection>({})

    const { msgs, branchAfter } = useMemo(
        () => buildMessagePath(details, selections),
        [details, selections],
    )

    return (
        <Box
            className={`overflow-y-auto ${styles.board}`}
            style={{
                height: 'calc(100% - 4rem)',
            }}
            lang="ja"
        >
            {msgs.map((line, key) => {
                const branch = branchAfter[line.messageDetailId]
                return (
                    <Fragment key={key}>
                        <MessageItem
                            characterId={line.characterId}
                            user={line.characterId ? 'others' : 'self'}
                            isTransparent={Boolean(line.stampAssetId)}
                        >
                            {renderMessage(line, $t)}
                        </MessageItem>
                        {branch && (
                            <BranchSelector
                                branch={branch}
                                onSelect={(index) => {
                                    setSelections((prev) => ({
                                        ...prev,
                                        [branch.nodeId]: index,
                                    }))
                                }}
                            />
                        )}
                    </Fragment>
                )
            })}
            <div className="text-gray-300 text-center my-4">
                [{$t('communication_ended')}]
            </div>
        </Box>
    )
}

export default ChatLogBoard
