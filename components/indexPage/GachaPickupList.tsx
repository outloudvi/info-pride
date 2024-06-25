'use client'

import { Button, Group, Tooltip } from '@mantine/core'
import { useState } from 'react'

import AssetImage from '#components/AssetImage'
import type { APIResponseOf } from '#utils/api'
import { Link } from '#utils/navigation'

const GachaPickupList = ({
    pickupCards,
}: {
    pickupCards: APIResponseOf<'Gacha'>[number]['pickupCards']
}) => {
    const [showAll, setShowAll] = useState(false)
    const shownCards = showAll ? pickupCards : pickupCards.slice(0, 4)

    return (
        <Group gap="xs">
            {shownCards.map(({ name, assetId, id }, kkey) => (
                <Tooltip label={name} key={kkey}>
                    <Link href={`/card/${id}`}>
                        <AssetImage
                            name={`img_card_thumb_1_${assetId}`}
                            ratio={1}
                            height="50px"
                            alt={name}
                        />
                    </Link>
                </Tooltip>
            ))}
            {!showAll && pickupCards.length > 4 && (
                <Button
                    size="xs"
                    variant="outline"
                    radius="xl"
                    aria-label="Expand"
                    onClick={() => {
                        setShowAll(true)
                    }}
                >
                    ...
                </Button>
            )}
        </Group>
    )
}

export default GachaPickupList
