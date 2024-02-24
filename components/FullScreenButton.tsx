'use client'

import { Button } from '@mantine/core'
import { useTranslations } from 'next-intl'
import type { MutableRefObject } from 'react'
import { useEffect, useState } from 'react'
import screenfull from 'screenfull'

const FullScreenButton = ({
    target,
}: {
    target: MutableRefObject<HTMLElement | null>
}) => {
    const $t = useTranslations('messages')
    const [isFullScreen, setFullScreen] = useState(
        typeof window !== 'undefined' && document.fullscreenElement !== null,
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
        return <Button disabled={true}>{$t('full_screen_unsupported')}</Button>
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
            {isFullScreen ? $t('Exit fullscreen') : $t('Fullscreen')}
        </Button>
    )
}

export default FullScreenButton
