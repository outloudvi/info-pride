import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert } from '@mantine/core'
import { useState } from 'react'

// TODO: Clean this entry after the flight
const LOCALSTORAGE_TAG = '220803-Notice-Closed'

const NoticeTop = () => {
  const [show, setShow] = useState(
    typeof localStorage !== 'undefined' &&
      localStorage.getItem(LOCALSTORAGE_TAG) === 'true'
      ? false
      : true
  )
  if (show) {
    return (
      <Alert
        icon={<FontAwesomeIcon icon={faInfoCircle} />}
        color="orange"
        title="我们正在更新网站架构 / We're updating the website infrastructure"
        onClose={() => {
          setShow(false)
          localStorage.setItem(LOCALSTORAGE_TAG, 'true')
        }}
        withCloseButton
      >
        我们正在将 API 服务器
        <a href="https://github.com/MalitsPlus/IDOLY-Backend/pull/2">
          从 Cloudflare Workers 迁移到 Deno
        </a>
        。因此，新的 API
        服务可能出现可用性或数据完整性问题。如果怀疑发生了任何问题，欢迎通过{' '}
        <a href="https://github.com/outloudvi/info-pride/issues">Issues</a>{' '}
        或任何其它方式告知我们。
        <br />
        如果希望回到使用旧 API 服务的版本，请访问
        <a href="https://info-pride-git-feat-workers-outloudvi.vercel.app/">
          此站点
        </a>
        。请注意旧 API 服务的数据目前处于停止更新的状态。
        <br />
        此公告在手动关闭后不会再显示。
        <br />
        <details>
          <summary>(English Version)</summary>
          We are shifting our API service{' '}
          <a href="https://github.com/MalitsPlus/IDOLY-Backend/pull/2">
            from Cloudflare Workers to Deno
          </a>
          . Therefore, the new service might suffer from useability or data
          integrity problems. If there are any problems suspected, please
          don&apos;t hesitate to contact us via{' '}
          <a href="https://github.com/outloudvi/info-pride/issues">Issues</a> or
          other channels.
          <br />
          If you wish to use the site with the old API service, please check{' '}
          <a href="https://info-pride-git-feat-workers-outloudvi.vercel.app/">
            here
          </a>
          . Please be noted that updates for the old API service are currently
          paused.
          <br />
          This notice will not be shown again after closing it.
        </details>
      </Alert>
    )
  }
  return <></>
}

export default NoticeTop
