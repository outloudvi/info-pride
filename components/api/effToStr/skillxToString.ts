import { CardType } from 'hoshimi-types/ProtoEnum'
import type {
    EffectChart,
    EffectCharacterWithLength,
    EffectCharacterWithoutLength,
    TargetChart,
    TargetCharacterWithCount,
    EffectWithTarget,
} from 'hoshimi-types/Skillx'

import vendorLocale from '../../../locales/zh-hans/vendor.json'

import {
    EFFECT_SPECIAL,
    TARGET_SPECIAL,
    TRIGGER_TYPE_NAME,
} from './skillxToString.const'

import {
    skillEffectTypeNames,
    triggerEffectTypeNames,
} from '#data/vendor/searchSkillTypes'
import { CharacterChineseNameList } from '#data/vendor/characterId'
import { EffectTypeName } from '#utils/typeSlug'

// jq '[.[].levels[].skillDetails[].triggerId, .[].levels[].triggerId] | unique | sort' Skill.json
function triggerToString(s: string): string | null {
    const parts = s.split('-')
    if (parts[0] !== 'tg') return null
    switch (parts[1]) {
        // tg-beat
        case 'beat': {
            return '每拍'
        }
        // tg-before_active_skill_by_someone
        case 'before_active_skill_by_someone': {
            return '某人 A 技能发动前'
        }
        // tg-before_critical_by_someone
        case 'before_critical_by_someone': {
            return '某人暴击发动前'
        }
        // tg-before_special_skill
        case 'before_special_skill': {
            return 'SP 技能发动前'
        }
        // tg-before_special_skill_by_someone
        case 'before_special_skill_by_someone': {
            return '某人 SP 技能发动前'
        }
        // tg-center
        case 'center': {
            return '中心位置时'
        }
        // tg-combo-100
        case 'combo': {
            return `${parts[2]}连击以上时`
        }
        // tg-combo_less_equal-100
        case 'combo_less_equal': {
            return `${parts[2]}连击以下时`
        }
        // tg-critical
        case 'critical': {
            return '暴击时'
        }
        // tg-more_than_character_count-mei-1
        case 'more_than_character_count': {
            return `${
                CharacterChineseNameList['char-' + parts[2]]
            }在编组中达到${parts[3]}人时`
        }
        // tg-position_attribute_dance
        case 'position_attribute_dance': {
            return '蓝轨道时'
        }
        // tg-position_attribute_visual
        case 'position_attribute_visual': {
            return '黄轨道时'
        }
        // tg-position_attribute_vocal
        case 'position_attribute_vocal': {
            return '红轨道时'
        }
        // tg-someone_recovered
        case 'someone_recovered': {
            return '某人体力被回复时'
        }
        // tg-someone_stamina_lower-70
        case 'someone_stamina_lower': {
            return `某人体力低于${parts[2]}%时`
        }
        // tg-someone_status-audience_amount_reduction
        case 'someone_status': {
            return `某人${triggerEffectTypeNames[parts[2]]}状态时`
        }
        // tg-someone_status_group-weekness
        case 'someone_status_group': {
            return `某人${triggerEffectTypeNames[parts[2]]}状态时`
        }
        // tg-stamina_higher-60
        case 'stamina_higher': {
            return `体力高于${parts[2]}%时`
        }
        // tg-stamina_lower-70
        case 'stamina_lower': {
            return `体力低于${parts[2]}%时`
        }
        // tg-status-critical_rate_up
        case 'status': {
            return `${skillEffectTypeNames[parts[2] as EffectTypeName]}状态时`
        }
    }
    return `(未识别的条件)时`
}

/**
 * When this file is called for updates, please also update:
 *  * components/api/effToStr/skillxToString.const.ts: Detailed description (TS will check it)
 *  * components/api/effToStr/skillToString.spec.ts: A test case
 *  * data/vendor/searchSkillTypes.ts: Short description (TS will check it)
 *  * components/cards/SkillImage.tsx: Skill image type (TS will check it)
 */
