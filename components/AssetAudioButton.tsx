'use client'

import type { SetStateAction } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ActionIcon } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPauseCircle,
    faPlayCircle,
    faSpinner,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons'
import { useTranslations } from 'next-intl'

import Paths from '#utils/paths'
import { setMaxIdleHTTPParsers } from 'http'

const AssetAudioButton = ({
    id,
    atom,
    setAtom,
}: {
    id: string
    atom?: string | null
    setAtom?: (update: SetStateAction<string | null>) => void
}) => {
    const $t = useTranslations('common')
    const aud = useRef<HTMLAudioElement | null>(null)
    const [isActivated, setIsActivated] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)

    // For central audio playback management
    useEffect(() => {
        const cur = aud.current
        if (cur === null || atom === null) return
        if (atom !== id) {
            cur.pause()
        }
    }, [atom, aud, id])

    useEffect(() => {
        if (isPlaying) {
            aud.current?.pause()
        }
        setIsPlaying(false)
        setIsActivated(false)
        setIsReady(false)
        setIsError(false)
        aud.current?.load()
    }, [id])

    const onClick = () => {
        setIsActivated(true)

        if (isError) {
            // retry
            setIsError(false)
            aud.current?.play()
            return
        }

        if (isPlaying) {
            // pause
            aud.current?.pause()
            // and pause event will reset the time
            return
        }

        // play
        aud.current?.play()
    }

    return (
        <div className="text-white">
            <ActionIcon
                color="yellow"
                variant="outline"
                size="lg"
                onClick={onClick}
                tabIndex={0}
            >
                {!isActivated ? (
                    <FontAwesomeIcon
                        icon={isPlaying ? faPauseCircle : faPlayCircle}
                        title={isPlaying ? $t('Pause') : $t('Play')}
                    />
                ) : isError ? (
                    <FontAwesomeIcon icon={faXmarkCircle} title={$t('Error')} />
                ) : !isReady ? (
                    <FontAwesomeIcon icon={faSpinner} title={$t('Loading')} />
                ) : (
                    <FontAwesomeIcon
                        icon={isPlaying ? faPauseCircle : faPlayCircle}
                        title={isPlaying ? $t('Pause') : $t('Play')}
                    />
                )}
            </ActionIcon>
            {isActivated && (
                <audio
                    controls={false}
                    ref={aud}
                    preload="metadata"
                    onError={() => {
                        setIsError(true)
                    }}
                    onLoadedData={() => {
                        setIsReady(true)
                        if (isActivated) {
                            aud?.current?.play()
                        }
                    }}
                    onPlay={() => {
                        setAtom?.(id)
                        setIsPlaying(true)
                    }}
                    onPause={() => {
                        setIsPlaying(false)
                        const a = aud.current
                        if (a) {
                            a.currentTime = 0
                        }
                    }}
                    onEnded={() => {
                        setIsPlaying(false)
                    }}
                >
                    <source
                        src={Paths.assets(`${id}.opus`)}
                        type="audio/ogg; codecs=opus"
                    />
                </audio>
            )}
        </div>
    )
}

export default AssetAudioButton
