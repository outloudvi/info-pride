import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'

import type { LintRule } from '../types'

import skillRunner from '#utils/skillRunner'

const ctOvertime: LintRule = (skills, chartLine) => {
  const runnerFailedResults = skillRunner({
    skills: skills.filter((x) => x.categoryType === SkillCategoryType.Active),
    chartLine,
  }).filter((x) => x.success === false)

  return runnerFailedResults.map((x) => ({
    text: `位于 ${x.start} 拍的 A 技能可能因为 CT 失败`,
    severity: 2,
  }))
}

export default ctOvertime
