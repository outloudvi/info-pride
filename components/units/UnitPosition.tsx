import { useState } from 'react'
import { Button, Modal, Select } from '@mantine/core'

import { CardTiny } from './types'
import CardInUnit from './CardInUnit'

import { CharacterChineseNameList, CharacterId } from '#data/vendor/characterId'

const UnitPosition = ({
    position,
    card,
    setCard,
    cardList,
    col,
    useCnTrans,
}: {
    position: number
    card: CardTiny | null
    setCard: (c: CardTiny) => void
    cardList: CardTiny[]
    col: number
    useCnTrans: boolean
}) => {
    const [modalOpened, setModalOpened] = useState(false)

    return (
        <>
            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title={`选择位置 ${position} 的卡片`}
            >
                <Select
                    label="选择一张卡片"
                    data={cardList.map((x) => ({
                        label: `${x.name} / ${
                            CharacterChineseNameList[
                                x.characterId as CharacterId
                            ]
                        }`,
                        value: x.id,
                    }))}
                    searchable
                    value={card?.id}
                    onChange={(e) => {
                        if (!e) return
                        setCard(cardList[cardList.findIndex((c) => c.id === e)])
                    }}
                />
            </Modal>

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
                <CardInUnit card={card} col={col} useCnTrans={useCnTrans} />
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
