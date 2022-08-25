import { Skeleton } from '@mantine/core'
import { CardType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import SkillInUnit from './SkillInUnit'
import { CardTiny } from './types'

import type { Card as WikiCard } from '#data/wikiPages/cards'
import useApi from '#utils/useApi'
import { CharacterChineseNameList, CharacterId } from '#data/vendor/characterId'
import AssetImage from '#components/AssetImage'
import useFrontendApi from '#utils/useFrontendApi'
import { unitColumnId } from '#components/notemap/const'

const CardInUnit = ({
    card,
    col,
    useCnTrans,
}: {
    card: CardTiny
    col: number
    useCnTrans: boolean
}) => {
    const $v = useTranslations('vendor')
    const { data: SkillData } = useApi(`Skill`, {
        ids: `${card.skillId1},${card.skillId2},${card.skillId3}`,
    })
    const { data: WikiCardData } = useFrontendApi('wikiCard', {
        nameJa: card.name,
    })

    const useCn = useCnTrans && (WikiCardData?.length ?? 0) > 0
    const wikiCard = WikiCardData?.[0] as WikiCard | undefined

    return (
        <>
            <div
                id={unitColumnId(col)}
                style={{ gridRow: 3, gridColumn: col }}
                className="w-3/4 mx-auto"
            >
                <Link href={`/cards/${card.id}`}>
                    <a target="_blank">
                        <AssetImage
                            name={`img_card_thumb_1_${card.assetId}`}
                            ratio={1}
                            alt={'Small square image'}
                        />
                    </a>
                </Link>
            </div>
            <div style={{ gridRow: 4, gridColumn: col }}>
                <Link href={`/cards/${card.id}`}>
                    <a target="_blank">
                        <b>{useCn ? wikiCard?.nameCn : card.name}</b>
                    </a>
                </Link>
            </div>
            <div style={{ gridRow: 5, gridColumn: col }}>
                {CharacterChineseNameList[card.characterId as CharacterId]}
            </div>
            <div className="mt-2 mb-3" style={{ gridRow: 6, gridColumn: col }}>
                {$v(CardType[card.type])}
            </div>
            {SkillData ? (
                SkillData.map((x, i) => (
                    <SkillInUnit
                        key={i}
                        className="mb-2"
                        style={{ gridRow: 7 + i, gridColumn: col }}
                        skill={x}
                        skillName={
                            useCn
                                ? wikiCard?.[`ski${(i + 1) as 1 | 2 | 3}NameCn`]
                                : undefined
                        }
                        skillDesc={
                            useCn
                                ? wikiCard?.[`ski${(i + 1) as 1 | 2 | 3}DescCn`]
                                : undefined
                        }
                    />
                ))
            ) : (
                <Skeleton
                    height={300}
                    style={{ gridRow: '7 / span 3', gridColumn: col }}
                />
            )}
        </>
    )
}

export default CardInUnit
