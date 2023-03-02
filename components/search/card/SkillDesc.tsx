import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'
import type { Skill } from 'hoshimi-types/ProtoMaster'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import SkillExplainer from '#components/cards/SkillExplainer'

const SkillDesc = ({ skill }: { skill: Skill }) => {
    const $t = useTranslations('search')
    const $v = useTranslations('vendor')

    const { name, categoryType } = skill
    const highestLevel = skill.levels[skill.levels.length - 1]
    const { description } = highestLevel

    const statusLine = useMemo(() => {
        const { stamina, limitCount, coolTime } = highestLevel

        const ret = [$t('st_stamina', { s: stamina })]

        switch (categoryType) {
            case SkillCategoryType.Active:
            case SkillCategoryType.Passive: {
                if (limitCount > 0) {
                    ret.push($t('st_limit', { l: limitCount }))
                } else {
                    ret.push($t('st_ct', { ct: coolTime }))
                }
                break
            }
            case SkillCategoryType.Special: {
                // SP does not care about CT
                break
            }
        }

        return ret.join(' / ')
    }, [categoryType, highestLevel, $t])

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
