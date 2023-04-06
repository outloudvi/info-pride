import { useTranslations } from 'next-intl'
import { SimpleGrid, Skeleton } from '@mantine/core'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'

import Title from '#components/Title'
import getI18nProps from '#utils/getI18nProps'
import useApi from '#utils/useApi'
import Emblem from '#components/emblems/Emblem'
import FilterSelect from '#components/search/card/FilterSelect'
import EmblemTypes from '#data/emblemTypes'
import withQueryParam from '#utils/withQueryParam'

const EmblemsPage = () => {
    const $t = useTranslations('emblems')

    const [emblemType, setEmblemType] = useQueryParam(
        'q',
        withDefault(StringParam, 'Various')
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
                        onChange: (x) => setEmblemType(x as string),
                        value: emblemType as any,
                    }}
                    maxDropdownHeight={400}
                />
            </div>
            <SimpleGrid
                className="max-w-7xl mx-auto"
                cols={4}
                spacing="lg"
                breakpoints={[
                    { maxWidth: 980, cols: 3, spacing: 'md' },
                    { maxWidth: 755, cols: 2, spacing: 'sm' },
                    { maxWidth: 600, cols: 1, spacing: 'sm' },
                ]}
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

export const getStaticProps = getI18nProps(['emblems'])

export default withQueryParam(EmblemsPage)
