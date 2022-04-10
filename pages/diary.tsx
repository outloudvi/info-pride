import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import { Diary } from '../utils/dataset'
import Box from '@mui/material/Box'

import Layout from '../components/Layout'
import { tryToFirst, updateRoute } from '../rtUtils'

const diaries: { [key: string]: string } = {}
const diaryDates = Diary.map((x) => {
  diaries[x.date] = x.diary
  return x.date
}).sort()

const toShortDate = (date: string) =>
  date.split('-')[0].length === 2 ? date : date.slice(2)

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

  // Should be a long date since it is sent to <input:date>
  const [currDate, setCurrDate] = useState('20' + diaryDateShortFirst)

  useEffect(() => {
    if (!router.isReady) return
    const { date: _date } = router.query
    const date = tryToFirst(_date)

    if (date === undefined) return
    if (date.match(/^(\d{2}|\d{4})-\d{2}-\d{2}$/) === null) return

    setCurrDate('20' + toShortDate(date))
  }, [router])

  const switchToDate = (date: string) => {
    const dateShort = toShortDate(date)
    setCurrDate('20' + dateShort)
    updateRoute(`/diary/${dateShort}`)
  }

  return (
    <Layout>
      <Typography variant="h2">麻奈日记</Typography>
      <Grid container spacing={2} className="my-3">
        <Grid item xs={12} lg={6}>
          <Box>
            <p className="text-gray-600">
              如无特殊说明，此处内容的翻译均来自 Bilibili{' '}
              <a href="https://space.bilibili.com/107734456">@长濑琴乃</a> /
              微博 <a href="https://weibo.com/7326542616/">@IDOLYPRIDE</a>。
            </p>
            <p className="text-gray-600">
              目前包含的日记日期：{diaryDateShortFirst} 至 {diaryDateShortLast}
            </p>
            <Box>
              <FormControl className="flex-col">
                <label htmlFor="iDate" className="text-gray-500 text-sm">
                  日期
                </label>
                <input
                  id="iDate"
                  type="date"
                  value={currDate}
                  min={'20' + diaryDateShortFirst}
                  max={'20' + diaryDateShortLast}
                  onChange={(e) => {
                    if (e.target.value === '') return
                    switchToDate(e.target.value)
                  }}
                />
              </FormControl>
            </Box>
            <Box className="mt-2">
              <button
                className="mr-2"
                onClick={() => {
                  switchToDate(diaryDateShortLast)
                }}
              >
                转到最新日期
              </button>
              <button
                className="mr-2"
                disabled={currDate === '20' + diaryDateShortFirst}
                onClick={() => {
                  const currDay = dayjs(currDate)
                  switchToDate(currDay.subtract(1, 'day').format('YY-MM-DD'))
                }}
              >
                转到前一天
              </button>
              <button
                disabled={currDate === '20' + diaryDateShortLast}
                onClick={() => {
                  const currDay = dayjs(currDate)
                  switchToDate(currDay.add(1, 'day').format('YY-MM-DD'))
                }}
              >
                转到后一天
              </button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ManaDiary dateShort={toShortDate(currDate)} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default DiaryPage
