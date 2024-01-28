import type { PhotoDetail } from 'hoshimi-types/types'

import type { UnArray } from '#utils/api'

const PhotoAbility = ({
    item,
}: {
    item: UnArray<PhotoDetail['abilities']>
}) => {
    const { name, description, abilityType, photoAbilityLevels } = item

    return (
        <div lang="ja">
            <b>{name}</b>
            <p>{description}</p>
        </div>
    )
}

export default PhotoAbility
