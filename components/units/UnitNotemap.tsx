import type { MusicChart } from 'hoshimi-types/types'
import { Loader } from '@mantine/core'
import { useTranslations } from 'next-intl'

import type { CardTiny } from './types'

import NotemapView from '#components/notemap/NotemapView'
import useFrontendApi from '#utils/useFrontendApi'
import Paths from '#utils/paths'

const cardTinyToAssetUrl = (u: CardTiny | null) => {
    if (!u) return undefined
    return Paths.assetsImg(`img_card_thumb_1_${u.assetId}`)
}

const UnitNotemap = ({
    chart,
    unitCards,
    laneColors,
}: {
    chart: MusicChart
    unitCards: (CardTiny | null)[]
    laneColors: string[]
}) => {
    const $c = useTranslations('common')

    const useSkillRunner = (id: number) => {
        const unitCardSlot = unitCards[id]

        return useFrontendApi('skillRunner', {
            chartId: chart.id,
            track: String(id),
            skillIds: unitCardSlot
                ? [
                      unitCardSlot.skillId1,
                      unitCardSlot.skillId2,
                      unitCardSlot.skillId3,
                  ]
                : [],
        })
    }

    const { data: skillResult1, isSuccess: srState1 } = useSkillRunner(1)
    const { data: skillResult2, isSuccess: srState2 } = useSkillRunner(2)
    const { data: skillResult3, isSuccess: srState3 } = useSkillRunner(3)
    const { data: skillResult4, isSuccess: srState4 } = useSkillRunner(4)
    const { data: skillResult5, isSuccess: srState5 } = useSkillRunner(5)
    const skillRunnerOk =
        srState1 && srState2 && srState3 && srState4 && srState5

    return (
        <div>
            {!skillRunnerOk && (
                <div className="flex justify-center items-center mb-2">
                    <Loader />
                    <span className="ml-2">{$c('loading')}</span>
                </div>
            )}
            <NotemapView
                chart={chart}
                // TODO: changable lane colors
                laneColors={laneColors}
                landingSkillChart={{
                    1: skillResult1 ?? [],
                    2: skillResult2 ?? [],
                    3: skillResult3 ?? [],
                    4: skillResult4 ?? [],
                    5: skillResult5 ?? [],
                }}
                imageChart={{
                    1: cardTinyToAssetUrl(unitCards[1]),
                    2: cardTinyToAssetUrl(unitCards[2]),
                    3: cardTinyToAssetUrl(unitCards[3]),
                    4: cardTinyToAssetUrl(unitCards[4]),
                    5: cardTinyToAssetUrl(unitCards[5]),
                }}
            />
        </div>
    )
}

export default UnitNotemap
