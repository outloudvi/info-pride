import type { ImageProps } from 'next/image'
import Image from 'next/image'

import Paths from '#utils/paths'
import { PLACEHOLDER_SVG } from '#utils/constants'

/**
 <?xml version="1.0" encoding="UTF-8"?>
 <svg width="40" height="40" version="1.1" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  <rect transform="rotate(45)" x="5" y="-2.5" width="5" height="5" fill="none" stroke="#1428ff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" style="paint-order:stroke fill markers"/>
</svg>
 */

type Props = {
    name: string
    ratio: number | string
    alt: string
    width?: number | string
    height?: number | string
} & Omit<Partial<ImageProps>, 'height' | 'width'>

/**
 * Component for image from assets.
 * @param {number} ratio width / height
 */
const AssetImage = (props: Props) => {
    const { name, ratio, alt, height, width } = props

    return (
        <div
            className="relative"
            style={{
                aspectRatio: String(ratio),
                height,
                width,
            }}
        >
            <Image
                src={Paths.assetsImg(name)}
                loading="lazy"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_SVG}
                fill={true}
                {...props}
                height={undefined}
                width={undefined}
                alt={alt}
                className={`object-fill ${props.className ?? ''}`}
            />
        </div>
    )
}

export default AssetImage
