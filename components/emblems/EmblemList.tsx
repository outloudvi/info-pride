import { SimpleGrid, Skeleton } from '@mantine/core'

import Emblem from '#components/emblems/Emblem'
import EmblemTypes from '#data/emblemTypes'
import { fetchApi } from '#utils/fetchApi'

const EmblemList = async ({ search }: { search: keyof typeof EmblemTypes }) => {
    const ApiData = await fetchApi('Emblems', {
        prefix: EmblemTypes[search].join(','),
    })

    return (
        <>
            <SimpleGrid
                className="max-w-7xl mx-auto"
                cols={{
                    base: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                }}
                verticalSpacing={{
                    base: 'sm',
                    md: 'md',
                    lg: 'lg',
                }}
            >
                {ApiData.map((item, key) => (
                    <Emblem key={key} item={item} />
                ))}
            </SimpleGrid>
        </>
    )
}

export default EmblemList
