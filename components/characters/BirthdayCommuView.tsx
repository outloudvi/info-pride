'use client'

import { Button, Grid, Group, NativeSelect } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { toVideoLink } from '#components/ExternalVideo'
import type {
    BirthdayCommuList,
    BirthdayStoryData,
} from '#data/videos/birthday.data/types'

const BirthdayCommuView = ({
    charaId,
    data,
}: {
    charaId: string
    data: BirthdayCommuList
}) => {
    const $t = useTranslations('characters')

    const [selectedYear, setSelectedYear] = useState('')

    const CommuTypes: Record<keyof BirthdayStoryData, string> = {
        opening: $t('bday-opening'),
        phone: $t('bday-phone'),
        others: $t('bday-others'),
    }

    const yearList = Object.keys(data ?? {})

    useEffect(() => {
        if (selectedYear === '' && yearList.length > 0) {
            setSelectedYear(yearList[0])
        }
    }, [selectedYear, yearList])

    if (yearList.length === 0) {
        return (
            <div>
                {$t('no-bday-translation', {
                    charaId,
                })}
            </div>
        )
    }

    const item = data[selectedYear] ?? {}

    return (
        <Grid>
            <Grid.Col span={6}>
                <span>
                    <NativeSelect
                        data={yearList}
                        value={selectedYear}
                        onChange={(event) =>
                            setSelectedYear(event.currentTarget.value)
                        }
                        label={$t('Year')}
                    />
                </span>
            </Grid.Col>
            <Grid.Col>
                {
                    <Group>
                        {Object.entries(CommuTypes).map(
                            ([keyName, keyText], index) => {
                                const video =
                                    item[keyName as keyof BirthdayStoryData]
                                if (!video) return
                                return (
                                    <Button
                                        key={index}
                                        component="a"
                                        href={toVideoLink(video)}
                                        target="_blank"
                                        rel="noopener"
                                        className="mr-2"
                                    >
                                        {keyText}
                                    </Button>
                                )
                            },
                        )}
                    </Group>
                }
            </Grid.Col>
        </Grid>
    )
}

export default BirthdayCommuView
