'use client'

import { Grid, GridCol, NavLink, ScrollArea } from '@mantine/core'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import styles from './page.module.css'

import SquareColor from '#components/characters/SquareColor'
import CharacterItem from '#components/characters/CharacterItem'
import type { APIResponseOf } from '#utils/api'

const CharactersMainView = ({
    CharacterListData,
}: {
    CharacterListData: APIResponseOf<'Character/List'>
}) => {
    const $vc = useTranslations('v-chr')

    const [chrOrderId, setChrOrderId] = useState(0)
    const supportedCharacters = CharacterListData.filter(
        (x) => $vc(x.id) !== x.id,
    )

    return (
        <Grid gutter={20} className="my-3">
            <GridCol span={{ base: 12, lg: 4 }}>
                <ScrollArea
                    style={{ height: 'min(1200px, 70vh)' }}
                    className={styles.smHeightSet}
                >
                    {supportedCharacters
                        .sort((a, b) => a.order - b.order)
                        .map((item, key) => (
                            <NavLink
                                key={key}
                                active={chrOrderId === key}
                                variant="light"
                                onClick={() => {
                                    setChrOrderId(key)
                                }}
                                leftSection={<SquareColor color={item.color} />}
                                label={$vc(item.id)}
                            />
                        ))}
                </ScrollArea>
            </GridCol>
            <GridCol span={{ base: 12, lg: 8 }}>
                {supportedCharacters[chrOrderId] && (
                    <CharacterItem
                        character={supportedCharacters[chrOrderId]}
                    />
                )}
            </GridCol>
        </Grid>
    )
}

export default CharactersMainView
