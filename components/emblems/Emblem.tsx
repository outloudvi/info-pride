import { Card } from '@mantine/core'

import type { APIResponseOf, UnArray } from '#utils/api'
import AssetImage from '#components/AssetImage'

const Emblem = ({
    item,
}: {
    item: UnArray<APIResponseOf<'Emblems'>['data']>
}) => {
    const { name, assetId, description } = item
    return (
        <Card shadow="sm" p="sm">
            <Card.Section>
                <AssetImage
                    name={`img_ui_emb_${assetId}`}
                    ratio="12 / 5"
                    alt="Emblem icon"
                />
            </Card.Section>

            <div className="mt-3" lang="ja">
                <b className="text-xl">{name}</b>
                <br />
                {description}
            </div>
        </Card>
    )
}

export default Emblem
