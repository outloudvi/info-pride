import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'

import type { LintRule } from '../types'

import skillRunner from '#utils/skillRunner'

import { useTranslations } from 'next-intl'

const ctOvertime: LintRule = (skills, chartLine) => {
    const $t = useTranslations('units')
    const runnerFailedResults = skillRunner({
        skills: skills.filter(
            (x) => x.categoryType === SkillCategoryType.Active
        ),
        chartLine,
    }).filter((x) => x.success === false)

    return runnerFailedResults.map((x) => ({
        text: $t('CT Fail at Track', {
            trackNum: x.start
        }),
        severity: 2,
    }))
}

export default ctOvertime
