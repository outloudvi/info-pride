import type { CardRarity } from 'hoshimi-types/ProtoMaster'
import { getTranslations } from 'next-intl/server'

import { MAX_LEVEL } from '#utils/constants'
import Paths from '#utils/paths'
import { fetchApi } from '#utils/fetchApi'
import CardsPageMainView from '#components/cards/CardsPageMainView'
import { withAsyncMessages } from '#utils/withMessages'

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
            <h2>{$t('Cards')}</h2>
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

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'cards' })
    return {
        title: $t('Cards'),
    }
}

export default withAsyncMessages(CardsPage, [
    'cards',
    'vendor',
    'v-chr',
    'v-card-name',
])
