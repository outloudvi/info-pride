import { useState } from 'react'
import { Skeleton, Slider, Stack } from '@mantine/core'
import type { ActivityAbility, LiveAbility } from 'hoshimi-types/ProtoMaster'
import { Skill } from 'hoshimi-types/ProtoMaster'
import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'

import SkillImage from './SkillImage'

import lfToBr from '#utils/lfToBr'

const Skill = ({ skill, className }: { skill: Skill; className?: string }) => {
    const { name, categoryType, levels } = skill

    const $v = useTranslations('vendor')

    const [level, setLevel] = useState(1)

    return (
        <>
            <div className="mr-2">
                <SkillImage skill={skill} skillImgLevel={level} />
            </div>
            <div className={className + ' flex flex-col flex-grow'}>
                <span>
                    <b>{name}</b> / {$v(SkillCategoryType[categoryType])}
                </span>
                <Slider
                    min={levels[0].level}
                    max={levels[levels.length - 1].level}
                    value={level}
                    label={(v) => `Level ${v}`}
                    onChange={setLevel}
                    aria-label={'Level'}
                />
                <span>{lfToBr(levels[level - 1].description, true)}</span>
            </div>
        </>
    )
}

const YellSkill = ({ skill }: { skill: LiveAbility | ActivityAbility }) => {
    const { name, levels } = skill

    const [level, setLevel] = useState(1)

    return (
        <>
            <div className="mr-2">{/* TODO: */}</div>
            <div className={'flex flex-col flex-grow'}>
                <div className="mx-4">
                    {
                        <Slider
                            min={levels[0].level}
                            max={levels[levels.length - 1].level}
                            value={level}
                            label={(v) => `Level ${v}`}
                            onChange={setLevel}
                            aria-label={'Level'}
                        />
                    }
                </div>
                <span>
                    <b>{name}</b>
                </span>
                <br />
                {lfToBr(levels[level - 1].description)}
            </div>
        </>
    )
}

const Skills = ({
    skills,
    yellSkill,
}: {
    skills: Skill[]
    yellSkill?: LiveAbility | ActivityAbility | null
}) => {
    const $t = useTranslations('cards_slug')
    return (
        <Stack>
            {skills.map((skill, key) => (
                <div key={key} className="flex items-center">
                    <Skill key={key} skill={skill} />
                </div>
            ))}
            {yellSkill === null ? (
                <p>{$t('no_yell_skill')}</p>
            ) : yellSkill ? (
                <YellSkill skill={yellSkill} />
            ) : (
                <Skeleton height={300} />
            )}
        </Stack>
    )
}

export default Skills
