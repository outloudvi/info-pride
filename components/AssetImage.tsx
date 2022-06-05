import { Image, ImageProps } from '@mantine/core'

import Paths from '#utils/paths'

function calcHeightWidth(
  height: number | undefined,
  width: number | undefined,
  ratio: number
): [number, number] {
  if (!height && width) {
    return [width * ratio, width]
  }
  if (!width && height) {
    return [height, height / ratio]
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
    width?: number
    height?: number
  } & ImageProps
) => {
  const { name, ratio, width, height, alt } = props
  const [_height, _width] = calcHeightWidth(height, width, ratio)
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
