import { useRouter } from 'next/router'
import { Skeleton } from '@mantine/core'
import { useTranslations } from 'next-intl'

import PageLoading from '#components/PageLoading'
import Title from '#components/Title'
import getI18nProps from '#utils/getI18nProps'
import useApi from '#utils/useApi'
import allFinished from '#utils/allFinished'
import { APIResponseOf } from '#utils/api'
import pickFirstOrOne from '#utils/pickFirstOrOne'
import CardItem from '#components/cards/CardItem'

const CardInfoPage = ({
    CardData,
    RarityData,
}: {
    CardData: APIResponseOf<'Card'>
    RarityData: APIResponseOf<'CardRarity'>
}) => {
    const Card = CardData[0]

    return (
        <>
            <Title title={Card.name} noh2 />
            <CardItem card={Card} rarityData={RarityData} />
        </>
    )
}

const SkeletonCardInfoPage = () => {
    const $t = useTranslations('cards_slug')

    const router = useRouter()
    const slug = pickFirstOrOne(router.query.slug ?? '')
    const { data: CardData } = useApi('Card', {
        id: slug,
    })
    const { data: RarityData } = useApi('CardRarity')

    const allData = {
        CardData,
        RarityData,
    }

    return (
        <>
            <h2>{$t('Cards')}</h2>
            {allFinished(allData) ? (
                <CardInfoPage {...allData} />
            ) : (
                <PageLoading data={allData} />
            )}
        </>
    )
}

const PreloadedCardInfoPage = () => {
    const router = useRouter()

    return router.isReady ? <SkeletonCardInfoPage /> : <Skeleton height={300} />
}

export const getServerSideProps = getI18nProps([
    'cards_slug',
    'analyze',
    'vendor',
    'v-chr',
    'v-card-name',
])

export default PreloadedCardInfoPage
