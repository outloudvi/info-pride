'use client'

import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { TextInput } from '@mantine/core'
import { useTranslations } from 'next-intl'

import type { SearchParams } from './sp'

import useSetSearchParams from '#utils/useSetSearchParams'

const SearchBox = ({ q }: { q?: string }) => {
    const $t = useTranslations('message_search')
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

export default SearchBox
