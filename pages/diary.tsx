import { DatePicker } from '@mantine/dates'
import { Button, Grid } from '@mantine/core'
import dayjs from 'dayjs'
import { atomWithHash } from 'jotai/utils'
import { useAtom } from 'jotai'
import { useLayoutEffect } from 'react'

import Title from '#components/Title'
import AssetImage from '#components/AssetImage'
import useFrontendApi from '#utils/useFrontendApi'
import {
    fromShortDate,
    getDiaryRangePair,
    toShortDate,
} from '#components/api/diary'

const ManaDiaryTranslated = ({ date }: { date: string }) => {
    const { data, isSuccess } = useFrontendApi('diary', {
        date,
    })

    if (!isSuccess) {
        return <p>正在加载中。</p>
    }

    if (data) {
        return (
            <>
                <p>{data.date}</p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: data.diary,
                    }}
                ></p>
            </>
        )
    }

    return (
        <p className="text-gray-600 dark:text-gray-300">没有 {date} 的日记。</p>
    )
}

const shortDateAtom = atomWithHash('date', new Date(0), {
    serialize: toShortDate,
    deserialize: fromShortDate,
})

const DiaryPage = ({ first, last }: { first: string; last: string }) => {
    const [currDate, setCurrDate] = useAtom(shortDateAtom)

    useLayoutEffect(() => {
        setCurrDate(fromShortDate(last))
    }, [last, setCurrDate])

    return (
        <>
            <Title title="麻奈日记" />
            <Grid gutter={20} className="my-3">
                <Grid.Col xs={12} lg={4}>
                    <div>
                        <p>
                            如无特殊说明，此处内容的翻译均来自 Bilibili{' '}
                            <a href="https://space.bilibili.com/107734456">
                                @长濑琴乃
                            </a>{' '}
                            / 微博{' '}
                            <a href="https://weibo.com/7326542616/">
                                @IDOLYPRIDE
                            </a>
                            。
                        </p>
                        <p>
                            目前包含的日记日期：{first} 至 {last}
                        </p>
                        <div>
                            <div className="flex-col">
                                <DatePicker
                                    placeholder="选择日期"
                                    label="日期"
                                    required
                                    className="w-72"
                                    value={currDate}
                                    minDate={dayjs('20' + first).toDate()}
                                    maxDate={dayjs('20' + last).toDate()}
                                    onChange={(e) => {
                                        if (e) setCurrDate(e)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <Button
                                className="mr-2"
                                onClick={() => {
                                    setCurrDate(new Date('20' + last))
                                }}
                            >
                                转到最新日期
                            </Button>
                            <Button
                                className="mr-2"
                                disabled={toShortDate(currDate) === first}
                                onClick={() => {
                                    const currDay = dayjs(currDate)
                                    setCurrDate(
                                        currDay.subtract(1, 'day').toDate()
                                    )
                                }}
                            >
                                转到前一天
                            </Button>
                            <Button
                                disabled={toShortDate(currDate) === last}
                                onClick={() => {
                                    const currDay = dayjs(currDate)
                                    setCurrDate(currDay.add(1, 'day').toDate())
                                }}
                            >
                                转到后一天
                            </Button>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col xs={12} lg={4}>
                    <AssetImage
                        name={`img_ui_diary_${toShortDate(currDate)}`}
                        ratio={0.7}
                        width="100%"
                        alt="Diary image"
                    />
                </Grid.Col>
                <Grid.Col xs={12} lg={4}>
                    <ManaDiaryTranslated date={toShortDate(currDate)} />
                </Grid.Col>
            </Grid>
        </>
    )
}

export function getStaticProps() {
    const { first, last } = getDiaryRangePair()
    return {
        props: {
            first,
            last,
        },
    }
}

export default DiaryPage
