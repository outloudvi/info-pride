import { Button, Group, Stack } from '@mantine/core'
import { useEffect, useRef } from 'react'
import type { MusicChart } from 'hoshimi-types/types'
import _range from 'lodash/range'
import { useTranslations } from 'next-intl'

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
    const $t = useTranslations('common')
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
        const originalSvgElement = svgRef.current
        const svgElement = originalSvgElement.cloneNode(true) as SVGSVGElement
        svgElement.removeAttribute('style')
        const [, , viewBoxWidth, viewBoxHeight] =
            svgElement.getAttribute('viewBox')?.split(' ') ?? []
        // override original values with viewBox
        svgElement.setAttribute('width', viewBoxWidth)
        svgElement.setAttribute('height', viewBoxHeight)
        const svgUrl = new XMLSerializer().serializeToString(svgElement)
        console.log(svgElement)
        const img = new Image()
        img.addEventListener('load', async () => {
            const canvas = document.createElement('canvas')
            // use viewBox values unless there aren't
            canvas.height = viewBoxHeight
                ? Number(viewBoxHeight)
                : originalSvgElement.clientHeight
            canvas.width = viewBoxWidth
                ? Number(viewBoxWidth)
                : originalSvgElement.clientWidth
            const ctx = canvas.getContext('2d')
            if (!ctx) return
            ctx.drawImage(img, 0, 0)
            await Promise.allSettled(
                _range(5)
                    .map((x) => x + 1)
                    .map((i) => {
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
        img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
            svgUrl
        )}`
    }

    return (
        <Stack align="center">
            <svg
                ref={svgRef}
                style={{
                    width: 'min(450px, 100%)',
                }}
            />
            <Group className="mt-2">
                <Button onClick={downloadNotemapSVG}>
                    {$t('Export as image')} (SVG)
                </Button>
                <Button onClick={downloadNotemapPNG}>
                    {$t('Export as image')} (PNG)
                </Button>
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
