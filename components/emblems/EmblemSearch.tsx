'use client'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import type { SearchParams } from './sp'

import FilterSelect from '#components/search/card/FilterSelect'
import EmblemTypes from '#data/emblemTypes'
import useSetSearchParams from '#utils/useSetSearchParams'

const EmblemSearch = () => {
    const $t = useTranslations('emblems')
    const searchParams = useSearchParams()
    const { setSearch } = useSetSearchParams<SearchParams>()

    const emblemType = searchParams.get('s') ?? ''

    return (
        <div className="mt-2 mb-4 rounded-md border-solid border-6 border-sky-500 p-2 flex">
            <FilterSelect
                label={$t('Type')}
                list={Object.keys(EmblemTypes)}
                displayAs={(x) => $t(`type_${x}`)}
                width={300}
                value={emblemType}
                formProps={{
                    onChange: (x: string | null) =>
                        setSearch('s', x as keyof typeof EmblemTypes),
                    value: emblemType,
                }}
                maxDropdownHeight={400}
            />
        </div>
    )
}

export default EmblemSearch
