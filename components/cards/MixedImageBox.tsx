import { useEffect, useState } from 'react'
import Image from 'next/image'

import { getAssetSlug } from './cardHelper'

import Paths from '#utils/paths'
import { PLACEHOLDER_SVG } from '#utils/constants'

enum ZoomStatus {
    Left,
    Right,
    None,
}

const MixedImageBox = ({ assetId }: { assetId: string }) => {
    const [hoveredLeft, setHoveredLeft] = useState(false)
    const [hoveredRight, setHoveredRight] = useState(false)

    useEffect(() => {
        if (hoveredLeft) {
            setZoom(ZoomStatus.Left)
        } else if (hoveredRight) {
            setZoom(ZoomStatus.Right)
        } else {
            setZoom(ZoomStatus.None)
        }
    }, [hoveredLeft, hoveredRight])

    const [zoom, setZoom] = useState<ZoomStatus>(ZoomStatus.None)

    return (
        <div
            className="flex"
            style={{
                aspectRatio: '16 / 9',
            }}
        >
            <Image
                alt={'Non-awakened card image'}
                fill={true}
                src={Paths.assetsImg(getAssetSlug(assetId, 'rect', 0))}
                className={`!static object-cover transition-all !h-auto ${
                    zoom === ZoomStatus.Left
                        ? '!w-full'
                        : zoom === ZoomStatus.Right
                          ? '!w-0'
                          : '!w-1/5'
                }`}
                style={{
                    transitionDuration: '0.5s',
                }}
                loading="lazy"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_SVG}
                onMouseEnter={() => setHoveredLeft(true)}
                onMouseLeave={() => setHoveredLeft(false)}
            />
            <Image
                alt={'Awakened card image'}
                fill={true}
                src={Paths.assetsImg(getAssetSlug(assetId, 'rect', 1))}
                className={`!static object-cover transition-all !h-auto ${
                    zoom === ZoomStatus.Right
                        ? '!w-full'
                        : zoom === ZoomStatus.Left
                          ? '!w-0'
                          : '!w-4/5'
                }`}
                style={{
                    transitionDuration: '0.5s',
                }}
                loading="lazy"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_SVG}
                onMouseEnter={() => setHoveredRight(true)}
                onMouseLeave={() => setHoveredRight(false)}
            />
        </div>
    )
}

export default MixedImageBox
