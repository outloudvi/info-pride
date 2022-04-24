import { Button, Group, Stack } from '@mantine/core'
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

  const downloadNotemapSVG = () => {
    if (!svgRef.current) return
    const text = '<svg>' + svgRef.current.innerHTML + '</svg>'
    const blob = new Blob([text], {
      type: 'image/svg',
    })
    downloadBlob(blob, 'notemap.svg')
  }

  return (
    <Stack align="center">
      <svg ref={svgRef} />
      <Group className="mt-2">
        <Button onClick={downloadNotemapSVG}>下载曲谱图片 (SVG)</Button>
        {/* <Button onClick={downloadNotemapPNG}>下载曲谱图片 (PNG)</Button> */}
      </Group>
    </Stack>
  )
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
}

export default NotemapGraph
