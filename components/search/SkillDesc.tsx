import { SkillCategoryType } from '@outloudvi/hoshimi-types/ProtoEnum'
import { Skill } from '@outloudvi/hoshimi-types/ProtoMaster'
import { useTranslation } from 'next-i18next'

const SkillDesc = ({ skill }: { skill: Skill }) => {
  const { t: $v } = useTranslation('vendor')

  const { name, categoryType } = skill
  const highestLevel = skill.levels[skill.levels.length - 1]
  const { description, stamina, coolTime } = highestLevel
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
      <span>
        所需精力 {stamina} / CT {coolTime}
      </span>
    </div>
  )
}

export default SkillDesc
