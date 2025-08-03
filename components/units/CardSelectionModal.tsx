import {  Modal, Select } from '@mantine/core'
import { useTranslations } from 'next-intl'

import type { CardTiny } from './types'

import AssetImage from '#components/AssetImage'

const CardSelectionModal = ({
    opened,
    value,
    onClose,
    onSelect,
    title,
    cardList,
}: {
    opened: boolean
    value: CardTiny | null
    onClose: () => void
    onSelect: (c: CardTiny) => void
    title: string
    cardList: CardTiny[]
}) => {
    const $vc = useTranslations('v-chr')
    const $t = useTranslations('card_selection_modal')
    return (
        <Modal
            size="xl"
            opened={opened}
            onClose={onClose}
            title={title}
            closeButtonProps={{
                'aria-label': 'Close',
            }}
        >
            <Select
                label={$t("Select a card")}
                data={cardList.map((x) => ({
                    label: `${x.name} / ${$vc(x.characterId)}`,
                    value: x.id,
                }))}
                searchable
                value={value?.id}
                onChange={(e) => {
                    if (!e) return
                    onSelect(cardList[cardList.findIndex((c) => c.id === e)])
                }}
            />

            <div className="mt-2 flex flex-wrap p-2 gap-1 justify-start max-h-[70vh] overflow-auto">
                {cardList
                    .sort(
                        (a, b) => Number(b.releaseDate) - Number(a.releaseDate)
                    )
                    .map((card) => (
                        <AssetImage
                            className="rounded"
                            key={card.id}
                            name={`img_card_thumb_1_${card.assetId}`}
                            ratio={1}
                            height={55}
                            alt={`Card thumbnail of ${card.name}`}
                            onClick={() => onSelect(card)}
                        />
                    ))}
            </div>
        </Modal>
    )
}

export default CardSelectionModal
