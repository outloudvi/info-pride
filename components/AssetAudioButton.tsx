import { useEffect, useRef, useState } from 'react'
import { ActionIcon } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPauseCircle,
    faPlayCircle,
    faSpinner,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons'

import Paths from '#utils/paths'

const AssetAudioButton = ({ id }: { id: string }) => {
    const aud = useRef<HTMLAudioElement | null>(null)
    const [playReady, setPlayReady] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    const reset = () => {
        const a = aud.current
        if (a) {
            a.currentTime = 0
        }
    }

    const onClick = () => {
        const a = aud.current
        if (!a) return
        if (isPlaying) {
            a.pause()
            // and pause event will reset the time
            return
        }
        if (playReady === 1) {
            a.play()
        }
    }

    useEffect(() => {
        const cur = aud.current
        if (cur === null) return
        cur.load()
        setPlayReady(0)
    }, [id])

    useEffect(() => {
        const loadedCb = () => {
            setPlayReady(1)
        }
        const cur = aud.current
        if (cur === null) return
        cur.addEventListener('loadeddata', loadedCb)
        return () => {
            cur.removeEventListener('loadeddata', loadedCb)
        }
    }, [aud, setPlayReady])

    return (
        <div className="text-white">
            <ActionIcon
                color="yellow"
                variant="outline"
                size="lg"
                onClick={onClick}
                disabled={!playReady}
            >
                {playReady === 0 && <FontAwesomeIcon icon={faSpinner} />}
                {playReady === -1 && <FontAwesomeIcon icon={faXmarkCircle} />}
                {playReady === 1 && (
                    <FontAwesomeIcon
                        icon={isPlaying ? faPauseCircle : faPlayCircle}
                    />
                )}
            </ActionIcon>
            <audio
                controls={false}
                ref={aud}
                onError={() => {
                    setPlayReady(-1)
                }}
                onPlay={() => {
                    setIsPlaying(true)
                }}
                onPause={() => {
                    setIsPlaying(false)
                    reset()
                }}
                onEnded={() => {
                    setIsPlaying(false)
                    reset()
                }}
            >
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

export default AssetAudioButton
