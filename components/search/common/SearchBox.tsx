'use client'

import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { TextInput, Flex } from '@mantine/core'
import { useTranslations } from 'next-intl'

import type { ChType } from '../types'

import CharacterSelector from './CharacterSelector'
import useSetSearchParams from '#utils/useSetSearchParams'

export default function searchBoxBuilder(string_namespace: string) {
    const SearchBox = ({
        q,
        returnType,
        character,
    }: {
        q?: string
        character?: string
        returnType: ChType
    }) => {
        const $t = useTranslations(string_namespace)
        const { setSearch } = useSetSearchParams()
        const [realtimeQ, setRealtimeQ] = useState(q ?? '')
        const [realtimeChar, setRealtimeChar] = useState(character ?? '')
        const [debouncedQ] = useDebouncedValue(realtimeQ, 700)
        const [debouncedChar] = useDebouncedValue(realtimeChar, 700)

        useEffect(() => {
            setSearch('q', debouncedQ)
        }, [debouncedQ, setSearch])

        useEffect(() => {
            setSearch(returnType === 'id' ? 'chid' : 'chname', debouncedChar)
        }, [debouncedChar, setSearch])

        return (
            <Flex wrap="wrap" gap="sm" className="mb-3">
                <TextInput
                    value={realtimeQ}
                    onChange={(event) => {
                        setRealtimeQ(event.currentTarget.value)
                    }}
                    placeholder={$t('search_placeholder')}
                    className="flex-grow w-full sm:w-auto"
                    label={$t('Keyword')}
                />
                <CharacterSelector
                    value={realtimeChar}
                    onChange={setRealtimeChar}
                    returnType={returnType}
                />
            </Flex>
        )
    }

    return SearchBox
}
