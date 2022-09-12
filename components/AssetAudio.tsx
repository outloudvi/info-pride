import { useEffect, useRef, useState } from 'react'

import Paths from '#utils/paths'

const AssetAudio = ({ id }: { id: string }) => {
    const aud = useRef<HTMLAudioElement | null>(null)
    const [playReady, setPlayReady] = useState(0)

    const errorCb = () => {
        setPlayReady(-1)
    }

    useEffect(() => {
        const cur = aud.current
        if (cur === null) return
        cur.load()
        setPlayReady(0)
    }, [id])

    useEffect(() => {
        const cb = () => {
            setPlayReady(1)
        }
        const cur = aud.current
        if (cur === null) return
        cur.addEventListener('loadeddata', cb)
        return () => {
            cur.removeEventListener('loadeddata', cb)
        }
    }, [aud, setPlayReady])

    return (
        <div className="text-gray-500">
            {playReady === 0 && (
                <div className="mb-1">
                    [正在加载音频。首次加载可能需要较长时间。]
                </div>
            )}
            {playReady === -1 && (
                <div className="mb-1">[未能加载音频 {id} 。]</div>
            )}
            <audio controls={playReady !== 0} ref={aud} onError={errorCb}>
                <source
                    src={Paths.assets('sud')(`${id}.opus`)}
                    type="audio/ogg; codecs=opus"
                />
                <source
                    src={Paths.assets('sud')(`${id}.mp3`)}
                    type="audio/mpeg"
                />
            </audio>
        </div>
    )
}

export default AssetAudio
