'use client'

import { useState, useEffect } from 'react'
import { NativeSelect } from '@mantine/core'
import { useTranslations } from 'next-intl'
import vChr from '#locales/ja/v-chr.json'
import type { ChType } from '../types'

interface CharacterSelectorProps {
    value: string
    returnType: ChType
    onChange: (value: string) => void
}

const CharacterSelector = ({
    value,
    returnType,
    onChange,
}: CharacterSelectorProps) => {
    const $c = useTranslations('common')
    const $vc = useTranslations('v-chr')

    const [search, setSearch] = useState(value)
    const candidates = [
        {
            label: $c('(All)'),
            value: '',
        },
        ...Object.entries(vChr).map(([key, str]) => ({
            value: key,
            label: $vc(key),
        })),
    ]

    useEffect(() => {
        if (search === '') {
            onChange('')
        } else if (returnType === 'id') {
            onChange(search)
        } else {
            onChange((vChr as Record<string, string>)[search] ?? search)
        }
    }, [search])

    return (
        <NativeSelect
            data={candidates}
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            label={$c('Filter')}
        />
    )
}

export default CharacterSelector
