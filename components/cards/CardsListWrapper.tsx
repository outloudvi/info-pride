import CardsList from './CardsList'
import fetchCards from './fetchCards.server'
import type { SearchOptions } from './sp'

const CardsListWrapper = async ({
    searchOptions,
}: {
    searchOptions: SearchOptions
}) => {
    const initialCards = await fetchCards(searchOptions)

    return (
        <CardsList initialCards={initialCards} searchOptions={searchOptions} />
    )
}

export default CardsListWrapper
