import { getTranslations } from 'next-intl/server'

import Title from '#components/Title'
import SearchCardPageMainView from '#components/search/card/SearchCardPageMainView'
import { fetchApi } from '#utils/fetchApi'

const CardSearchPage = async () => {
    const $t = await getTranslations('search')

    const CardData = await fetchApi('Card')
    const SkillAllData = await fetchApi('Skill/All')

    return (
        <>
            <Title title={$t('Card search')} />
            <SearchCardPageMainView
                CardData={CardData}
                SkillAllData={SkillAllData}
            />
        </>
    )
}

export default CardSearchPage
