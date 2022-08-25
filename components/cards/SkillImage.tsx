/* eslint-disable @next/next/no-img-element */
import { ReactNode } from 'react'
import { Skill } from 'hoshimi-types/ProtoMaster'
import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'

import Paths from '#utils/paths'
import type { EffectTypeName } from '#utils/typeSlug'

const pathAssetsForImg = Paths.assets('img')

type SkillImageBgType = 'score' | 'strength' | 'support' | 'yell' | ''

// Background for non-SP skills
function getSkillImageBgPrefix(typ: EffectTypeName): SkillImageBgType {
    switch (typ) {
        case 'combo_continuation':
            return 'strength'
        case 'score_get':
        case 'score_get_by_strength_effect_count':
        case 'score_get_by_more_combo_count':
        case 'score_get_by_less_stamina':
        case 'score_get_by_less_fan_amount':
        case 'score_get_by_more_stamina_use':
        case 'score_get_by_skill_activation_count':
        case 'score_get_by_more_fan_engage':
        case 'score_get_by_trigger':
        case 'score_get_by_status_effect_type_grade':
        case 'score_get_by_more_stamina':
        case 'score_get_and_stamina_consumption_by_more_stamina_use':
            return 'score'
        case 'cool_time_reduction':
        case 'stamina_consumption':
        case 'stamina_consumption_reduction':
        case 'strength_effect_count_increase':
        case 'strength_effect_value_increase':
        case 'audience_amount_increase':
        case 'fix_stamina_recovery':
        case 'target_stamina_recovery':
            return 'support'
        case 'active_skill_score_up':
        case 'critical_rate_up':
        case 'vocal_up':
        case 'dance_up':
        case 'visual_up':
        case 'vocal_boost':
        case 'dance_boost':
        case 'visual_boost':
        case 'combo_score_up':
        case 'tension_up':
        case 'score_up':
        case 'passive_skill_score_up':
        case 'beat_score_up':
        case 'critical_bonus_permil_up':
        case 'skill_score_up':
        case 'skill_success_rate_up':
        case 'special_skill_score_up':
        case 'active_score_multiplier_add':
            return 'strength'
        // Undecided
        case 'dance_down':
        case 'visual_down':
        case 'vocal_down':
        case 'skill_impossible':
        case 'audience_amount_reduction':
        case 'stamina_consumption_increase':
        case 'stamina_continuous_recovery':
        case 'weakness_effect_inversion':
        case 'weakness_effect_prevention':
        case 'weakness_effect_recovery':
        case 'strength_effect_erasing_all':
        case 'strength_effect_migration_before_active_skill':
        case 'strength_effect_migration_before_special_skill':
            return ''
    }
}

function buildSkillImage(parts: ReactNode[]): JSX.Element {
    return (
        <div className="h-16 w-16 relative rounded-[14px] border-4 border-solid border-black box-content select-none">
            {parts.map((x) => x)}
        </div>
    )
}

// really really chaotic
const SkillImage = ({
    skill,
    skillImgLevel,
}: {
    skill: Skill
    skillImgLevel: number
}) => {
    const parts: ReactNode[] = []

    const keySkillEfficacyId =
        skill.levels[0].skillDetails.length >= 2
            ? skill.levels[0].skillDetails[1].efficacyId
            : skill.levels[0].skillDetails[0].efficacyId

    /**
     * L1-L3: 1
     * L4-L5: 2
     * L6: 3
     */
    const skillImageBg =
        skill.categoryType === SkillCategoryType.Special
            ? `bg_special_${
                  skillImgLevel >= 6 ? 3 : skillImgLevel >= 4 ? 2 : 1
              }`
            : `bg_${getSkillImageBgPrefix(
                  keySkillEfficacyId.split('-')[1] as EffectTypeName
              )}_${skillImgLevel >= 6 ? 3 : skillImgLevel >= 4 ? 2 : 1}`

    parts.push(
        <img
            src={Paths.sprite(skillImageBg)}
            alt="Skill background"
            className="absolute h-16 w-16"
        />
    )

    if (skill.assetId) {
        // Use assetId as foreground
        parts.push(
            <img
                src={pathAssetsForImg(`img_icon_skill_${skill.assetId}`)}
                alt="Skill icon"
                className="absolute h-16 w-16 invert"
                style={{
                    filter: 'invert(1)',
                }}
            />
        )
        return buildSkillImage(parts)
    }

    const skillIcons = skill.levels[0].skillDetails.map(
        (x) =>
            'img_icon_skill-normal_' +
            x.efficacyId.split('-')[1].replace(/_/g, '-')
    )

    if (skillIcons.length === 0) {
        // No skill effects (unlikely)
        return buildSkillImage(parts)
    }

    if (skillIcons.length === 1) {
        parts.push(
            <img
                src={pathAssetsForImg(skillIcons[0])}
                alt="Skill icon"
                height={64}
                width={64}
                className="absolute"
                style={{
                    filter: 'invert(1)',
                }}
            />
        )
        return buildSkillImage(parts)
    }

    // Pick the first two effects and build the image
    // https://wiki.biligame.com/idolypride/模板:技能图标
    parts.push(
        <img
            src={pathAssetsForImg(skillIcons[1])}
            loading="lazy"
            height={54.4}
            width={54.4}
            className="absolute left-0 bottom-0 -ml-1 -mb-1"
            alt="Primary component of the skill icon"
            style={{
                filter: 'invert(1)',
            }}
        />
    )
    parts.push(
        <img
            src={pathAssetsForImg(skillIcons[0])}
            loading="lazy"
            height={32}
            width={32}
            className="absolute top-0 right-0"
            alt="Secondary component of the skill icon"
            style={{
                filter: 'invert(1)',
            }}
        />
    )
    return buildSkillImage(parts)
}

export default SkillImage
