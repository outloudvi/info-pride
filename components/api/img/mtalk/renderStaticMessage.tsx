/* eslint-disable @next/next/no-img-element */
import type { CommuLine } from '#components/mtalk/types'
import Paths from '#utils/paths'

export default function renderStaticMessage(line: CommuLine): JSX.Element {
    if (line.stampAssetId) {
        return (
            <img
                alt={'stamp'}
                src={Paths.assetsImg(`img_message_stamp_${line.stampAssetId}`)}
                height={144}
                width={144}
            />
        )
    }
    return <div>{line.text}</div>
}