function effectToString(
    e: EffectChart | EffectCharacterWithLength | EffectCharacterWithoutLength,
    n: string
): string {
    switch (e.typ) {
        // EffectScoreGetTyp
        case 'score_get_by_less_fan_amount':
        case 'score_get_by_more_fan_engage':
        case 'score_get_by_more_combo_count':
        case 'score_get_by_skill_activation_count':
        case 'score_get_by_strength_effect_count':
        case 'score_get_by_more_stamina_use':
        case 'score_get_by_more_stamina':
        case 'score_get_by_less_stamina':
        case 'score_get_and_stamina_consumption_by_more_stamina_use':
        case 'score_get': {
            return `取得${e.typ2 / 10}%得分${
                EFFECT_SPECIAL[e.typ] ? `（${EFFECT_SPECIAL[e.typ]}）` : ''
            }`
        }

        case 'score_get_by_status_effect_type_grade': {
            return `取得${e.lvl / 10}%得分（${
                skillEffectTypeNames[e.prt]
            }层数越多效果越好）`
        }

        case 'score_get_by_trigger': {
            return `取得${e.lvl / 10}%得分（当${
                TRIGGER_TYPE_NAME[e.cond.typ]
            }达到${e.cond.len}时为${e.condLvl / 10}%）`
        }

        // EffectCharacterLengthLevelTyp
        case 'vocal_up':
        case 'dance_up':
        case 'visual_up':
        case 'vocal_boost':
        case 'dance_boost':
        case 'visual_boost':
        case 'skill_score_up':
        case 'active_skill_score_up':
        case 'passive_skill_score_up':
        case 'special_skill_score_up':
        case 'score_up':
        case 'beat_score_up':
        case 'combo_score_up':
        case 'skill_success_rate_up':
        case 'tension_up':
        case 'critical_rate_up':
        case 'critical_bonus_permil_up':
        case 'stamina_consumption_reduction':
        case 'stamina_consumption_increase':
        case 'stamina_continuous_recovery':
        case 'audience_amount_reduction':
        case 'audience_amount_increase':
        case 'weakness_effect_prevention':
        case 'vocal_down':
        case 'dance_down':
        case 'visual_down':
        case 'active_score_multiplier_add': {
            return `赋予${n}${e.lvl}阶段${skillEffectTypeNames[e.typ]}状态[${
                e.len
            }拍]`
        }

        // EffectCharacterLevelOnlyTyp
        case 'skill_impossible':
        case 'combo_continuation': {
            return `赋予${n}${skillEffectTypeNames[e.typ]}状态[${e.len}拍]`
        }

        // EffectCharacterLevelOnlyTyp
        case 'fix_stamina_recovery':
        case 'cool_time_reduction':
        case 'stamina_consumption': {
            return `${n}${skillEffectTypeNames[e.typ].replace(/（.*）$/, '')}${
                e.lvl
            }`
        }

        case 'strength_effect_count_increase':
        case 'strength_effect_value_increase': {
            return `${n}${skillEffectTypeNames[e.typ].replace(/（.*）$/, '')}${
                e.lvl
            }拍`
        }

        case 'target_stamina_recovery': {
            return `${n}${skillEffectTypeNames[e.typ].replace(/（.*）$/, '')}${
                e.lvl / 10
            }%`
        }

        // EffectCharacterSimpleTyp
        case 'weakness_effect_recovery':
        case 'weakness_effect_inversion':
        case 'strength_effect_erasing_all':
        case 'strength_effect_migration_before_special_skill':
        case 'strength_effect_migration_before_active_skill': {
            return `${n}${skillEffectTypeNames[e.typ]}`
        }
    }
}

function targetToString(t: TargetChart | TargetCharacterWithCount): string {
    switch (t.typ) {
        case 'chart_dependence': {
            return ''
        }

        // TargetCharacterSpecialType
        case 'self':
        case 'all':
        case 'center':
        case 'neighbor':
        case 'opponent_same_position':
        case 'opponent_center': {
            return TARGET_SPECIAL[t.typ]
        }

        // TargetChPropsType
        case 'vocal_higher':
        case 'dance_higher':
        case 'visual_higher':
        case 'stamina_higher':
        case 'vocal':
        case 'dance':
        case 'visual':
        case 'position_attribute_vocal':
        case 'position_attribute_visual':
        case 'stamina_lower': {
            return `${TARGET_SPECIAL[t.typ]}${t.cnt}人`
        }

        case 'character_type':
        case 'opponent_character_type': {
            return `${t.typ.startsWith('opponent_') ? '对手' : ''}[${
                // @ts-expect-error Unconstrainted key
                vendorLocale[CardType[t.typ2]]
            }]属性${t.cnt}人`
        }

        case 'trigger': {
            // see TRIGGER_SPECIAL
            return ''
        }
        case 'status': {
            return `${TARGET_SPECIAL[t.typ]}[${
                skillEffectTypeNames[t.typ2]
            }]时${t.cnt}人`
        }
    }
}

export default function skillxToString(
    sk: Omit<EffectWithTarget, 'owner'>,
    trigger?: string
): string {
    const ret =
        (trigger ? `[${triggerToString(trigger) ?? '触发条件'}]` : '') +
        effectToString(sk.effect, targetToString(sk.target))
    return ret.replace(/ +/g, '')
}
