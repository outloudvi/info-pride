'use client'

import type { SetStateAction } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import Paths from '#utils/paths'

const AssetAudio = ({
    id,
    atom,
    setAtom,
}: {
    id: string
    atom?: string | null
    setAtom?: (update: SetStateAction<string | null>) => void
}) => {
    const aud = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        const cur = aud.current
        if (cur === null || atom === null) return
        if (atom !== id) {
            cur.pause()
        }
    }, [atom, aud, id])

    return (
        <div className="text-gray-500">
            <audio
                controls
                ref={aud}
                preload="metadata"
                onPlay={() => {
                    setAtom?.(id)
                }}
            >
                <source
                    src={Paths.assets(`${id}.opus`)}
                    type="audio/ogg; codecs=opus"
                />
            </audio>
        </div>
    )
}

export default AssetAudio
