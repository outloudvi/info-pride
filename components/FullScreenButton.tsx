import { Button } from '@mantine/core'
import { MutableRefObject, useEffect, useState } from 'react'
import screenfull from 'screenfull'

const FullScreenButton = ({
  target,
}: {
  target: MutableRefObject<HTMLElement | null>
}) => {
  const [isFullScreen, setFullScreen] = useState(
    typeof window !== 'undefined' && document.fullscreenElement !== null
  )

  useEffect(() => {
    const cb = () => {
      setFullScreen(document.fullscreenElement !== null)
    }
    document.addEventListener('fullscreenchange', cb)

    return () => {
      document.removeEventListener('fullscreenchange', cb)
    }
  }, [])

  if (typeof window === 'undefined' || !screenfull.isEnabled) {
    return <Button disabled={true}>设备不支持全屏模式</Button>
  }

  return (
    <Button
      className="text-center"
      disabled={target.current === null}
      onClick={() => {
        if (isFullScreen) {
          screenfull.exit()
        } else if (target.current) {
          screenfull.request(target.current)
        }
      }}
    >
      {isFullScreen ? '退出全屏' : '全屏'}
    </Button>
  )
}

export default FullScreenButton
