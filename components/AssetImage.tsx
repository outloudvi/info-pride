import { useMemo } from 'react'
import { Image, ImageProps } from '@mantine/core'

import Paths from '#utils/paths'

function parseCSSValue(v: number | string): [number, string | null] {
  if (typeof v === 'number') {
    return [v, null]
  }
  const num = parseFloat(v)
  return [num, v.replace(String(num), '')]
}

function calcHeightWidth(
  height: number | string | undefined,
  width: number | string | undefined,
  ratio: number
): [number | string, number | string] {
  if (!height && width) {
    const [_width, suffix] = parseCSSValue(width)
    const _height = _width * ratio
    return [suffix ? String(_height) + suffix : _height, width]
  }
  if (!width && height) {
    const [_height, suffix] = parseCSSValue(height)
    const _width = _height / ratio
    return [height, suffix ? String(_width) + suffix : _width]
  }
  throw Error('One and only one between the height and width should be given')
}

/**
 * Component for image from assets.
 * @param {number} ratio height / width
 */
const AssetImage = (
  props: {
    name: string
    ratio: number
    alt: string
    width?: number | string
    height?: number | string
  } & ImageProps
) => {
  const { name, ratio, width, height, alt } = props
  const [_height, _width] = useMemo(
    () => calcHeightWidth(height, width, ratio),
    [height, width, ratio]
  )
  return (
    <Image
      {...props}
      src={Paths.assets(name)}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fit={'fill' as any}
      height={_height}
      width={_width}
      withPlaceholder
      alt={alt}
    />
  )
}

export default AssetImage
