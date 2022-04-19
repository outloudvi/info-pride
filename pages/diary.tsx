import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { DatePicker } from '@mantine/dates'
import dayjs from 'dayjs'

import Layout from '../components/Layout'
import { tryToFirst, updateRoute } from '../rtUtils'
import { Diary } from '../utils/dataset'
import { Button, Grid } from '@mantine/core'

const diaries: { [key: string]: string } = {}
const diaryDates = Diary.map((x) => {
  diaries[x.date] = x.diary
  return x.date
}).sort()

const toShortDate = (date: Date) =>
  `${String(date.getFullYear()).slice(2)}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

const ManaDiary = ({ dateShort }: { dateShort: string }) => {
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

  return <p className="text-gray-600">没有 {dateShort} 的日记。</p>
}

const DiaryPage = () => {
  const router = useRouter()

  const diaryDateShortFirst = diaryDates[0]
  const diaryDateShortLast = diaryDates[diaryDates.length - 1]

  const [currDate, setCurrDate] = useState(new Date('20' + diaryDateShortFirst))

  useEffect(() => {
    if (!router.isReady) return
    const { date: _date } = router.query
    const date = tryToFirst(_date)

    if (date === undefined) return
    if (date.match(/^(\d{2}|\d{4})-\d{2}-\d{2}$/) === null) return

    setCurrDate(new Date('20' + toShortDate(new Date(date))))
  }, [router])

  const switchToDate = (date: Date) => {
    setCurrDate(date)
    updateRoute(`/diary/${toShortDate(date)}`)
  }

  return (
    <Layout>
      <h2>麻奈日记</h2>
      <Grid gutter={20} className="my-3">
        <Grid.Col xs={12} lg={6}>
          <div>
            <p className="text-gray-600">
              如无特殊说明，此处内容的翻译均来自 Bilibili{' '}
              <a href="https://space.bilibili.com/107734456">@长濑琴乃</a> /
              微博 <a href="https://weibo.com/7326542616/">@IDOLYPRIDE</a>。
            </p>
            <p className="text-gray-600">
              目前包含的日记日期：{diaryDateShortFirst} 至 {diaryDateShortLast}
            </p>
            <div>
              <div className="flex-col">
                <DatePicker
                  placeholder="选择日期"
                  label="日期"
                  required
                  className="w-72"
                  value={currDate}
                  minDate={dayjs('20' + diaryDateShortFirst).toDate()}
                  maxDate={dayjs('20' + diaryDateShortLast).toDate()}
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
                  switchToDate(new Date('20' + diaryDateShortLast))
                }}
              >
                转到最新日期
              </Button>
              <Button
                className="mr-2"
                disabled={toShortDate(currDate) === diaryDateShortFirst}
                onClick={() => {
                  const currDay = dayjs(currDate)
                  switchToDate(currDay.subtract(1, 'day').toDate())
                }}
              >
                转到前一天
              </Button>
              <Button
                disabled={toShortDate(currDate) === diaryDateShortLast}
                onClick={() => {
                  const currDay = dayjs(currDate)
                  switchToDate(currDay.add(1, 'day').toDate())
                }}
              >
                转到后一天
              </Button>
            </div>
          </div>
        </Grid.Col>
        <Grid.Col xs={12} lg={6}>
          <ManaDiary dateShort={toShortDate(currDate)} />
        </Grid.Col>
      </Grid>
    </Layout>
  )
}

export default DiaryPage
