import type { PhotoAioDetail } from 'hoshimi-types/types'
import { Grid, GridCol } from '@mantine/core'
import { PhotoAbilityType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'

import type { UnArray } from '#utils/api'

const PhotoAbility = ({
    item,
    level,
}: {
    item: UnArray<PhotoAioDetail['abilities']>
    level: number
}) => {
    const $tpat = useTranslations('photo_ability_type')
    const { name, description, abilityType, photoAbilityLevels } = item

    const currentValue = photoAbilityLevels.find((x) => x.level === level)
        ?.value

    return (
        <div lang="ja">
            <Grid>
                <GridCol span={9}>
                    <span>
                        {$tpat(PhotoAbilityType[abilityType])} <b>{name}</b>
                    </span>
                    <p>{description.replace('{0}', String(currentValue))}</p>
                </GridCol>
                <GridCol span={3} className="flex items-center justify-center">
                    <div className="text-center border-sky-500 border-solid p-2">
                        <span className="text-3xl">{currentValue}</span> <br />
                        <span>Lv. {level}</span>
                    </div>
                </GridCol>
            </Grid>
        </div>
    )
}

export default PhotoAbility
