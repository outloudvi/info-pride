'use client'

import { Skeleton } from '@mantine/core'
import { useTranslations } from 'next-intl'

import SearchCardPageMainView from './SearchCardPageMainView'

import useApi from '#utils/useApi'

const SearchCardPageWrapper = () => {
    const $t = useTranslations('search')

    const { data: CardData } = useApi('Card')
    const { data: SkillAllData } = useApi('Skill/All')

    return (
        <>
            <h2>{$t('Card search')}</h2>
            {!CardData || !SkillAllData ? (
                <Skeleton height={600} />
            ) : (
                <SearchCardPageMainView
                    CardData={CardData}
                    SkillAllData={SkillAllData}
                />
            )}
        </>
    )
}

export default SearchCardPageWrapper
