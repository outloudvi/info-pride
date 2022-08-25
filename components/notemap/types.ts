import type { SkillCategoryType } from 'hoshimi-types/ProtoEnum'

export type SkillLaunchItem = {
    type: SkillCategoryType
    success: boolean
    start: number
    end?: number
}

export type SkillChart = Record<1 | 2 | 3 | 4 | 5, SkillLaunchItem[]>

export type ImageChart = Partial<Record<1 | 2 | 3 | 4 | 5, string>>
