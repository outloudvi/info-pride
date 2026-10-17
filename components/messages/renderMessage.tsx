import type { ReactNode } from 'react'
import type { MessageDetail } from 'hoshimi-types/ProtoMaster'

import TelephoneMessage from './TelephoneMessage'

import AssetImage from '#components/AssetImage'
import lfToBr from '#utils/lfToBr'

export default function renderMessage(
    msg: MessageDetail,
    $t: (s: string, r?: Record<string, string>) => string,
): ReactNode {
    // Text
    if (msg.text) {
        return <>{lfToBr(msg.text.replace(/\{user\}/g, $t('Manager')))}</>
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
