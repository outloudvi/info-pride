import { Button, Divider } from '@mantine/core'
import { getTranslations } from 'next-intl/server'

import Title from '#components/Title'
import { ExtraLinks } from '#components/characters/const'
import { fetchApi } from '#utils/fetchApi'
import CharactersMainView from '#components/characters/CharactersMainView'

const CharactersPage = async () => {
    const $t = await getTranslations('characters')

    const CharacterListData = await fetchApi('Character/List')

    return (
        <>
            <Title title={$t('Characters')} />
            <CharactersMainView CharacterListData={CharacterListData} />
            <Divider my="sm" />
            {Object.entries(ExtraLinks).map(([title, link], key) => (
                <a key={key} href={link} className="mr-3">
                    <Button>{$t(title)}</Button>
                </a>
            ))}
        </>
    )
}

export default CharactersPage
