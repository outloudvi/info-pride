import { Skeleton } from '@mantine/core'
import { CardType } from 'hoshimi-types/ProtoEnum'
import { useTranslations } from 'next-intl'

import SkillInUnit from './SkillInUnit'
import type { CardTiny } from './types'

import { Link } from '#utils/navigation'
import useApi from '#utils/useApi'
import AssetImage from '#components/AssetImage'
import { unitColumnId } from '#components/notemap/const'

const CardInUnit = ({ card, col }: { card: CardTiny; col: number }) => {
    const $v = useTranslations('vendor')
    const $vc = useTranslations('v-chr')

    const { data: SkillData } = useApi(`Skill`, {
        ids: `${card.skillId1},${card.skillId2},${card.skillId3}`,
    })

    return (
        <>
            <div
                id={unitColumnId(col)}
                style={{ gridRow: 3, gridColumn: col }}
                className="w-3/4 mx-auto"
            >
                <Link href={`/cards/${card.id}`} target="_blank">
                    <AssetImage
                        name={`img_card_thumb_1_${card.assetId}`}
                        ratio={1}
                        alt={'Small square image'}
                    />
                </Link>
            </div>
            <div style={{ gridRow: 4, gridColumn: col }}>
                <Link href={`/cards/${card.id}`} target="_blank">
                    <b>{card.name}</b>
                </Link>
            </div>
            <div style={{ gridRow: 5, gridColumn: col }}>
                {$vc(card.characterId)}
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
