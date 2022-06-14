import { Skeleton } from '@mantine/core'
import type { Card, CardRarity } from 'hoshimi-types/ProtoMaster'

import useApi from '#utils/useApi'

const Props = ({
  level,
  rarityInfo,
  cardParameterId,
  vocalRatioPermil,
  danceRatioPermil,
  visualRatioPermil,
  staminaRatioPermil,
}: Pick<
  Card,
  | 'cardParameterId'
  | 'vocalRatioPermil'
  | 'danceRatioPermil'
  | 'visualRatioPermil'
  | 'staminaRatioPermil'
> & { level: number; rarityInfo: CardRarity }) => {
  const { data: ParamData } = useApi('CardParameter')

  const parameterInfo = (ParamData ?? []).filter(
    (x) => x.id === cardParameterId && x.level === level
  )?.[0]

  const valueAtMaxType = Math.max(
    vocalRatioPermil,
    danceRatioPermil,
    visualRatioPermil
  )

  if (!parameterInfo) {
    return <Skeleton height={100} />
  }

  const calc = (base: number) =>
    Math.floor(
      (Math.floor((Number(parameterInfo.value) * base) / 1000) *
        rarityInfo.parameterBonusPermil) /
        1000
    )

  const stamina = Math.floor(
    (Math.floor(
      (Number(parameterInfo.staminaValue) * staminaRatioPermil) / 1000
    ) *
      rarityInfo.parameterBonusPermil) /
      1000
  )

  return (
    <div>
      <span className="mr-3 text-vocal">
        {vocalRatioPermil === valueAtMaxType ? (
          <b>{calc(vocalRatioPermil)}</b>
        ) : (
          <span>{calc(vocalRatioPermil)}</span>
        )}
      </span>
      <span className="mr-3 text-dance">
        {danceRatioPermil === valueAtMaxType ? (
          <b>{calc(danceRatioPermil)}</b>
        ) : (
          <span>{calc(danceRatioPermil)}</span>
        )}
      </span>
      <span className="mr-3 text-visual">
        {visualRatioPermil === valueAtMaxType ? (
          <b>{calc(visualRatioPermil)}</b>
        ) : (
          <span>{calc(visualRatioPermil)}</span>
        )}
      </span>
      <span className="mr-3 text-stamina">{stamina}</span>
    </div>
  )
}

export default Props
