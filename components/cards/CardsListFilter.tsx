'use client'

import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Checkbox } from '@mantine/core'

import { ITEMS_SPLIT, type SearchParams } from './sp'
import CardFaceTypes from './cardFaceTypes'

import useSetSearchParams from '#utils/useSetSearchParams'
import {
    FilterSelect,
    MultipleFilterSelect,
} from '#components/search/card/FilterSelect'
import { CharacterIds } from '#data/vendor/characterId'

const CardsListFilter = () => {
    const searchParams = useSearchParams()
    const { setSearch } = useSetSearchParams<SearchParams>()

    const characterIds = searchParams.get('c')?.split(ITEMS_SPLIT) ?? []
    const type = searchParams.get('type')?.split(ITEMS_SPLIT) ?? []
    const prop = searchParams.get('prop')?.split(ITEMS_SPLIT) ?? []
    const theme = searchParams.get('theme')?.split(ITEMS_SPLIT) ?? []
    const order = searchParams.get('order')
    const reverse =
        searchParams.get('reverse') === null
            ? true
            : searchParams.get('reverse') === '1'

    const $v = useTranslations('vendor')
    const $vc = useTranslations('v-chr')
    const $t = useTranslations('cards')

    return (
        <div className="mt-2 mb-4 rounded-md border-solid border-6 border-sky-500 p-2">
            <div className="flex items-center mb-2 flex-wrap">
                <MultipleFilterSelect
                    className="mr-2"
                    label={$t('Character')}
                    list={CharacterIds}
                    displayAs={$vc}
                    width={200}
                    value={characterIds}
                    onChange={(r) => {
                        setSearch('c', r.join(ITEMS_SPLIT))
                    }}
                />
                <MultipleFilterSelect
                    className="mr-2"
                    label={$t('Type')}
                    list={['Appeal', 'Technique', 'Support']}
                    displayAs={$v}
                    width={200}
                    value={type}
                    onChange={(r) => {
                        setSearch('type', r.join(ITEMS_SPLIT))
                    }}
                />
                <MultipleFilterSelect
                    className="mr-2"
                    label={$t('Property')}
                    list={['Dance', 'Vocal', 'Visual']}
                    displayAs={$v}
                    width={200}
                    value={prop}
                    onChange={(r) => {
                        setSearch('prop', r.join(ITEMS_SPLIT))
                    }}
                />
                <MultipleFilterSelect
                    className="mr-2"
                    label={$t('Theme')}
                    list={CardFaceTypes}
                    displayAs={(x) => $t(`cardface_${x}`)}
                    width={200}
                    value={theme}
                    onChange={(r) => {
                        setSearch('theme', r.join(ITEMS_SPLIT))
                    }}
                />
                <FilterSelect
                    className="mr-2"
                    label={$t('Sort')}
                    list={[
                        'releaseDate',
                        'idol',
                        'vocalPt',
                        'dancePt',
                        'visualPt',
                    ]}
                    displayAs={$t}
                    width={200}
                    value={
                        // per default in spToSo.ts
                        order ?? 'releaseDate'
                    }
                    onChange={(r) => setSearch('order', r ?? 'releaseDate')}
                />
                <Checkbox
                    label={$t('Descending')}
                    defaultChecked={reverse}
                    onChange={(r) => {
                        setSearch('reverse', r.target.checked ? '1' : '0')
                    }}
                />
            </div>
        </div>
    )
}

export default CardsListFilter
