import { useState } from 'react'
import { Slider, Stack } from '@mantine/core'
import type { Skill } from 'hoshimi-types/ProtoMaster'
import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'
import { useTranslation } from 'next-i18next'

import SkillImage from './SkillImage'
import SkillExplainer from './SkillExplainer'

import type { Card as WikiCard } from '#data/wikiPages/cards'

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

  const { t: $v } = useTranslation('vendor')

  const [level, setLevel] = useState(1)

  return (
    <>
      <div className="mr-2">
        <SkillImage skill={skill} skillImgLevel={useCn ? cnLevel : level} />
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
              (useCn ? descCn : undefined) ?? levels[level - 1].description
            ).replace(/\n+/g, '<br />'),
          }}
        ></span>
        <br />
        {!useCn && <SkillExplainer level={levels[level - 1]} />}
      </div>
    </>
  )
}

const Skills = ({
  skills,
  wikiCardData,
  useCn,
}: {
  skills: Skill[]
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
    </Stack>
  )
}

export default Skills
