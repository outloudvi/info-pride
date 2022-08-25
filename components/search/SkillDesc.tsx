import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'
import { Skill, SkillLevel } from 'hoshimi-types/ProtoMaster'
import { useTranslations } from 'next-intl'

import SkillExplainer from '#components/cards/SkillExplainer'

function buildStatusLine(
    levelDesc: SkillLevel,
    typ: SkillCategoryType
): string {
    const { stamina, limitCount, coolTime } = levelDesc

    const ret = [`所需体力 ${stamina}`]

    switch (typ) {
        case SkillCategoryType.Active:
        case SkillCategoryType.Passive: {
            if (limitCount > 0) {
                ret.push(`Live 中只生效 ${limitCount} 次`)
            } else {
                ret.push(`CT ${coolTime}`)
            }
            break
        }
        case SkillCategoryType.Special: {
            // SP does not care about CT
            break
        }
    }

    return ret.join(' / ')
}

const SkillDesc = ({ skill }: { skill: Skill }) => {
    const $v = useTranslations('vendor')

    const { name, categoryType } = skill
    const highestLevel = skill.levels[skill.levels.length - 1]
    const { description } = highestLevel

    const statusLine = buildStatusLine(highestLevel, categoryType)

    return (
        <div>
            <span>{name}</span>
            <br />
            <span>{$v(SkillCategoryType[categoryType])}</span>
            <br />
            <span
                dangerouslySetInnerHTML={{
                    __html: description.replace(/\n/g, '<br/>'),
                }}
            ></span>
            <br />
            <span className="font-semibold">{statusLine}</span>
            <br />
            <SkillExplainer level={skill.levels[skill.levels.length - 1]} />
        </div>
    )
}

export default SkillDesc
