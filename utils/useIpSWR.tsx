import { showNotification } from '@mantine/notifications'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import * as Sentry from '@sentry/browser'
import { APIMapping } from '@outloudvi/hoshimi-types'
import useSWR from 'swr'

import { APIResponseOf } from './api'

function useIpSWR<T extends keyof APIMapping>(
  key: T,
  params: Record<string, any> = {}
) {
  const urlsp = new URLSearchParams()
  Object.entries(params).map(([k, v]) => urlsp.set(k, v))
  const { data, error } = useSWR<APIResponseOf<T>>(
    key + (params.length > 0 ? '?' + urlsp.toString() : '')
  )
  useEffect(() => {
    if (!error) return
    showNotification({
      color: 'red',
      title: `于 ${key} API 获取数据时出错`,
      icon: <FontAwesomeIcon icon={faCircleXmark} />,
      message: String(error),
    })
    console.error(error)
    Sentry.captureException(error)
  })
  return { data }
}

export default useIpSWR
