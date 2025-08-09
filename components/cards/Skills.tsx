'use client'

import { useState } from 'react'
import { Skeleton, Slider, Stack, Tooltip } from '@mantine/core'
import type {
    ActivityAbility,
    LiveAbility,
    Skill,
} from 'hoshimi-types/ProtoMaster'
import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import SkillImage from './SkillImage'

import lfToBr from '#utils/lfToBr'

const SkillBlock = ({
    skill,
    className = '',
}: {
    skill: Skill
    className?: string
}) => {
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
    kizunaSkill,
    yellSkill,
}: {
    skills: Skill[]
    kizunaSkill?: Skill
    yellSkill?: LiveAbility | ActivityAbility | null
}) => {
    const $t = useTranslations('cards_slug')

    return (
        <Stack>
            {skills.map((skill, key) => (
                <div key={key} className="flex items-center">
                    <SkillBlock key={key} skill={skill} />
                </div>
            ))}
            {kizunaSkill !== undefined && (
                <div>
                    <div>
                        {$t('Kizuna skill')}{' '}
                        <Tooltip label={$t('kizuna_skill_tooltip')}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </Tooltip>
                    </div>
                    <div className="flex items-center">
                        <SkillBlock skill={kizunaSkill} />
                    </div>
                </div>
            )}
            {yellSkill === null ? (
                <p>{$t('no_yell_skill')}</p>
            ) : yellSkill ? (
                <div>
                    <div>
                        {$t('Yell skill')}{' '}
                        <Tooltip label={$t('yell_skill_tooltip')}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </Tooltip>
                    </div>
                    <YellSkill skill={yellSkill} />
                </div>
            ) : (
                <Skeleton height={300} />
            )}
        </Stack>
    )
}

export default Skills
