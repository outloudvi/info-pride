'use client'

import { useState, useEffect } from 'react'
import { NativeSelect } from '@mantine/core'
import { useTranslations } from 'next-intl'
import vChr from '#locales/ja/v-chr.json'
import { CharacterIds } from '#data/vendor/characterId'
import type { ChType } from '../types'
import { uniqBy } from 'lodash'

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

    const isReturnName = returnType === 'name'
    const characters = Object.keys(vChr).map((key) => ({
        value: key,
        label: $vc(key),
    }))
    const characterOrder: Map<string, number> = new Map(
        CharacterIds.map((id, index) => [id, index]),
    )
    const sortedCharacters = [...characters].sort((a, b) => {
        const aIndex = characterOrder.get(a.value)
        const bIndex = characterOrder.get(b.value)
        if (aIndex !== undefined && bIndex !== undefined) {
            return aIndex - bIndex
        }
        if (aIndex !== undefined) return -1
        if (bIndex !== undefined) return 1
        return a.value.localeCompare(b.value)
    })
    const deduped = isReturnName
        ? uniqBy(
              sortedCharacters,
              (x) => (vChr as Record<string, string>)[x.value],
          )
        : sortedCharacters.map((x) => (x.label = `${x.label} (${x.value})`))
    const candidates = [
        {
            label: $c('(All)'),
            value: '',
        },
        ...deduped,
    ]

    useEffect(() => {
        if (search === '') {
            onChange('')
        } else if (isReturnName) {
            onChange((vChr as Record<string, string>)[search] ?? search)
        } else {
            onChange(search)
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
