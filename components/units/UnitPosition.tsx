import { useState } from 'react'
import { Button } from '@mantine/core'

import type { CardTiny } from './types'
import CardInUnit from './CardInUnit'
import CardSelectionModal from './CardSelectionModal'
import { useTranslations } from 'next-intl'

const UnitPosition = ({
    position,
    card,
    setCard,
    cardList,
    col,
}: {
    position: number
    card: CardTiny | null
    setCard: (c: CardTiny) => void
    cardList: CardTiny[]
    col: number
}) => {
    const [modalOpened, setModalOpened] = useState(false)
    const $t = useTranslations('units')

    return (
        <>
            <CardSelectionModal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title={$t("Select Card At Position", {
                    position: position,
                })}
                cardList={cardList}
                value={card}
                onSelect={setCard}
            />
            <Button
                onClick={() => setModalOpened(true)}
                style={{
                    gridRow: 1,
                    gridColumn: col,
                }}
            >
                {$t("Select Card")}
            </Button>
            {card ? (
                <CardInUnit card={card} col={col} />
            ) : (
                <div
                    className="text-center text-gray-500 mt-3"
                    style={{ gridRow: '2 / span 7', gridColumn: col }}
                >
                    {$t("No Card Selected")}
                </div>
            )}
        </>
    )
}

export default UnitPosition
