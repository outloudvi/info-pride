'use client'

import { useState, useEffect } from 'react'
import { Autocomplete } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { uniqBy } from 'lodash'

import type { ChType } from '../types'

import vChr from '#locales/ja/v-chr.json'
import { CharacterIds } from '#data/vendor/characterId'

interface CharacterSelectorProps {
    value: string
    returnType: ChType
    onChange: (value: string) => void
}

interface CharacterCandidate {
    value: string
    label: string
}

const buildCharacterCandidates = (
    returnType: ChType,
    translateCharacter: (key: string) => string,
    translateCommon: (key: string) => string,
): CharacterCandidate[] => {
    const isReturnName = returnType === 'name'
    const characters = Object.keys(vChr).map((key) => ({
        value: key,
        label: translateCharacter(key),
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
        : sortedCharacters.map((x) => ({
              value: x.value,
              label: `${x.label} (${x.value})`,
          }))
    return [
        {
            label: translateCommon('(All)'),
            value: '',
        },
        ...deduped,
    ]
}

const createSelectionToValue = (
    candidates: CharacterCandidate[],
    returnType: ChType,
) => {
    const labelToId = new Map(candidates.map((c) => [c.label, c.value]))
    const isReturnName = returnType === 'name'
    return (sel: string) => {
        if (sel === '' || (!isReturnName && labelToId.get(sel) === ''))
            return ''
        if (isReturnName) return sel
        return labelToId.get(sel) ?? sel
    }
}

const CharacterSelector = ({
    value,
    returnType,
    onChange,
}: CharacterSelectorProps) => {
    const $c = useTranslations('common')
    const $vc = useTranslations('v-chr')

    const candidates = buildCharacterCandidates(
        returnType,
        (key) => $vc(key),
        (key) => $c(key),
    )
    const selectionToValue = createSelectionToValue(candidates, returnType)

    const [search, setSearch] = useState(selectionToValue(value))

    useEffect(() => {
        onChange(selectionToValue(search))
    }, [search, onChange, selectionToValue])

    return (
        <Autocomplete
            data={candidates.map((c) => c.label)}
            value={search}
            onChange={setSearch}
            label={$c('Filter')}
        />
    )
}

export default CharacterSelector
