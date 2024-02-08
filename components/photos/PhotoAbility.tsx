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

    const currentValue =
        photoAbilityLevels.find((x) => x.level === level)?.value ??
        // TODO: is the logic correct?
        photoAbilityLevels[photoAbilityLevels.length - 1].value

    return (
        <div lang="ja">
            <Grid>
                <GridCol span={{ base: 7, lg: 9 }}>
                    <span>
                        {$tpat(PhotoAbilityType[abilityType])} <b>{name}</b>
                    </span>
                    <p>{description.replace('{0}', String(currentValue))}</p>
                </GridCol>
                <GridCol
                    span={{ base: 5, lg: 3 }}
                    className="flex items-center justify-center"
                >
                    <div className="text-center text-3xl border-sky-500 border-solid p-2">
                        {currentValue}
                    </div>
                </GridCol>
            </Grid>
        </div>
    )
}

export default PhotoAbility
