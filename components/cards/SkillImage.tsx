/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from 'react'
import type { Skill } from 'hoshimi-types/ProtoMaster'
import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'

import Paths from '#utils/paths'

// In reference of Meidayo: https://github.com/Soulycoris/meidayo/blob/main/html/src/composables/skill.ts

const pathAssetsForImg = Paths.assetsImg

type SkillImageBgType = 'score' | 'strength' | 'support' | 'yell' | ''

enum CornerType {
    Opponent,
    Negative,
    Neutral,
}

// Background for non-SP skills
function getSkillImageBgPrefix(typ: string): SkillImageBgType {
    if (typ.includes('score_get')) {
        return 'score'
    }

    if ((typ.includes('up') || typ.includes('boost')) && !isDebuff(typ)) {
        return 'strength'
    }

    return 'support'
}

function buildSkillImage(parts: ReactNode[]): JSX.Element {
    return (
        <div className="h-16 w-16 relative rounded-[14px] border-4 border-solid border-black box-content select-none">
            {parts.map((x) => x)}
        </div>
    )
}

function isDebuff(skill?: string): boolean {
    return (
        ['down', 'consumption-increase', 'impossible', 'erasing'].filter((x) =>
            skill?.includes(x),
        ).length > 0
    )
}

function getCornerTriangleType(skill: string): CornerType {
    if (skill.includes('opponent')) {
        return CornerType.Opponent
    }
    if (isDebuff(skill)) {
        return CornerType.Negative
    }
    return CornerType.Neutral
}

// https://github.com/MalitsPlus/sakura-love/blob/97174f278e2ad8146f80cc3a0f5d64ca57e7fda3/components/media/SkillIcon.tsx#L71-L72
const CornerTriangleColor: Record<CornerType, string> = {
    [CornerType.Opponent]: '#fc7e44',
    [CornerType.Negative]: '#d80032',
    [CornerType.Neutral]: '#d7d7d6',
}

// really really chaotic
const SkillImage = ({
    skill,
    skillImgLevel,
}: {
    skill: Skill
    skillImgLevel: number
}) => {
    const parts: ReactNode[] = []

    const keySkillEfficacyId =
        skill.levels[0].skillDetails.length >= 2
            ? skill.levels[0].skillDetails[1].efficacyId
            : skill.levels[0].skillDetails[0].efficacyId

    /**
     * L1-L3: 1
     * L4-L5: 2
     * L6: 3
     */
    const skillImageBg =
        skill.categoryType === SkillCategoryType.Special
            ? `bg_special_${
                  skillImgLevel >= 6 ? 3 : skillImgLevel >= 4 ? 2 : 1
              }`
            : `bg_${getSkillImageBgPrefix(keySkillEfficacyId.split('-')[1])}_${
                  skillImgLevel >= 6 ? 3 : skillImgLevel >= 4 ? 2 : 1
              }`

    parts.push(
        <img
            key={'bg'}
            src={Paths.sprite(skillImageBg)}
            alt="Skill background"
            className="absolute h-16 w-16"
        />,
    )

    // For skills with an assetId (usually SP)
    if (skill.assetId) {
        // Use assetId as foreground
        parts.push(
            <img
                key={'ic'}
                src={pathAssetsForImg(`img_icon_skill_${skill.assetId}`)}
                alt="Skill icon"
                className="absolute h-16 w-16 invert"
                style={{
                    filter: 'invert(1)',
                }}
            />,
        )
        return buildSkillImage(parts)
    }

    // For non-SPs
    const skillIcons: (string | undefined)[] = (
        skill.levels.find((x) => x.level === skillImgLevel) ?? skill.levels[0]
    ).skillDetails.map(
        (x) =>
            'img_icon_skill-normal_' +
            x.efficacyId.split('-')[1].replace(/_/g, '-'),
    )

    if (skillIcons.length === 0) {
        // No skill effects (unlikely)
        return buildSkillImage(parts)
    }

    if (skillIcons.length === 1) {
        parts.push(
            <img
                key={'sc'}
                src={pathAssetsForImg(skillIcons[0] as string)}
                alt="Skill icon"
                height={64}
                width={64}
                className="absolute"
                style={{
                    filter: 'invert(1)',
                }}
            />,
        )
        return buildSkillImage(parts)
    }

    // Debuff goes #3
    const debuffIndex = skillIcons.findIndex((x) => isDebuff(x))
    if (debuffIndex !== -1 && debuffIndex !== 2) {
        ;[skillIcons[2], skillIcons[debuffIndex]] = [
            skillIcons[debuffIndex],
            skillIcons[2],
        ]
    }

    // score-get series goes #2
    const scoreGetIndex = skillIcons.findIndex((x) => x?.includes('score-get'))
    if (scoreGetIndex !== -1 && scoreGetIndex !== 1) {
        ;[skillIcons[1], skillIcons[scoreGetIndex]] = [
            skillIcons[scoreGetIndex],
            skillIcons[1],
        ]
    }

    // Remove non-debuff #3
    if (skillIcons[2] && !isDebuff(skillIcons[2])) {
        delete skillIcons[2]
    }

    if (skillIcons[0]) {
        if (skillIcons[1]) {
            // Center-left large icon
            parts.push(
                <img
                    key={'pi'}
                    src={pathAssetsForImg(skillIcons[0])}
                    loading="lazy"
                    height={54.4}
                    width={54.4}
                    className="absolute left-0 bottom-0 -ml-1 -mb-1"
                    alt="Primary component of the skill icon"
                    style={{
                        filter: 'invert(1)',
                    }}
                />,
            )
        } else {
            // Center large icon
            parts.push(
                <img
                    key={'ci'}
                    src={pathAssetsForImg(skillIcons[0])}
                    alt="Skill icon"
                    height={64}
                    width={64}
                    className="absolute"
                    style={{
                        filter: 'invert(1)',
                    }}
                />,
            )
        }
    }

    if (skillIcons[1]) {
        // Top-right small icon
        parts.push(
            <img
                key={'ti'}
                src={pathAssetsForImg(skillIcons[1])}
                loading="lazy"
                height={32}
                width={32}
                className="absolute top-0 right-0"
                alt="Secondary component of the skill icon"
                style={{
                    filter: 'invert(1)',
                }}
            />,
        )
    }

    if (skillIcons[2]) {
        // Square
        const cornerTriangleType = getCornerTriangleType(skillIcons[2])
        parts.push(
            <div
                style={{
                    backgroundColor: CornerTriangleColor[cornerTriangleType],
                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                }}
                className="absolute left-1/2 right-0 bottom-0 top-1/2"
            />,
        )

        // Bottom-right tiny icon
        parts.push(
            <img
                key={'bi'}
                src={pathAssetsForImg(skillIcons[2])}
                loading="lazy"
                height={20}
                width={20}
                className="absolute right-0 bottom-0"
                alt="Primary component of the skill icon"
                style={{
                    filter: 'invert(1)',
                }}
            />,
        )
    }

    return buildSkillImage(parts)
}

export default SkillImage
