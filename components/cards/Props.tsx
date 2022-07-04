/* eslint-disable @next/next/no-img-element */
import { Grid, Skeleton } from '@mantine/core'
import type { Card, CardRarity } from 'hoshimi-types/ProtoMaster'

import useApi from '#utils/useApi'
import Paths from '#utils/paths'

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

  const mental = 100
  const critical = 100

  // See also: https://wiki.biligame.com/idolypride/模块:数值计算
  const totalScore =
    Math.floor(calc(vocalRatioPermil) * 0.5) +
    Math.floor(calc(danceRatioPermil) * 0.5) +
    Math.floor(calc(visualRatioPermil) * 0.5) +
    Math.floor(stamina * 0.8) +
    mental * 2 +
    critical * 3

  const cardColorClassName =
    vocalRatioPermil === valueAtMaxType
      ? 'text-vocal'
      : danceRatioPermil === valueAtMaxType
      ? 'text-dance'
      : visualRatioPermil === valueAtMaxType
      ? 'text-visual'
      : ''

  return (
    <Grid className="text-lg">
      <Grid.Col span={6} className="flex justify-center items-center">
        <div className={`${cardColorClassName} text-[1.5em]`}>{totalScore}</div>
      </Grid.Col>
      <Grid.Col span={6}>
        <Grid>
          <Grid.Col span={6}>
            <div className="text-vocal text-center">
              <img
                src={Paths.sprite('x-icon_parameter_vocal')}
                alt="Vocal parameter icon"
                height={25}
                className="mr-2"
              />
              {calc(vocalRatioPermil)}
            </div>
            <div className="text-visual text-center">
              <img
                src={Paths.sprite('x-icon_parameter_visual')}
                alt="Vocal parameter icon"
                height={25}
                className="mr-2"
              />
              {calc(visualRatioPermil)}
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className="text-dance text-center">
              <img
                src={Paths.sprite('x-icon_parameter_dance')}
                alt="Vocal parameter icon"
                height={25}
                className="mr-2"
              />
              {calc(danceRatioPermil)}
            </div>
            <div className="text-stamina text-center">
              <img
                src={Paths.sprite('x-icon_parameter_stamina')}
                alt="Vocal parameter icon"
                height={25}
                className="mr-2"
              />
              {stamina}
            </div>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  )
}

export default Props
