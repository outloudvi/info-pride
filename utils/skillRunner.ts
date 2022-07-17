import type { Skill } from 'hoshimi-types/ProtoMaster'
import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'

import type { SkillLaunchItem } from '#components/notemap/types'
import { APIResponseOf } from '#utils/api'

type PartialSkill = Pick<Skill, 'categoryType' | 'levels'>

type RequestBody = {
  skills: readonly PartialSkill[]
  chartLine: readonly number[]
}

function skillToLength(
  sk: PartialSkill,
  skillxData: APIResponseOf<'Skill/X'>
): number {
  return sk.levels[0].skillDetails
    .map((x) => x.efficacyId)
    .map((x) => {
      const sk = skillxData[x]
      if (!sk) return 0
      return 'len' in sk.effect ? sk.effect.len : 0
    })
    .reduce((a, b) => Math.max(a, b))
}

export default function skillRunner(
  { skills, chartLine }: RequestBody,
  // TODO: definitely doesn't need the whole set
  skillxData?: APIResponseOf<'Skill/X'>
): SkillLaunchItem[] {
  const ret: SkillLaunchItem[] = []
  const aSkills = skills
    .filter((x) => x.categoryType === SkillCategoryType.Active)
    // TODO: CT related with levels
    .map((x) => ({ skill: x, ct: x.levels[0].coolTime }))

  const aSkillTimes = chartLine.filter((x) => x > 0)
  const lastSkillTime: number[] = []
  for (const tick of aSkillTimes) {
    let ok = false
    let okSkill: PartialSkill | undefined = undefined
    for (const [i, { skill, ct }] of Object.entries(aSkills)) {
      if (
        lastSkillTime[Number(i)] === undefined || // first use of the skill
        lastSkillTime[Number(i)] + ct <= tick // CT is enough
      ) {
        lastSkillTime[Number(i)] = tick
        okSkill = skill
        ok = true
        break
      }
    }
    ret.push({
      type: SkillCategoryType.Active,
      success: ok,
      start: tick,
      ...(skillxData && {
        end: tick + (okSkill ? skillToLength(okSkill, skillxData) : 0),
      }),
    })
  }

  const spSkillTimes = chartLine.filter((x) => x < 0).map((x) => -x)
  if (spSkillTimes.length > 0) {
    // Assumption: Maximum 1 SP skill
    const spSkill = skills.filter(
      (x) => x.categoryType === SkillCategoryType.Special
    )?.[0]

    if (spSkill) {
      for (const tick of spSkillTimes) {
        ret.push({
          type: SkillCategoryType.Special,
          success: true,
          start: tick,
          ...(skillxData && {
            end: tick + skillToLength(spSkill, skillxData),
          }),
        })
      }
    } else {
      // No SP skill available
      for (const tick of spSkillTimes) {
        ret.push({
          type: SkillCategoryType.Special,
          success: false,
          start: tick,
        })
      }
    }
  }

  return ret
}
