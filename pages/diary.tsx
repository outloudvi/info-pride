import { DatePicker } from '@mantine/dates'
import { Button, Grid } from '@mantine/core'
import dayjs from 'dayjs'
import { atomWithHash } from 'jotai/utils'
import { useAtom } from 'jotai'

import { Diary } from '#data/wikiModules'
import Title from '#components/Title'
import AssetImage from '#components/AssetImage'

const diaries: { [key: string]: string } = {}
const diaryDates = Diary.map((x) => {
    diaries[x.date] = x.diary
    return x.date
}).sort()

const toShortDate = (date: Date) =>
    `${String(date.getFullYear()).slice(2)}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

const fromShortDate = (s: string | null) =>
    s === null ? new Date(0) : new Date('20' + s)

const ManaDiaryTranslated = ({ dateShort }: { dateShort: string }) => {
    if (diaries[dateShort]) {
        return (
            <>
                <p>{dateShort}</p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: diaries[dateShort],
                    }}
                ></p>
            </>
        )
    }

    return (
        <p className="text-gray-600 dark:text-gray-300">
            没有 {dateShort} 的日记。
        </p>
    )
}

const diaryDateShortFirst = diaryDates[0]
const diaryDateShortLast = diaryDates[diaryDates.length - 1]
const shortDateAtom = atomWithHash('date', fromShortDate(diaryDateShortLast), {
    serialize: toShortDate,
    deserialize: fromShortDate,
})

const DiaryPage = () => {
    const [currDate, setCurrDate] = useAtom(shortDateAtom)

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
                            目前包含的日记日期：{diaryDateShortFirst} 至{' '}
                            {diaryDateShortLast}
                        </p>
                        <div>
                            <div className="flex-col">
                                <DatePicker
                                    placeholder="选择日期"
                                    label="日期"
                                    required
                                    className="w-72"
                                    value={currDate}
                                    minDate={dayjs(
                                        '20' + diaryDateShortFirst
                                    ).toDate()}
                                    maxDate={dayjs(
                                        '20' + diaryDateShortLast
                                    ).toDate()}
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
                                    setCurrDate(
                                        new Date('20' + diaryDateShortLast)
                                    )
                                }}
                            >
                                转到最新日期
                            </Button>
                            <Button
                                className="mr-2"
                                disabled={
                                    toShortDate(currDate) ===
                                    diaryDateShortFirst
                                }
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
                                disabled={
                                    toShortDate(currDate) === diaryDateShortLast
                                }
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
                    <ManaDiaryTranslated dateShort={toShortDate(currDate)} />
                </Grid.Col>
            </Grid>
        </>
    )
}

export default DiaryPage
