import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

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

const ManaDiary = ({ date }: { date: string }) => {
  const dateShort = toShortDate(date)

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

  const diaryDateFrom = diaryDates[0]
  const diaryDateTo = diaryDates[diaryDates.length - 1]

  const [currDate, setCurrDate] = useState('20' + diaryDateFrom)

  useEffect(() => {
    if (!router.isReady) return
    const { date: _date } = router.query
    const date = tryToFirst(_date)

    if (date === undefined) return
    if (date.match(/^(\d{2}|\d{4})-\d{2}-\d{2}$/) === null) return

    setCurrDate(date)
  }, [router])

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
              目前包含的日记日期：{diaryDateFrom} 至 {diaryDateTo}
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
                  min={'20' + diaryDateFrom}
                  max={'20' + diaryDateTo}
                  onChange={(e) => {
                    const date = e.target.value
                    setCurrDate(date)
                    updateRoute(`/diary/${date.slice(2)}`)
                  }}
                />
              </FormControl>
            </Box>
            <Box className="mt-2">
              <FormControl>
                <button
                  onClick={() => {
                    setCurrDate('20' + diaryDateTo)
                    updateRoute(`/diary/${diaryDateTo}`)
                  }}
                >
                  转到最新日期
                </button>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ManaDiary date={currDate} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default DiaryPage
