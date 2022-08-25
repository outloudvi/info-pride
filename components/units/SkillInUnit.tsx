import { HTMLAttributes } from 'react'
import { Badge, Tooltip } from '@mantine/core'
import type { Skill } from 'hoshimi-types/ProtoMaster'
import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'

const SkillInUnit = ({
    skill,
    className,
    style,
    skillName,
    skillDesc,
}: {
    skill: Skill
    skillName?: string
    skillDesc?: string
} & HTMLAttributes<'div'>) => {
    const $v = useTranslations('vendor')
    return (
        <div {...{ className, style }}>
            {skillName ?? skill.name} <br />
            <span className="text-sm">
                {$v(SkillCategoryType[skill.categoryType])} 技
            </span>{' '}
            <br />
            <Tooltip
                label={
                    <div
                        dangerouslySetInnerHTML={{
                            __html: (
                                skillDesc ??
                                skill.levels[skill.levels.length - 1]
                                    .description
                            ).replace(/\n+/g, '<br/>'),
                        }}
                    ></div>
                }
                withArrow
                position="right"
            >
                <Badge>详情</Badge>
            </Tooltip>
        </div>
    )
}

export default SkillInUnit
