import { useEffect, useRef } from 'react'

import type { MapType } from '../utils/wikiModules/notemap'

import renderNotemap from './renderNotemap'

const NotemapGraph = ({
  notemap,
  laneColors,
}: {
  notemap: MapType
  laneColors: string[]
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    renderNotemap(notemap, svgRef.current, {
      laneColors,
    })
  })

  return <svg ref={svgRef} />
}

export default NotemapGraph
