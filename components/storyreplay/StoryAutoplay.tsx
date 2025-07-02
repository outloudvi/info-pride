import CompBackgroundSetting from './lines/BackgroundSetting'
import CompSe from './lines/Se'
import CompBgm from './lines/Bgm'
import CompMessage from './lines/Message'
import CompVoice from './lines/Voice'
import CompNarration from './lines/Narration'
import CompMWV from './lines/MWV'
import CompXBranch from './lines/XBranch'
import Box from './Box'
import ErrorBoundary from '#utils/errorBoundary'
import type { MergedLine } from './types'
import {
    ForwardedRef,
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import StoryAutoplayControl from './StoryAutoplayControl'

const SECONDS_AFTER_LAST_VOICE = 3

const LineDisplay = forwardRef(
    (
        {
            line,
            backgroundGroup,
            index,
        }: {
            line: MergedLine
            backgroundGroup: Record<string, string>
            index: string
        },
        ref: ForwardedRef<HTMLAudioElement>,
    ) => {
        switch (line._t) {
            case 'BackgroundSetting': {
                const id = backgroundGroup[line.id]
                return (
                    <Box>
                        {id ? (
                            <CompBackgroundSetting id={id} />
                        ) : (
                            <div>Unknown Image</div>
                        )}
                    </Box>
                )
            }

            case 'Bgm':
                return (
                    <Box>
                        <CompBgm l={line} />
                    </Box>
                )
            case 'Se':
                return (
                    <Box>
                        <CompSe l={line} />
                    </Box>
                )
            case 'Narration':
                return (
                    <Box>
                        <CompNarration l={line} />
                    </Box>
                )
            case 'MWV':
                return (
                    <Box>
                        <CompMWV ref={ref} l={line} />
                    </Box>
                )
            case 'XBranch':
                return (
                    <CompXBranch
                        l={line}
                        index={index}
                        backgroundGroup={backgroundGroup}
                    />
                )
            // Fallback
            case 'Message':
                return (
                    <Box>
                        <CompMessage l={line} />
                    </Box>
                )
            case 'Voice':
                return (
                    <Box>
                        <CompVoice ref={ref} l={line} />
                    </Box>
                )
            default:
                return <Box>{line._t}</Box>
        }
    },
)

// TODO: export it from @hoshimei/adv
type MediaCommon = { startTime: number; duration: number }

const StoryAutoplay = ({
    lines,
    backgroundGroup,
}: {
    lines: MergedLine[]
    backgroundGroup: Record<string, string>
}) => {
    const duration =
        (
            lines.filter(
                (x) =>
                    (x as any).startTime !== undefined &&
                    (x as any).duration !== undefined,
            ) as MediaCommon[]
        )
            .map((x: MediaCommon) => x.startTime + x.duration)
            .reduce((a, b) => Math.max(a, b), 0) + SECONDS_AFTER_LAST_VOICE

    const audioRefs = useRef<HTMLAudioElement[]>([])

    useEffect(() => {
        setInterval(() => {
            console.log(audioRefs.current)
        }, 1200)
    }, [])

    const isPlayingRef = useRef(false)
    const [time, setTime] = useState(0)

    const lastTsRef = useRef<number>()
    const render = (ts: DOMHighResTimeStamp) => {
        const lastTs = lastTsRef.current
        if (lastTs !== undefined) {
            setTime((x) => Math.min(duration, x + (ts - lastTs) / 1000))
        }

        if (isPlayingRef.current) {
            lastTsRef.current = ts
            requestAnimationFrame(render)
        }
    }

    const [updateKey, setUpdateKey] = useState(String(Math.random()))
    const rafRef = useRef<number>()
    const forceControlUpdate = () => {
        setUpdateKey(String(Math.random()))
    }
    const startAnimation = () => {
        rafRef.current = requestAnimationFrame(render)
    }
    const stopAnimation = () => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = undefined
        }
        lastTsRef.current = undefined
        forceControlUpdate()
    }

    return (
        <>
            <StoryAutoplayControl
                key={updateKey}
                time={time}
                setTime={setTime}
                isPlaying={isPlayingRef.current}
                setIsPlaying={(x: boolean) => {
                    isPlayingRef.current = x
                    if (x) {
                        startAnimation()
                    } else {
                        stopAnimation()
                    }
                }}
                duration={duration}
            />
            {lines.map((line, key) => (
                <ErrorBoundary key={key}>
                    <LineDisplay
                        // @ts-expect-error
                        ref={(x) => (audioRefs.current[key] = x)}
                        line={line}
                        backgroundGroup={backgroundGroup}
                        index={String(key)}
                    />
                </ErrorBoundary>
            ))}
        </>
    )
}

export default StoryAutoplay
