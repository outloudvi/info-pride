import { Button, Divider, Grid, GridCol } from '@mantine/core'
import { getTranslations } from 'next-intl/server'
import { pick } from 'lodash'
import { Suspense } from 'react'

import { ExtraLinks } from '#components/characters/const'
import { fetchApi } from '#utils/fetchApi'
import { withAsyncMessages } from '#utils/withMessages'
import { CharacterIds } from '#data/vendor/characterId'
import CharacterItem from '#components/characters/CharacterItem'
import CharacterList from '#components/characters/CharacterList'
import type { SearchParams } from '#components/characters/sp'

const CharactersPage = async ({
    searchParams,
}: {
    searchParams: Partial<SearchParams>
}) => {
    const $t = await getTranslations('characters')
    const $vc = await getTranslations('v-chr')

    const CharacterListData = await fetchApi('Character/List')
    const supportedCharacters = CharacterListData.filter(
        (x) => $vc(x.id) !== x.id,
    )

    // Params
    const characterId = searchParams.chid ?? CharacterIds[0]

    return (
        <>
            <h2>{$t('Characters')}</h2>
            <Grid gutter={20} className="my-3">
                <GridCol span={{ base: 12, lg: 4 }}>
                    <Suspense>
                        <CharacterList
                            characters={supportedCharacters.map((x) =>
                                pick(x, ['id', 'color', 'order']),
                            )}
                        />
                    </Suspense>
                </GridCol>
                <GridCol span={{ base: 12, lg: 8 }}>
                    {
                        <CharacterItem
                            character={
                                CharacterListData.find(
                                    (x) => x.id === characterId,
                                )!
                            }
                        />
                    }
                </GridCol>
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

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'characters' })
    return {
        title: $t('Characters'),
    }
}

export default withAsyncMessages(CharactersPage, [
    'characters',
    'v-chr',
    'v-group',
])
