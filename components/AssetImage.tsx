import type { ImageProps } from 'next/image';
import Image from 'next/image'

import Paths from '#utils/paths'

/**
 <?xml version="1.0" encoding="UTF-8"?>
 <svg width="40" height="40" version="1.1" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  <rect transform="rotate(45)" x="5" y="-2.5" width="5" height="5" fill="none" stroke="#1428ff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6" style="paint-order:stroke fill markers"/>
</svg>
 */
// TODO: placeholder doesn't work
const PLACEHOLDER_SVG =
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTAgMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgdHJhbnNmb3JtPSJyb3RhdGUoNDUpIiB4PSI1IiB5PSItMi41IiB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSJub25lIiBzdHJva2U9IiMxNDI4ZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIuNiIgc3R5bGU9InBhaW50LW9yZGVyOnN0cm9rZSBmaWxsIG1hcmtlcnMiLz48L3N2Zz4K'

/**
 * Component for image from assets.
 * @param {number} ratio width / height
 */
const AssetImage = (
    props: {
        name: string
        ratio: number | string
        alt: string
    } & Partial<ImageProps>
) => {
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
                src={Paths.assets(name.split('_')[0])(name)}
                layout="fill"
                objectFit="fill"
                loading="lazy"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_SVG}
                {...props}
                alt={alt}
            />
        </div>
    )
}

export default AssetImage
