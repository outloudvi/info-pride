import type { HTMLAttributes } from 'react'
import { Badge, Tooltip } from '@mantine/core'
import type { Skill } from 'hoshimi-types/ProtoMaster'
import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'

import lfToBr from '#utils/lfToBr'

const SkillInUnit = ({
    skill,
    className,
    style,
}: {
    skill: Skill
} & HTMLAttributes<'div'>) => {
    const $v = useTranslations('vendor')
    return (
        <div {...{ className, style }}>
            {skill.name} <br />
            <span className="text-sm">
                {$v(SkillCategoryType[skill.categoryType])} 技
            </span>{' '}
            <br />
            <Tooltip
                label={lfToBr(
                    skill.levels[skill.levels.length - 1].description,
                    true
                )}
                withArrow
                position="right"
            >
                <Badge>详情</Badge>
            </Tooltip>
        </div>
    )
}

export default SkillInUnit
