import type { CardRarity } from 'hoshimi-types/ProtoMaster'
import { getTranslations } from 'next-intl/server'

import Title from '#components/Title'
import { MAX_LEVEL } from '#utils/constants'
import Paths from '#utils/paths'
import { fetchApi } from '#utils/fetchApi'
import CardsPageMainView from '#components/cards/CardsPageMainView'

// TODO: return a static value?
async function getMaxRarity(): Promise<number> {
    const CardRarity: CardRarity[] = await fetch(Paths.api('CardRarity')).then(
        (x) => x.json(),
    )

    return CardRarity.reduce((a, b) => (a.rarity > b.rarity ? a : b)).rarity
}

const CardsPage = async () => {
    const $t = await getTranslations('cards')

    const maxRarity = await getMaxRarity()
    // TODO: only fetch parts of the cards, reducing payload size
    const CardListData = await fetchApi('Card/List', {
        level: String(MAX_LEVEL),
        rarity: String(maxRarity),
    })

    return (
        <>
            <Title title={$t('Cards')} />
            <p>
                {$t('page_header', {
                    rarity: maxRarity,
                    level: MAX_LEVEL,
                })}
            </p>
            <CardsPageMainView CardListData={CardListData} />
        </>
    )
}

export default CardsPage
