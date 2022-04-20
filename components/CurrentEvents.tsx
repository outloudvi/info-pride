import { ActionIcon, Group, Stack } from '@mantine/core'
import dayjs from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
import dayjsTz from 'dayjs/plugin/timezone'
import dayjsIsSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import dayjsIsSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import Paths from '../utils/paths'

import { Calendar, WikiModulesMeta } from '../utils/dataset'

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
      <Stack>
        {activeEvents.map((item, key) => (
          <Group key={key} align="center">
            {item.link && (
              <a title="活动详细信息" href={Paths.wiki(item.link)}>
                <ActionIcon color="blue" size="xl" variant="hover">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </ActionIcon>
              </a>
            )}
            <div className="grow">
              <span>{item.title}</span> <br />
              <span className="text-sm text-gray-500">
                {item.type} / {item.start} - {item.end}
              </span>
            </div>
          </Group>
        ))}
      </Stack>
    ) : (
      <div className="text-sm text-gray-600 mt-3">
        <span>数据库中没有正在进行的活动。</span>
        <br />
        <span>最后更新于： {lastUpdate.format('YYYY/MM/DD hh:mm')}</span>
      </div>
    )

  return (
    <>
      <div className="text-gray-600 text-lg mb-3">当前活动</div>
      {eventList}
    </>
  )
}

export default CurrentEvents
