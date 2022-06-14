import * as Sentry from '@sentry/browser'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { showNotification } from '@mantine/notifications'
import { QueryFunction, useQuery } from 'react-query'

import type { Card as WikiCard } from '#data/wikiPages/cards'
import type { Stories } from '#data/types'

const frontendQueryFn: QueryFunction = ({ queryKey: [path] }) =>
  fetch(('/api/' + path) as string).then((x) => x.json())

export type FrontendAPIResponseMapping = {
  cardStories: Stories | undefined
  news: { title: string; link?: string }[]
  version:
    | {
        releaseDate: string
        releaseNotes: string
        releaseTimestamp: string
        versionDisplay: string
      }
    | undefined
  wikiCard: Partial<WikiCard>[] | undefined
}

function useFrontendApi<T extends keyof FrontendAPIResponseMapping>(
  key: T,
  params?: Record<string, string | string[]>
) {
  const urlsp = new URLSearchParams()
  let withParams = false
  Object.entries(params ?? {}).map(([k, v]) => {
    withParams = true
    urlsp.set(k, String(v))
  })
  const rq = useQuery<FrontendAPIResponseMapping[T]>({
    queryKey: key + (withParams ? '?' + urlsp.toString() : ''),
    queryFn: frontendQueryFn as QueryFunction<FrontendAPIResponseMapping[T]>,
    onError: (error) => {
      showNotification({
        color: 'red',
        title: `于 ${key} 前端 API 获取数据时出错`,
        icon: <FontAwesomeIcon icon={faCircleXmark} />,
        message: String(error),
      })
      console.error(error)
      Sentry.captureException(error)
    },
  })

  return rq
}

export default useFrontendApi
