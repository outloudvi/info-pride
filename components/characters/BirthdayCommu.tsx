'use client'

import { Button, Grid, Group, NativeSelect, Skeleton } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import useFrontendApi from '#utils/useFrontendApi'
import { toVideoLink } from '#components/ExternalVideo'
import type { BirthdayStoryData } from '#data/videos/birthday.data/types'

const BirthdayCommu = ({ charaId }: { charaId: string }) => {
    const $t = useTranslations('characters')
    const locale = useLocale()

    const { data, isSuccess } = useFrontendApi('birthdayCommu', {
        charaId,
        locale,
    })
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

    // No hooks below

    if (!isSuccess) {
        return <Skeleton height={120} />
    }

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

export default BirthdayCommu
