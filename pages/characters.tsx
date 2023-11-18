import { Button, Divider, Grid, NavLink, ScrollArea } from '@mantine/core'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import styles from './characters.module.css'

import useApi from '#utils/useApi'
import type { APIResponseOf } from '#utils/api'
import allFinished from '#utils/allFinished'
import PageLoading from '#components/PageLoading'
import Title from '#components/Title'
import getI18nProps from '#utils/getI18nProps'
import SquareColor from '#components/characters/SquareColor'
import CharacterItem from '#components/characters/CharacterItem'
import { ExtraLinks } from '#components/characters/const'

const CharactersPage = ({
    CharacterListData,
}: {
    CharacterListData: APIResponseOf<'Character/List'>
}) => {
    const $t = useTranslations('characters')
    const $vc = useTranslations('v-chr')
    const [chrOrderId, setChrOrderId] = useState(0)
    const supportedCharacters = CharacterListData.filter(
        (x) => $vc(x.id) !== x.id,
    )

    return (
        <>
            <Grid gutter={20} className="my-3">
                <Grid.Col span={{ base: 12, lg: 4 }}>
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
                                    leftSection={
                                        <SquareColor color={item.color} />
                                    }
                                    label={$vc(item.id)}
                                />
                            ))}
                    </ScrollArea>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 8 }}>
                    {supportedCharacters[chrOrderId] && (
                        <CharacterItem
                            character={supportedCharacters[chrOrderId]}
                        />
                    )}
                </Grid.Col>
            </Grid>
            <Divider my="sm" />
            {Object.entries(ExtraLinks).map(([title, link], key) => (
                <a key={key} href={link} className="mr-3">
                    <Button>{$t(title)}</Button>
                </a>
            ))}
        </>
    )
}

const SkeletonCharactersPage = () => {
    const $t = useTranslations('characters')
    const { data: CharacterListData } = useApi('Character/List')

    const allData = {
        CharacterListData,
    }

    return (
        <>
            <Title title={$t('Characters')} />
            {allFinished(allData) ? (
                <CharactersPage {...allData} />
            ) : (
                <PageLoading data={allData} />
            )}
        </>
    )
}

export const getStaticProps = getI18nProps(['characters', 'v-chr', 'v-group'])

export default SkeletonCharactersPage
