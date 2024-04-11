import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'
import type { Skill } from 'hoshimi-types/ProtoMaster'
import { useTranslations } from 'next-intl'

import lfToBr from '#utils/lfToBr'

const SkillDesc = ({ skill }: { skill: Skill }) => {
    const $v = useTranslations('vendor')

    const { name, categoryType } = skill
    const highestLevel = skill.levels[skill.levels.length - 1]
    const { description } = highestLevel

    return (
        <div>
            <span>{name}</span>
            <br />
            <span>{$v(SkillCategoryType[categoryType])}</span>
            <br />
            <span>{lfToBr(description)}</span>
        </div>
    )
}

export default SkillDesc
