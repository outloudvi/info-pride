import { MusicChart } from 'hoshimi-types/types'

import { CardTiny } from './types'

import NotemapView from '#components/notemap/NotemapView'
import useFrontendApi from '#utils/useFrontendApi'

const UnitNotemap = ({
  chart,
  unitCards,
}: {
  chart: MusicChart
  unitCards: (CardTiny | null)[]
}) => {
  const useSkillRunner = (id: number) => {
    const unitCardSlot = unitCards[id]

    return useFrontendApi('skillRunner', {
      chartId: chart.id,
      track: String(id),
      skillIds: unitCardSlot
        ? [unitCardSlot.skillId1, unitCardSlot.skillId2, unitCardSlot.skillId3]
        : [],
    })
  }

  const { data: skillResult1 } = useSkillRunner(1)
  const { data: skillResult2 } = useSkillRunner(2)
  const { data: skillResult3 } = useSkillRunner(3)
  const { data: skillResult4 } = useSkillRunner(4)
  const { data: skillResult5 } = useSkillRunner(5)

  return (
    <NotemapView
      chart={chart}
      // TODO: changable lane colors
      laneColors={['blue', 'blue', 'blue', 'blue', 'blue']}
      landingSkillChart={{
        1: skillResult1 ?? [],
        2: skillResult2 ?? [],
        3: skillResult3 ?? [],
        4: skillResult4 ?? [],
        5: skillResult5 ?? [],
      }}
    />
  )
}

export default UnitNotemap
