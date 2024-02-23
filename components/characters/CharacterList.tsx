'use client'

import type { Character } from 'hoshimi-types/ProtoMaster'
import { useSearchParams } from 'next/navigation'
import { NavLink, ScrollArea } from '@mantine/core'
import { useTranslations } from 'next-intl'

import SquareColor from './SquareColor'
import styles from './page.module.css'
import type { SearchParams } from './sp'

import { CharacterIds } from '#data/vendor/characterId'
import useSetSearchParams from '#utils/useSetSearchParams'

const CharacterList = ({
    characters,
}: {
    characters: Pick<Character, 'id' | 'color' | 'order'>[]
}) => {
    const $vc = useTranslations('v-chr')
    const searchParams = useSearchParams()
    const { setSearch } = useSetSearchParams<SearchParams>()

    const characterId = searchParams.get('chid') ?? CharacterIds[0]

    return (
        <ScrollArea
            style={{ height: 'min(1200px, 70vh)' }}
            className={styles.smHeightSet}
        >
            {characters
                .sort((a, b) => a.order - b.order)
                .map((item, key) => (
                    <NavLink
                        key={key}
                        active={characterId === item.id}
                        variant="light"
                        onClick={() => {
                            setSearch('chid', item.id)
                        }}
                        leftSection={<SquareColor color={item.color} />}
                        label={$vc(item.id)}
                    />
                ))}
        </ScrollArea>
    )
}

export default CharacterList
