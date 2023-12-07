import { Button, Divider } from '@mantine/core'
import { getTranslations } from 'next-intl/server'

import { ExtraLinks } from '#components/characters/const'
import { fetchApi } from '#utils/fetchApi'
import CharactersMainView from '#components/characters/CharactersMainView'
import { withAsyncMessages } from '#utils/withMessages'

const CharactersPage = async () => {
    const $t = await getTranslations('characters')

    const CharacterListData = await fetchApi('Character/List')

    return (
        <>
            <h2>{$t('Characters')}</h2>
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
