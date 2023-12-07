import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import CardItem from '#components/cards/CardItem'
import { fetchApi } from '#utils/fetchApi'
import { withAsyncMessages } from '#utils/withMessages'

const CardInfoPage = async ({
    params: { slug },
}: {
    params: { slug: string }
}) => {
    const $vn = await getTranslations('v-card-name')

    const cardResults = await fetchApi('Card', {
        id: slug,
    })
    if (cardResults.length === 0) {
        notFound()
    }

    const Card = cardResults[0]
    const RarityData = await fetchApi('CardRarity')

    return (
        <CardItem card={Card} rarityData={RarityData} title={$vn(Card.name)} />
    )
}

export async function generateMetadata({
    params: { slug },
}: {
    params: { slug: string }
}) {
    const cardResults = await fetchApi('Card', {
        id: slug,
    })
    return {
        title: cardResults?.[0]?.name,
    }
}

export default withAsyncMessages(CardInfoPage, [
    'cards_slug',
    'vendor',
    'v-chr',
])
