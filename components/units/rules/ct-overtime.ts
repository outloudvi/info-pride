import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'

import type { LintMessage, LintRule } from '../types'

const ctOvertime: LintRule = (skills, chartLine) => {
  const messages: LintMessage[] = []
  const aSkills = skills
    .filter((x) => x.categoryType === SkillCategoryType.Active)
    // TODO: CT related with levels
    .map((x) => x.levels[0].coolTime)

  const aSkillTimes = chartLine.filter((x) => x > 0)

  const lastSkillTime: number[] = []
  for (const tick of aSkillTimes) {
    let ok = false
    for (const [i, ct] of Object.entries(aSkills)) {
      if (
        lastSkillTime[Number(i)] === undefined || // first use of the skill
        lastSkillTime[Number(i)] + ct <= tick // CT is enough
      ) {
        lastSkillTime[Number(i)] = tick
        ok = true
        break
      }
    }
    if (!ok) {
      messages.push({
        text: `位于 ${tick} 拍的 A 技能可能因为 CT 失败`,
        severity: 2,
      })
    }
  }

  return messages
}

export default ctOvertime
