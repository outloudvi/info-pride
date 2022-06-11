import { ReactNode } from 'react'
import { MessageDetail } from 'hoshimi-types/ProtoMaster'

import AssetImage from '#components/AssetImage'

const MANAGER_NAME = 'マネージャー'

export default function renderMessage(
  msg: MessageDetail,
  sources: string[] | undefined
): ReactNode {
  // Text
  if (msg.text) {
    const isSelection = msg.messageDetailId.includes('-')
    const choiceId = msg.messageDetailId
    return (
      <>
        {isSelection && (
          <span className="text-gray-600">{`[${
            msg.characterId
              ? `选项回应 ${(sources ?? []).join('/')}`
              : `选项 ${choiceId}`
          }] `}</span>
        )}
        {msg.text.replaceAll('{user}', MANAGER_NAME)}
      </>
    )
  }

  // Image
  if (msg.imageAssetId) {
    return (
      <AssetImage
        name={`img_message_picture_${msg.imageAssetId}`}
        ratio={1}
        width={150}
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
        width={150}
        alt={`Stamp: ${msg.stampAssetId}`}
      />
    )
  }

  // Telephone
  if (msg.telephoneId) {
    return <span className="text-gray-500">[此卡片的语音通信。]</span>
  }

  return <span className="text-gray-500">[TODO: 其它类别的消息]</span>
}
