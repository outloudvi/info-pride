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
    const [isActivated, setActivated] = useState(false)
    /**
     * -2: Error
     * -1: Not clicked/activated
     * 0: Loading
     * 1: Ready
     */
    const [playReady, setPlayReady] = useState(-1)
    const [isPlaying, setIsPlaying] = useState(false)

    const reset = () => {
        const a = aud.current
        if (a) {
            a.currentTime = 0
        }
    }

    const onClick = () => {
        if (playReady === -1) {
            setActivated(true)
            setPlayReady(0)
            return
        }
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

    return (
        <div className="text-white">
            <ActionIcon
                color="yellow"
                variant="outline"
                size="lg"
                onClick={onClick}
                disabled={!playReady}
            >
                {playReady === 0 ? (
                    <FontAwesomeIcon icon={faSpinner} />
                ) : playReady === -2 ? (
                    <FontAwesomeIcon icon={faXmarkCircle} />
                ) : (
                    <FontAwesomeIcon
                        icon={isPlaying ? faPauseCircle : faPlayCircle}
                    />
                )}
            </ActionIcon>
            {isActivated && (
                <audio
                    controls={false}
                    ref={aud}
                    onError={() => {
                        setPlayReady(-2)
                    }}
                    onLoadedData={() => {
                        setPlayReady(1)
                        aud.current?.play()
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
            )}
        </div>
    )
}

export default AssetAudioButton
