'use client'

import { useState, useEffect } from 'react'
import { Autocomplete, Flex, Tooltip } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { uniqBy } from 'lodash'

import type { ChType } from '../types'

import vChr from '#locales/ja/v-chr.json'
import { CharacterIds } from '#data/vendor/characterId'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

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
    const allVendorCharacterIds = Object.keys(vChr)
    const characterOrder: Map<string, number> = new Map(
        CharacterIds.map((id, index) => [id, index]),
    )
    const sortedCharacterIds = [...allVendorCharacterIds].sort((a, b) => {
        const aIndex = characterOrder.get(a)
        const bIndex = characterOrder.get(b)
        if (aIndex !== undefined && bIndex !== undefined) {
            return aIndex - bIndex
        }
        if (aIndex !== undefined) return -1
        if (bIndex !== undefined) return 1
        return a.localeCompare(b)
    })
    const listItems = isReturnName
        ? sortedCharacterIds.map((id) => ({
              value: (vChr as Record<string, string>)[id], // original name
              label: translateCharacter(id), // translated name
          }))
        : sortedCharacterIds.map((id) => ({
              value: id, // character id
              label: `${translateCharacter(id)} (${id})`, // translated name
          }))
    return [
        {
            label: translateCommon('(All)'),
            value: '',
        },
        ...uniqBy(listItems, (x) => x.value),
    ]
}

const CharacterSelector = ({
    value,
    returnType,
    onChange,
}: CharacterSelectorProps) => {
    const $t = useTranslations('story_search')
    const $c = useTranslations('common')
    const $vc = useTranslations('v-chr')

    const candidates = buildCharacterCandidates(returnType, $vc, $c)

    const [search, setSearch] = useState(() =>
        value === ''
            ? ''
            : (candidates.find((x) => x.value === value)?.label ?? ''),
    )

    useEffect(() => {
        onChange(
            search === ''
                ? ''
                : (candidates.find((x) => x.label === search)?.value ?? search),
        )
    }, [search, onChange])

    return (
        <Autocomplete
            data={candidates.map((c) => c.label)}
            value={search}
            onChange={setSearch}
            label={
                <Flex align="center">
                    <span>{$c('Filter')}</span>
                    <Tooltip
                        className="ml-2"
                        label={$t('name_in_original_language')}
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </Tooltip>
                </Flex>
            }
        />
    )
}

export default CharacterSelector
