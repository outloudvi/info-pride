import { useState } from 'react'
import { Skeleton, Slider, Stack } from '@mantine/core'
import type { LiveAbility} from 'hoshimi-types/ProtoMaster';
import { Skill } from 'hoshimi-types/ProtoMaster'
import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'

import SkillImage from './SkillImage'
import SkillExplainer from './SkillExplainer'

import type { Card as WikiCard } from '#data/wikiPages/cards'
import lfToBr from '#utils/lfToBr'

const Skill = ({
    skill,
    useCn,
    cnLevel,
    titleCn,
    descCn,
    className,
}: {
    skill: Skill
    useCn: boolean
    cnLevel: number
    className?: string
    titleCn?: string
    descCn?: string
}) => {
    const { name, categoryType, levels } = skill

    const $v = useTranslations('vendor')

    const [level, setLevel] = useState(1)

    return (
        <>
            <div className="mr-2">
                <SkillImage
                    skill={skill}
                    skillImgLevel={useCn ? cnLevel : level}
                />
            </div>
            <div className={className + ' flex flex-col flex-grow'}>
                <div className="mx-4">
                    {!useCn && (
                        <Slider
                            min={levels[0].level}
                            max={levels[levels.length - 1].level}
                            value={level}
                            label={(v) => `Level ${v}`}
                            onChange={setLevel}
                            aria-label={'Level'}
                        />
                    )}
                </div>
                <span>
                    <b>{(useCn ? titleCn : undefined) ?? name}</b> /{' '}
                    {$v(SkillCategoryType[categoryType])}
                </span>
                <br />
                <span
                    dangerouslySetInnerHTML={{
                        __html: (
                            (useCn ? descCn : undefined) ??
                            levels[level - 1].description
                        ).replace(/\n+/g, '<br />'),
                    }}
                ></span>
                <br />
                {!useCn && <SkillExplainer level={levels[level - 1]} />}
            </div>
        </>
    )
}

const YellSkill = ({ skill }: { skill: LiveAbility }) => {
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
    wikiCardData,
    useCn,
}: {
    skills: Skill[]
    yellSkill?: LiveAbility
    wikiCardData?: WikiCard
    useCn: boolean
}) => {
    return (
        <Stack>
            {skills.map((skill, key) => (
                <div key={key} className="flex items-center">
                    <Skill
                        key={key}
                        skill={skill}
                        useCn={useCn}
                        cnLevel={6 - key}
                        titleCn={
                            wikiCardData?.[
                                `ski${key + 1}NameCn` as
                                    | 'ski1NameCn'
                                    | 'ski2NameCn'
                                    | 'ski3NameCn'
                            ]
                        }
                        descCn={
                            wikiCardData?.[
                                `ski${key + 1}DescCn` as
                                    | 'ski1NameCn'
                                    | 'ski2NameCn'
                                    | 'ski3NameCn'
                            ] as string | undefined
                        }
                    />
                </div>
            ))}
            {yellSkill ? (
                <YellSkill skill={yellSkill} />
            ) : (
                <Skeleton height={300} />
            )}
        </Stack>
    )
}

export default Skills
