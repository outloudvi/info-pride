import { useRef, useState, useEffect } from 'react'

import Paths from '#utils/paths'

const TelephoneMessage = ({ id }: { id: string }) => {
  const aud = useRef<HTMLAudioElement | null>(null)
  const [playReady, setPlayReady] = useState(0)

  const errorCb = () => {
    setPlayReady(-1)
  }

  useEffect(() => {
    const cb = () => {
      setPlayReady(1)
    }
    if (aud.current === null) return
    const cur = aud.current
    cur.addEventListener('loadeddata', cb)
    return () => {
      cur.removeEventListener('loadeddata', cb)
    }
  }, [aud, setPlayReady])

  return (
    <div className="text-gray-500">
      {playReady === 0 && (
        <div className="mb-1">
          [正在加载电话通信。首次加载可能需要较长时间。]
        </div>
      )}
      {playReady === -1 && (
        <div className="mb-1">[未能加载电话通信 {id} 。]</div>
      )}
      <audio controls={playReady !== 0} ref={aud} onError={errorCb}>
        <source
          src={Paths.assetsSud(`sud_vo_phone_${id}.opus`)}
          type="audio/ogg"
        ></source>
        <source
          src={Paths.assetsSud(`sud_vo_phone_${id}.mp3`)}
          type="audio/mpeg"
        ></source>
      </audio>
    </div>
  )
}

export default TelephoneMessage
