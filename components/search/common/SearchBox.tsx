'use client'

import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { TextInput } from '@mantine/core'
import { useTranslations } from 'next-intl'

import type { SearchParams } from './sp'

import useSetSearchParams from '#utils/useSetSearchParams'

export default function searchBoxBuilder(string_namespace: string) {
    const SearchBox = ({ q }: { q?: string }) => {
        const $t = useTranslations(string_namespace)
        const { setSearch } = useSetSearchParams<SearchParams>()
        const [realtimeQ, setRealtimeQ] = useState(q ?? '')
        const [debouncedQ] = useDebouncedValue(realtimeQ, 700)

        useEffect(() => {
            setSearch('q', debouncedQ)
        }, [debouncedQ, setSearch])

        return (
            <TextInput
                value={realtimeQ}
                onChange={(event) => {
                    setRealtimeQ(event.currentTarget.value)
                }}
                placeholder={$t('search_placeholder')}
                className="mb-3"
            />
        )
    }

    return SearchBox
}
