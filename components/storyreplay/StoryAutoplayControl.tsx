import type { Dispatch, SetStateAction } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Slider } from '@mantine/core'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons'
import { useTranslations } from 'next-intl'

function toMMSS(time: number): string {
    return `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(Math.floor(time % 60)).padStart(2, '0')}`
}

const StoryAutoplayControl = ({
    time,
    setTime,
    isPlaying,
    setIsPlaying,
    duration,
}: {
    time: number
    setTime: Dispatch<SetStateAction<number>>
    isPlaying: boolean
    setIsPlaying: (x: boolean) => void
    duration: number
}) => {
    const $t = useTranslations('common')

    return (
        <div>
            <ActionIcon
                onClick={() => {
                    setIsPlaying(!isPlaying)
                }}
            >
                <FontAwesomeIcon
                    icon={isPlaying ? faPauseCircle : faPlayCircle}
                    title={isPlaying ? $t('Pause') : $t('Play')}
                />
            </ActionIcon>
            {toMMSS(time)}
            <Slider
                color="blue"
                value={time}
                onChange={setTime}
                label={(x) => <span>{toMMSS(x)}</span>}
                min={0}
                max={duration}
            />
        </div>
    )
}

export default StoryAutoplayControl
