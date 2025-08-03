import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'

import type { LintRule } from '../types'

const spAbsentWhenNeeded: LintRule = (skills, chartLine) => {

    if (
        chartLine.filter((x) => x < 0).length > 0 &&
        skills.filter((x) => x.categoryType === SkillCategoryType.Special)
            .length === 0
    ) {
        return [
            {
                text: 'SP Skill Missing',
                severity: 3,
            },
        ]
    }
}

export default spAbsentWhenNeeded
