import { ReactNode } from 'react'
import { MessageDetail } from 'hoshimi-types/ProtoMaster'

import TelephoneMessage from './TelephoneMessage'

import AssetImage from '#components/AssetImage'

const MANAGER_NAME = 'マネージャー'

export default function renderMessage(
  msg: MessageDetail,
  branchSrc?: string
): ReactNode {
  // Text
  if (msg.text) {
    const isSelection = msg.messageDetailId.includes('-')
    const choiceId = msg.messageDetailId
    return (
      <>
        {isSelection && (
          <span className="text-gray-600">{`[${
            msg.characterId ? `选项回应 ${branchSrc}` : `选项 ${choiceId}`
          }] `}</span>
        )}
        {msg.text.replace(/\{user\}/g, MANAGER_NAME)}
      </>
    )
  }

  // Image
  if (msg.imageAssetId) {
    return (
      <AssetImage
        name={`img_message_picture_${msg.imageAssetId}`}
        ratio={1}
        height="9rem"
        alt={`Image: ${msg.imageAssetId}`}
      />
    )
  }

  // Stamp
  if (msg.stampAssetId) {
    return (
      <AssetImage
        name={`img_message_stamp_${msg.stampAssetId}`}
        ratio={1}
        height="9rem"
        alt={`Stamp: ${msg.stampAssetId}`}
      />
    )
  }

  // Telephone
  if (msg.telephoneId) {
    return <TelephoneMessage id={msg.telephoneId} />
  }

  return <span className="text-gray-500">[TODO: 其它类别的消息]</span>
}
