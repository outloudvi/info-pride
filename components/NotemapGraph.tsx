import { useEffect, useRef } from 'react'
import type { MapType } from '../utils/wikiModules/notemap'
import renderNotemap from './renderNotemap'

const NotemapGraph = ({ notemap }: { notemap: MapType }) => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    renderNotemap(notemap, svgRef.current)
  })

  return <svg ref={svgRef} />
}

export default NotemapGraph
