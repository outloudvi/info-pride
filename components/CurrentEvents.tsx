import Box from '@mui/material/Box'
import dayjs from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
import dayjsTz from 'dayjs/plugin/timezone'
import dayjsIsSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import dayjsIsSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { calendar } from '../utils/dataset'
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

  const today = dayjs().date(10)
  const allEvents = Object.values(calendar).reduce((a, b) => [...a, ...b])
  const activeEvents = allEvents
    .filter(
      (x) =>
        today.isSameOrAfter(x.start, 'day') &&
        today.isSameOrBefore(x.end, 'day')
    )
    .sort((a, b) => Number(dayjs(a.start)) - Number(dayjs(b.start)))

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          当前活动
        </Typography>
        <ul></ul>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
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
      </CardContent>
    </Card>
  )
}

export default CurrentEvents
