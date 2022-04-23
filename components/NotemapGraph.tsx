import { APIMapping } from '@outloudvi/hoshimi-types'
import { UnwrapPromise } from '@outloudvi/hoshimi-types/helpers'
import { useEffect, useRef } from 'react'
import useSWR from 'swr'

import renderNotemap from './renderNotemap'

const NotemapGraph = ({
  chartId,
  laneColors,
}: {
  chartId: string
  laneColors: string[]
}) => {
  const { data } = useSWR<UnwrapPromise<ReturnType<APIMapping['MusicChart']>>>(
    `/MusicChart?chartId=${chartId}`
  )
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (data) {
      renderNotemap(data, svgRef.current, {
        laneColors,
      })
    }
  })

  return <svg ref={svgRef} />
}

export default NotemapGraph
