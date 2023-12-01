'use client'

import { useTranslations } from 'next-intl'
import { SimpleGrid, Skeleton } from '@mantine/core'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'

import Title from '#components/Title'
import useApi from '#utils/useApi'
import Emblem from '#components/emblems/Emblem'
import FilterSelect from '#components/search/card/FilterSelect'
import EmblemTypes from '#data/emblemTypes'
import withQueryParam from '#utils/withQueryParam'

const EmblemsPage = () => {
    const $t = useTranslations('emblems')

    const [emblemType, setEmblemType] = useQueryParam(
        'q',
        withDefault(StringParam, 'Various'),
    )

    const { data: ApiData } = useApi('Emblems', {
        prefix: EmblemTypes[emblemType as keyof typeof EmblemTypes].join(','),
    })

    return (
        <>
            <Title title={$t('Emblems')} />
            <div className="mt-2 mb-4 rounded-md border-solid border-6 border-sky-500 p-2 flex">
                <FilterSelect
                    label={$t('Type')}
                    list={Object.keys(EmblemTypes)}
                    displayAs={(x) => $t(`type_${x}`)}
                    width={300}
                    formProps={{
                        onChange: (x: string | null) => setEmblemType(x),
                        value: emblemType,
                    }}
                    maxDropdownHeight={400}
                />
            </div>
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
                {ApiData ? (
                    ApiData.map((item, key) => <Emblem key={key} item={item} />)
                ) : (
                    <Skeleton height={500} />
                )}
            </SimpleGrid>
        </>
    )
}

export default withQueryParam(EmblemsPage)
