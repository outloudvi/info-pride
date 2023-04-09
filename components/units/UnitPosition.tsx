import { useState } from 'react'
import { Button } from '@mantine/core'

import type { CardTiny } from './types'
import CardInUnit from './CardInUnit'
import CardSelectionModal from './CardSelectionModal'

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

    return (
        <>
            <CardSelectionModal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title={`选择位置 ${position} 的卡片`}
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
                选择卡片
            </Button>
            {card ? (
                <CardInUnit card={card} col={col} />
            ) : (
                <div
                    className="text-center text-gray-500 mt-3"
                    style={{ gridRow: '2 / span 7', gridColumn: col }}
                >
                    未选择卡片
                </div>
            )}
        </>
    )
}

export default UnitPosition
