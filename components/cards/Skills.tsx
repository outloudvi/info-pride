import { useState } from 'react'
import { Grid, Slider } from '@mantine/core'
import type { Skill } from 'hoshimi-types/ProtoMaster'
import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'
import { useTranslation } from 'next-i18next'

import type { Card as WikiCard } from '#data/wikiPages/cards'
import AssetImage from '#components/AssetImage'

const Skill = ({
  skill,
  titleCn,
  descCn,
  className,
}: {
  skill: Skill
  className?: string
  titleCn?: string
  descCn?: string
}) => {
  const { name, categoryType, levels } = skill

  const { t: $v } = useTranslation('vendor')

  const [level, setLevel] = useState(1)

  return (
    <div className={className + ' flex flex-col'}>
      <div className="mx-4">
        {!(titleCn || descCn) && (
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
        <b>{titleCn ?? name}</b> / {$v(SkillCategoryType[categoryType])}
      </span>
      <br />
      <span
        dangerouslySetInnerHTML={{
          __html: (descCn ?? levels[level - 1].description).replace(
            /\n/g,
            '<br />'
          ),
        }}
      ></span>
    </div>
  )
}

const Skills = ({
  skills,
  wikiCardData,
}: {
  skills: Skill[]
  wikiCardData?: WikiCard
}) => {
  return (
    <Grid className="max-w-full">
      {skills.map((skill, key) => (
        <Grid.Col span={4} key={key}>
          <Skill
            className="grow"
            key={key}
            skill={skill}
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
        </Grid.Col>
      ))}
    </Grid>
  )
}

export default Skills
