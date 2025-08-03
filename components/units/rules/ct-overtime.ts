import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'

import type { LintRule } from '../types'

import skillRunner from '#utils/skillRunner'

const ctOvertime: LintRule = (skills, chartLine) => {
    const runnerFailedResults = skillRunner({
        skills: skills.filter(
            (x) => x.categoryType === SkillCategoryType.Active
        ),
        chartLine,
    }).filter((x) => x.success === false)

    return runnerFailedResults.map((x) => ({
        text: 'CT Fail at Track',
        severity: 2,
        trackNum: x.start,
    }))
}

export default ctOvertime
