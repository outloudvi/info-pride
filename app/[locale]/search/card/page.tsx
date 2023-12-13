import { getTranslations } from 'next-intl/server'

import SearchCardPageMainView from '#components/search/card/SearchCardPageMainView'
import { fetchApi } from '#utils/fetchApi'
import { withAsyncMessages } from '#utils/withMessages'

const CardSearchPage = async () => {
    const $t = await getTranslations('search')

    const CardData = await fetchApi('Card')
    const SkillAllData = await fetchApi('Skill/All')

    return (
        <>
            <h2>{$t('Card search')}</h2>
            <SearchCardPageMainView
                CardData={CardData}
                SkillAllData={SkillAllData}
            />
        </>
    )
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'search' })
    return {
        title: $t('Card search'),
    }
}

export default withAsyncMessages(CardSearchPage, [
    'search',
    'vendor',
    'v-chr',
    'v-card-alias',
])
