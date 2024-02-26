'use client'

import { useState } from 'react'
import { Slider, Tooltip } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import type { Card } from 'hoshimi-types/ProtoMaster'

import Props from './Props'

import { MAX_LEVEL, MAX_LEVEL_BEFORE_POTENTIAL } from '#utils/constants'
import type { APIResponseOf } from '#utils/api'

const CardParams = ({
    rarityData,
    cardParameterId,
    cardParameterData,
    initialRarity,
    vocalRatioPermil,
    danceRatioPermil,
    visualRatioPermil,
    staminaRatioPermil,
}: {
    cardParameterId: string
    rarityData: APIResponseOf<'CardRarity'>
    cardParameterData: APIResponseOf<'CardParameter'>
    initialRarity: number
} & Pick<
    Card,
    | 'vocalRatioPermil'
    | 'danceRatioPermil'
    | 'visualRatioPermil'
    | 'staminaRatioPermil'
>) => {
    const $t = useTranslations('cards_slug')

    const maxRarity = Math.max(...rarityData.map((x) => x.rarity))
    const [rarity, setRarity] = useState(maxRarity)
    const rarityInfo = rarityData.filter((x) => x.rarity === rarity)[0]
    const [level, setLevel] = useState(rarityInfo?.levelLimit ?? 1)
    const levelDisplay =
        level <= MAX_LEVEL_BEFORE_POTENTIAL ? (
            <span>{level}</span>
        ) : (
            <span>
                {MAX_LEVEL_BEFORE_POTENTIAL} +{' '}
                {level - MAX_LEVEL_BEFORE_POTENTIAL} = {level}
            </span>
        )

    return (
        <>
            <div className="mt-2">
                {$t('Rarity')} / {rarity}
            </div>
            <Slider
                min={initialRarity}
                max={maxRarity}
                value={rarity}
                onChange={(r) => {
                    setRarity(r)
                }}
                aria-label={$t('Rarity')}
            />
            <div className="mt-2">
                {$t('Level')} / {levelDisplay}
            </div>
            <Slider
                min={1}
                max={MAX_LEVEL}
                value={level}
                onChange={(l) => {
                    setLevel(l)
                }}
                marks={[
                    {
                        value: MAX_LEVEL_BEFORE_POTENTIAL,
                        label: '200',
                    },
                ]}
                aria-label={$t('Level') + '44'}
            />
            <div className="mt-2">
                {$t('Props')}{' '}
                <Tooltip label={$t('props_tooltip')}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                </Tooltip>
            </div>
            <Props
                vocalRatioPermil={vocalRatioPermil}
                danceRatioPermil={danceRatioPermil}
                visualRatioPermil={visualRatioPermil}
                staminaRatioPermil={staminaRatioPermil}
                parameterInfo={
                    cardParameterData.find(
                        (x) => x.id === cardParameterId && x.level === level,
                    )!
                }
                parameterBonusPermil={rarityInfo.parameterBonusPermil}
            />
        </>
    )
}

export default CardParams
