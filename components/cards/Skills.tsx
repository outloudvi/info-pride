import { useState } from 'react'
import { Slider, Stack } from '@mantine/core'
import type { Skill } from 'hoshimi-types/ProtoMaster'
import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'
import { useTranslation } from 'next-i18next'

import type { Card as WikiCard } from '#data/wikiPages/cards'
import AssetImage from '#components/AssetImage'
import Paths from '#utils/paths'

// really really chaotic
// TODO: background
const SkillImage = ({ skill }: { skill: Skill }) => {
  if (skill.assetId) {
    return (
      <AssetImage
        height={64}
        name={`img_icon_skill_${skill.assetId}`}
        ratio={1}
        alt={'Skill icon'}
        className="bg-black"
      />
    )
  }

  const skillIcons = skill.levels[0].skillDetails.map(
    (x) =>
      'img_icon_skill-normal_' + x.efficacyId.split('-')[1].replace(/_/g, '-')
  )

  if (skillIcons.length === 1) {
    return (
      <AssetImage
        height={64}
        name={skillIcons[0]}
        ratio={1}
        alt={'Skill icon'}
        className="bg-black absolute -mt-1 -mr-1"
      />
    )
  }

  if (skillIcons.length === 2) {
    // https://wiki.biligame.com/idolypride/模板:技能图标
    return (
      <div className="h-16 w-16 relative bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={Paths.assets(skillIcons[1])}
          loading="lazy"
          height={54.4}
          width={54.4}
          className="absolute left-0 bottom-0 -ml-1 -mb-1"
          alt="Primary component of the skill icon"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={Paths.assets(skillIcons[0])}
          loading="lazy"
          height={32}
          width={32}
          className="absolute top-0 right-0"
          alt="Secondary component of the skill icon"
        />
      </div>
    )
  }

  return <></>
}

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
    <Stack>
      {skills.map((skill, key) => (
        <div key={key} className="flex items-center">
          <div className="mr-2">
            <SkillImage skill={skill} />
          </div>
          <Skill
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
        </div>
      ))}
    </Stack>
  )
}

export default Skills
