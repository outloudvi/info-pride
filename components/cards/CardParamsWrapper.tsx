import CardParams from './CardParams'

import { fetchApi } from '#utils/fetchApi'
import type { APIResponseOf, UnArray } from '#utils/api'

const CardParamsWrapper = async ({
    card,
}: {
    card: UnArray<APIResponseOf<'Card'>>
}) => {
    const rarityData = await fetchApi('CardRarity')
    const cardParameterData = await fetchApi('CardParameter')

    const {
        initialRarity,
        vocalRatioPermil,
        danceRatioPermil,
        visualRatioPermil,
        staminaRatioPermil,
        cardParameterId,
    } = card

    return (
        <CardParams
            cardParameterId={cardParameterId}
            rarityData={rarityData}
            cardParameterData={cardParameterData}
            initialRarity={initialRarity}
            vocalRatioPermil={vocalRatioPermil}
            danceRatioPermil={danceRatioPermil}
            visualRatioPermil={visualRatioPermil}
            staminaRatioPermil={staminaRatioPermil}
        />
    )
}

export default CardParamsWrapper
