import type { PhotoAioDetail } from 'hoshimi-types/types'
import { Grid, GridCol } from '@mantine/core'
import { PhotoAbilityType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'

import type { UnArray } from '#utils/api'

function toReadable(v: number, abilityType: PhotoAbilityType): string {
    switch (abilityType) {
        case PhotoAbilityType.VocalMultiply:
        case PhotoAbilityType.DanceMultiply:
        case PhotoAbilityType.VisualMultiply:
        case PhotoAbilityType.StaminaMultiply:
        case PhotoAbilityType.MentalMultiply:
        case PhotoAbilityType.TechniqueMultiply:
        case PhotoAbilityType.BeatScoreMultiply:
        case PhotoAbilityType.ActiveSkillScoreMultiply:
        case PhotoAbilityType.SpecialSkillScoreMultiply:
        case PhotoAbilityType.CriticalScoreMultiply:
            return `+${(v / 10).toFixed(1)}%`

        case PhotoAbilityType.DanceAdd:
        case PhotoAbilityType.VocalAdd:
        case PhotoAbilityType.VisualAdd:
        case PhotoAbilityType.StaminaAdd:
        case PhotoAbilityType.MentalAdd:
        case PhotoAbilityType.TechniqueAdd:
        case PhotoAbilityType.BeatScoreAdd:
        case PhotoAbilityType.ActiveSkillScoreAdd:
        case PhotoAbilityType.SpecialSkillScoreAdd:
            return `+${v}`

        case PhotoAbilityType.PassiveSkill:
            return `Lv${v}`

        // not used in PhotoAIO
        case PhotoAbilityType.ManagerExp:
        case PhotoAbilityType.Gold:
        case PhotoAbilityType.CardExp:
        case PhotoAbilityType.AudienceAmountUp:
        case PhotoAbilityType.ReceivedStrengthEffectValueIncrease:
        case PhotoAbilityType.ReceivedStrengthEffectCountIncrease:
        case PhotoAbilityType.AffectStrengthEffectValueIncrease:
        case PhotoAbilityType.AffectStrengthEffectCountIncrease:
        case PhotoAbilityType.CoolTimeReductionSkill1:
        case PhotoAbilityType.CoolTimeReductionSkill2:
        case PhotoAbilityType.CoolTimeReductionSkill3:
            break
    }
    return `${v}`
}

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
                        {toReadable(currentValue, abilityType)}
                    </div>
                </GridCol>
            </Grid>
        </div>
    )
}

export default PhotoAbility
