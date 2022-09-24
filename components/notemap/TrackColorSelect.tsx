import { NativeSelect } from '@mantine/core'
import _range from 'lodash/range'
import { Dispatch, SetStateAction } from 'react'
import { useTranslations } from 'next-intl'

import { Colors } from '#data/colors'

const TrackColorSelect = ({
    laneColors,
    setLaneColors,
}: {
    laneColors: string[]
    setLaneColors: Dispatch<SetStateAction<string[]>>
}) => {
    const $t = useTranslations('common')
    return (
        <div className="flex justify-around">
            {_range(0, 5).map((val, key) => {
                const uiNumber = val + 1
                return (
                    <NativeSelect
                        key={key}
                        label={`${$t('Color')} ${uiNumber}`}
                        value={laneColors[val]}
                        data={Object.entries(Colors).map(([label, value]) => ({
                            label,
                            value,
                        }))}
                        onChange={(i) => {
                            setLaneColors([
                                ...laneColors.slice(0, val),
                                i.target.value,
                                ...laneColors.slice(val + 1),
                            ])
                        }}
                    />
                )
            })}
        </div>
    )
}

export default TrackColorSelect
