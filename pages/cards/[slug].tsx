import { useRouter } from 'next/router'
import { Skeleton } from '@mantine/core'
import { useTranslations } from 'next-intl'
import type { GetServerSideProps } from 'next'

import PageLoading from '#components/PageLoading'
import Title from '#components/Title'
import { addI18nMessages, getI18nMessages } from '#utils/getI18nProps'
import useApi from '#utils/useApi'
import allFinished from '#utils/allFinished'
import type { APIResponseOf } from '#utils/api'
import pickFirstOrOne from '#utils/pickFirstOrOne'
import CardItem from '#components/cards/CardItem'
import Paths from '#utils/paths'
import { fetchApi } from '#utils/fetchApi'
import { DEFAULT_LANGUAGE } from '#utils/constants'

type Props = {
    title: string
}

const CardInfoPage = ({
    CardData,
    RarityData,
    title,
}: {
    CardData: APIResponseOf<'Card'>
    RarityData: APIResponseOf<'CardRarity'>
    title: string
}) => {
    const Card = CardData[0]

    return (
        <>
            <Title title={Card.name} noh2 />
            <CardItem card={Card} rarityData={RarityData} title={title} />
        </>
    )
}

const SkeletonCardInfoPage = ({ title }: Props) => {
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
        title,
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

const PreloadedCardInfoPage = ({ title }: Props) => {
    const router = useRouter()

    return router.isReady ? (
        <SkeletonCardInfoPage title={title} />
    ) : (
        <Skeleton height={300} />
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
    query,
    locale: _locale,
}) => {
    const { slug } = query
    const locale = _locale ?? DEFAULT_LANGUAGE
    const CardData = await fetchApi('Card', {
        id: String(slug),
    }).then((x) => x[0])

    return {
        props: {
            ...(await addI18nMessages(locale, [
                'cards_slug',
                'analyze',
                'vendor',
                'v-chr',
            ])),
            title:
                (await getI18nMessages(locale, 'v-card-name', CardData.name)) ??
                null,
        },
    }
}

export default PreloadedCardInfoPage
