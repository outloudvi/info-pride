import type { PhotoAioDetail } from 'hoshimi-types/types'
import { useState } from 'react'
import { Grid, GridCol, Slider } from '@mantine/core'
import { PhotoAbilityType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'

import type { UnArray } from '#utils/api'

const PhotoAbility = ({
    item,
}: {
    item: UnArray<PhotoAioDetail['abilities']>
}) => {
    const $tpat = useTranslations('photo_ability_type')
    const {
        name,
        description,
        abilityType,
        photoAbilityLevels,
        abilityEffectValue,
    } = item

    const initialLevel = photoAbilityLevels.find(
        (x) => x.value === abilityEffectValue,
    )?.level
    const [level, setLevel] = useState(initialLevel)
    const currentValue = photoAbilityLevels.find((x) => x.level === level)
        ?.value

    return (
        <div lang="ja">
            <Slider
                min={initialLevel}
                max={photoAbilityLevels[photoAbilityLevels.length - 1].level}
                value={level}
                label={(v) => `Level ${v}`}
                onChange={setLevel}
                aria-label={'Level'}
                step={5}
            />
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
