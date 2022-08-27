import { Button, Divider, Grid, MediaQuery, ScrollArea } from '@mantine/core'
import { useState } from 'react'

import useApi from '#utils/useApi'
import { APIResponseOf } from '#utils/api'
import ListButton from '#components/ListButton'
import { CharacterChineseNameList, CharacterId } from '#data/vendor/characterId'
import allFinished from '#utils/allFinished'
import PageLoading from '#components/PageLoading'
import Title from '#components/Title'
import getI18nProps from '#utils/geti18nProps'
import SquareColor from '#components/characters/SquareColor'
import CharacterItem from '#components/characters/CharacterItem'
import { ExtraLinks } from '#components/characters/const'

const CharactersPage = ({
    CharacterListData,
}: {
    CharacterListData: APIResponseOf<'Character/List'>
}) => {
    const NonNpcCharacterListData = CharacterListData.filter(
        (item) => CharacterChineseNameList[item.id as CharacterId]
    )
    const [chrOrderId, setChrOrderId] = useState(0)

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
                            {NonNpcCharacterListData.sort(
                                (a, b) => a.order - b.order
                            ).map((item, key) => (
                                <ListButton
                                    key={key}
                                    selected={chrOrderId === key}
                                    onClick={() => {
                                        setChrOrderId(key)
                                    }}
                                >
                                    <div className="text-base">
                                        <span lang="zh-CN">
                                            <SquareColor color={item.color} />{' '}
                                            {
                                                CharacterChineseNameList[
                                                    item.id as CharacterId
                                                ]
                                            }
                                        </span>
                                    </div>
                                </ListButton>
                            ))}
                        </ScrollArea>
                    </MediaQuery>
                </Grid.Col>
                <Grid.Col xs={12} lg={8}>
                    {NonNpcCharacterListData?.[chrOrderId] && (
                        <CharacterItem
                            character={NonNpcCharacterListData[chrOrderId]}
                        />
                    )}
                </Grid.Col>
            </Grid>
            <Divider my="sm" />
            {Object.entries(ExtraLinks).map(([title, link], key) => (
                <a key={key} href={link} className="mr-3">
                    <Button>{title}</Button>
                </a>
            ))}
        </>
    )
}

export const getStaticProps = getI18nProps(['characters'])

const SkeletonCharactersPage = () => {
    const { data: CharacterListData } = useApi('Character/List')

    const allData = {
        CharacterListData,
    }

    return (
        <>
            <Title title="角色" />
            {allFinished(allData) ? (
                <CharactersPage {...allData} />
            ) : (
                <PageLoading data={allData} />
            )}
        </>
    )
}

export default SkeletonCharactersPage
