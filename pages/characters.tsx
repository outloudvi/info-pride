import { Button, Divider, Grid, MediaQuery, ScrollArea } from '@mantine/core'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import useApi from '#utils/useApi'
import { APIResponseOf } from '#utils/api'
import ListButton from '#components/ListButton'
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
        (x) => $vc(x.id) !== x.id
    )

    return (
        <>
            <Grid gutter={20} className="my-3">
                <Grid.Col xs={12} lg={4}>
                    <MediaQuery
                        smallerThan="sm"
                        styles={{
                            height: '300px !important',
                        }}
                    >
                        <ScrollArea style={{ height: 'min(1200px, 70vh)' }}>
                            {supportedCharacters
                                .sort((a, b) => a.order - b.order)
                                .map((item, key) => (
                                    <ListButton
                                        key={key}
                                        selected={chrOrderId === key}
                                        onClick={() => {
                                            setChrOrderId(key)
                                        }}
                                    >
                                        <div className="text-base">
                                            <span lang="zh-CN">
                                                <SquareColor
                                                    color={item.color}
                                                />{' '}
                                                {$vc(item.id)}
                                            </span>
                                        </div>
                                    </ListButton>
                                ))}
                        </ScrollArea>
                    </MediaQuery>
                </Grid.Col>
                <Grid.Col xs={12} lg={8}>
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
