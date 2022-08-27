import { Button, Grid, Group, NativeSelect, Skeleton } from '@mantine/core'
import { useEffect, useState } from 'react'

import useFrontendApi from '#utils/useFrontendApi'
import Paths from '#utils/paths'
import { toVideoLink } from '#components/ExternalVideo'
import type { BirthdayStoryData } from '#data/birthday.data'

const CommuTypes: Record<keyof BirthdayStoryData, string> = {
    opening: '开场剧情',
    phone: '电话剧情',
    others: '全员祝福',
}

const BirthdayCommu = ({ charaId }: { charaId: string }) => {
    const { data, isSuccess } = useFrontendApi('birthdayCommu', {
        charaId,
    })
    const [selectedYear, setSelectedYear] = useState('')

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
                暂无生日剧情翻译信息。请添加到翻译信息到{' '}
                <a href={Paths.repo('data/birthday.data.ts')}>
                    data/birthday.data.ts
                </a>{' '}
                的 BirthdayCommu[{charaId}] 。
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
                        label="选择年份"
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
                            }
                        )}
                    </Group>
                }
            </Grid.Col>
        </Grid>
    )
}

export default BirthdayCommu
