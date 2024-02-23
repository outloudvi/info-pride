import { Card, CardSection } from '@mantine/core'

import type { APIResponseOf, UnArray } from '#utils/api'
import AssetImage from '#components/AssetImage'

const Emblem = ({ item }: { item: UnArray<APIResponseOf<'Emblems'>> }) => {
    const { name, assetId, description } = item
    return (
        <Card shadow="sm" p="sm">
            <CardSection>
                <AssetImage
                    name={`img_ui_emb_${assetId}`}
                    ratio="12 / 5"
                    alt="Emblem icon"
                />
            </CardSection>

            <div className="mt-3" lang="ja">
                <b className="text-xl">{name}</b>
                <br />
                {description}
            </div>
        </Card>
    )
}

export default Emblem
