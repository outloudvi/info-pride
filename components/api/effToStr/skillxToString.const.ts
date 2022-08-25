import { EffectScoreGetTyp } from 'hoshimi-types/Skillx'

import type { TargetTypeName } from '#utils/typeSlug'

export const TARGET_SPECIAL: Record<
    Exclude<TargetTypeName, 'chart_dependence' | 'trigger'>,
    string
> = {
    self: '自身',
    all: '全员',
    center: '中心',
    neighbor: '相邻位置',
    opponent_same_position: '对手同位置',
    opponent_center: '对手中心',

    vocal_higher: '红属性高',
    dance_higher: '蓝属性高',
    visual_higher: '黄属性高',
    stamina_higher: '体力高',
    stamina_lower: '体力低',
    vocal: '红属性',
    dance: '蓝属性',
    visual: '黄属性',
    position_attribute_vocal: '红轨道',
    position_attribute_visual: '黄轨道',

    character_type: '卡片类型',
    opponent_character_type: '对手卡片类型',

    status: '处于状态',
} as const

export const EFFECT_SPECIAL: Record<EffectScoreGetTyp, string> = {
    score_get_by_less_fan_amount: '观众数越少效果越好',
    score_get_by_more_fan_engage: '核心粉丝率越高效果越好',
    score_get_by_more_combo_count: '连击数越高效果越好',
    score_get_by_skill_activation_count: '技能发动数越多效果越好',
    score_get_by_strength_effect_count: '强化状态种类数越多效果越好',
    score_get_by_more_stamina_use: '消耗体力越多效果越好',
    score_get_by_more_stamina: '剩余体力越多效果越好',
    score_get_by_less_stamina: '剩余体力越少效果越好',
    score_get_and_stamina_consumption_by_more_stamina_use:
        '技能消耗体力越多效果越好',
    score_get: '',
} as const

export const TRIGGER_TYPE_NAME = {
    combo: '连击数',
} as const
