import { Button, Group, Stack } from '@mantine/core'
import { useEffect, useRef } from 'react'
import { MusicChart } from 'hoshimi-types/types'

import renderNotemap from './renderNotemap'
import type { ImageChart, SkillChart } from './types'
import { notemapColumnId, unitColumnId } from './const'

const NotemapGraph = ({
  chart,
  laneColors,
  landingSkillChart,
  imageChart,
}: {
  chart: MusicChart
  laneColors: string[]
  landingSkillChart?: SkillChart
  imageChart?: ImageChart
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    renderNotemap(chart, svgRef.current, {
      laneColors,
      landingSkillChart,
      imageChart,
    })
  })

  const downloadNotemapSVG = () => {
    if (!svgRef.current) return
    const text = '<svg>' + svgRef.current.innerHTML + '</svg>'
    const blob = new Blob([text], {
      type: 'image/svg',
    })
    downloadUrl(URL.createObjectURL(blob), 'notemap.svg')
  }

  // https://stackoverflow.com/a/33227005
  const downloadNotemapPNG = () => {
    if (!svgRef.current) return
    const svgElement = svgRef.current
    const svgUrl = new XMLSerializer().serializeToString(svgElement)
    const img = new Image()
    img.addEventListener('load', async () => {
      const canvas = document.createElement('canvas')
      canvas.height = svgElement.clientHeight
      canvas.width = svgElement.clientWidth
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0)
      await Promise.allSettled(
        [1, 2, 3, 4, 5].map((i) => {
          const svgImageElement = document.querySelector(
            `#${notemapColumnId(i)}`
          )
          const leftColumnImageElement = document.querySelector(
            `#${unitColumnId(i)} img`
          )
          if (!svgImageElement) return Promise.resolve()
          return createImageBitmap(
            leftColumnImageElement as HTMLImageElement
          ).then((x) => {
            ctx.drawImage(
              x,
              Number(svgImageElement.getAttribute('x')),
              Number(svgImageElement.getAttribute('y')),
              Number(svgImageElement.getAttribute('width')),
              Number(svgImageElement.getAttribute('height'))
            )
          })
        })
      )
      const pngUrl = canvas.toDataURL()
      downloadUrl(pngUrl, 'notemap.png')
    })
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgUrl)}`
  }

  return (
    <Stack align="center">
      <svg ref={svgRef} />
      <Group className="mt-2">
        <Button onClick={downloadNotemapSVG}>下载曲谱图片 (SVG)</Button>
        <Button onClick={downloadNotemapPNG}>下载曲谱图片 (PNG)</Button>
      </Group>
    </Stack>
  )
}

function downloadUrl(url: string, filename: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
}

export default NotemapGraph
