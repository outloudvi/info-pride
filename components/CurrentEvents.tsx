import Box from '@mui/material/Box'
import dayjs from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
import dayjsTz from 'dayjs/plugin/timezone'
import dayjsIsSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import dayjsIsSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { Calendar, WikiModulesMeta } from '../utils/dataset'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import ArticleIcon from '@mui/icons-material/Article'
import Paths from '../utils/paths'

dayjs.extend(dayjsUtc)
dayjs.extend(dayjsTz)
dayjs.extend(dayjsIsSameOrAfter)
dayjs.extend(dayjsIsSameOrBefore)

const CurrentEvents = () => {
  dayjs.tz.setDefault('Asia/Tokyo')

  const today = dayjs()
  const allEvents = Object.values(Calendar).reduce((a, b) => [...a, ...b])
  const activeEvents = allEvents
    .filter(
      (x) =>
        today.isSameOrAfter(x.start, 'day') &&
        today.isSameOrBefore(x.end, 'day')
    )
    .sort((a, b) => Number(dayjs(a.start)) - Number(dayjs(b.start)))
  const lastUpdate = dayjs(WikiModulesMeta.updatedAt * 1000)

  const eventList =
    activeEvents.length > 0 ? (
      <List>
        {activeEvents.map((item, key) => (
          <ListItem
            key={key}
            secondaryAction={
              item.link ? (
                <IconButton
                  edge="end"
                  aria-label="wiki 页面"
                  component="a"
                  href={Paths.wiki(item.link)}
                >
                  <ArticleIcon />
                </IconButton>
              ) : null
            }
          >
            <ListItemText
              primary={item.title}
              secondary={`${item.type} / ${item.start} - ${item.end}`}
            />
          </ListItem>
        ))}
      </List>
    ) : (
      <Box className="text-sm text-gray-600 mt-3">
        <span>数据库中没有正在进行的活动。</span>
        <br />
        <span>最后更新于： {lastUpdate.format('YYYY/MM/DD hh:mm')}</span>
      </Box>
    )

  return (
    <Card>
      <CardContent>
        <Typography className="text-gray-600 text-sm" gutterBottom>
          当前活动
        </Typography>
        {eventList}
      </CardContent>
    </Card>
  )
}

export default CurrentEvents
