/* eslint-disable @next/next/no-img-element */
import { Grid, Skeleton } from '@mantine/core'
import type { Card, CardRarity } from 'hoshimi-types/ProtoMaster'

import useApi from '#utils/useApi'
import getCardColor from '#utils/getCardColor'
import Paths from '#utils/paths'
import getCardColorClassName from '#utils/getCardColorClassName'
import calcPropValue from '#utils/calcPropValue'

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

    if (!parameterInfo) {
        return <Skeleton height={100} />
    }

    const calc = (base: number) =>
        calcPropValue(
            base,
            Number(parameterInfo.value),
            rarityInfo.parameterBonusPermil
        )

    const stamina = calcPropValue(
        staminaRatioPermil,
        Number(parameterInfo.staminaValue),
        rarityInfo.parameterBonusPermil
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

    const cardColorClassName = getCardColorClassName(
        getCardColor({ vocalRatioPermil, danceRatioPermil, visualRatioPermil })
    )

    return (
        <Grid className="text-lg" grow>
            <Grid.Col span={3} className="flex justify-center items-center">
                <div className={`${cardColorClassName} text-[1.5em]`}>
                    {totalScore}
                </div>
            </Grid.Col>
            <Grid.Col span="content">
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
