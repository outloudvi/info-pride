import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import Title from '#components/Title'
import CardItem from '#components/cards/CardItem'
import { fetchApi } from '#utils/fetchApi'

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
        <>
            <Title title={Card.name} noh2 />
            <CardItem
                card={Card}
                rarityData={RarityData}
                title={$vn(Card.name)}
            />
        </>
    )
}

export default CardInfoPage
