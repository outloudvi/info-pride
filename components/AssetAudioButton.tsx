'use client'

import type { ForwardedRef, SetStateAction } from 'react'
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react'
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

const AssetAudioButton = forwardRef(
    (
        {
            id,
            atom,
            setAtom,
        }: {
            id: string
            atom?: string | null
            setAtom?: (update: SetStateAction<string | null>) => void
        },
        _ref: ForwardedRef<HTMLAudioElement>,
    ) => {
        const $t = useTranslations('common')
        const ref = useRef<HTMLAudioElement | null>(null)
        const [isActivated, setIsActivated] = useState(false)
        const [isReady, setIsReady] = useState(false)
        const [isError, setIsError] = useState(false)
        const [isPlaying, setIsPlaying] = useState(false)

        useImperativeHandle(_ref, () => ref.current!)

        // For central audio playback management
        useEffect(() => {
            const cur = ref.current
            if (cur === null || atom === null) return
            if (atom !== id) {
                cur.pause()
            }
        }, [atom, ref, id])

        useEffect(() => {
            if (isPlaying) {
                ref.current?.pause()
            }
            setIsPlaying(false)
            setIsActivated(false)
            setIsReady(false)
            setIsError(false)
            ref.current?.load()
        }, [id])

        const onClick = () => {
            setIsActivated(true)

            if (isError) {
                // retry
                setIsError(false)
                ref.current?.play()
                return
            }

            if (isPlaying) {
                // pause
                ref.current?.pause()
                // and pause event will reset the time
                return
            }

            // play
            ref.current?.play()
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
                        <FontAwesomeIcon
                            icon={faXmarkCircle}
                            title={$t('Error')}
                        />
                    ) : !isReady ? (
                        <FontAwesomeIcon
                            icon={faSpinner}
                            title={$t('Loading')}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={isPlaying ? faPauseCircle : faPlayCircle}
                            title={isPlaying ? $t('Pause') : $t('Play')}
                        />
                    )}
                </ActionIcon>

                <audio
                    controls={false}
                    ref={ref}
                    preload="none"
                    onError={() => {
                        setIsError(true)
                    }}
                    onLoadedData={() => {
                        setIsReady(true)
                        if (isActivated) {
                            ref?.current?.play()
                        }
                    }}
                    onPlay={() => {
                        setAtom?.(id)
                        setIsPlaying(true)
                    }}
                    onPause={() => {
                        setIsPlaying(false)
                        const a = ref.current
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
            </div>
        )
    },
)

export default AssetAudioButton
