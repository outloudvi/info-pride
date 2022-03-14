import type { MapType } from '../utils/wikiModules/notemap'
import * as d3 from 'd3'

type Config = {
  height: number
  width: number
  textHeight: number
  startHeight: number
  titleColorEven: string
  titleColor: string
}

function renderNotemap(
  nm: MapType,
  el: SVGSVGElement | null,
  config?: Partial<Config>
): SVGSVGElement {
  const { height, width, textHeight, startHeight, titleColor, titleColorEven } =
    {
      height: 600,
      width: 450,
      textHeight: 30,
      startHeight: 40,
      titleColorEven: '#32323d',
      titleColor: '#484750',
      ...config,
    }
  const widthPerColumn = width / 5

  const notes = [nm['1'], nm['2'], nm['3'], nm['4'], nm['5']]
  const beat = nm.beat

  const svg = d3
    .select(el)
    .attr('width', width)
    .attr(
      'height',
      height + textHeight + startHeight + 0.25 * widthPerColumn + 15
    )
    .attr('font-family', 'sans-serif')

  const noteTypes = notes.map((x) =>
    x.filter((r) => r < 0).length > 0 ? 'SP' : x.length >= 3 ? '多' : '少'
  )

  svg
    .append('g')
    .selectAll('rect')
    .data(d3.range(5))
    .enter()
    .append('rect')
    .attr('x', (_, i) => i * widthPerColumn)
    .attr('y', 0)
    .attr('width', widthPerColumn)
    .attr('height', textHeight)
    .attr('fill', (_, i) => (i % 2 === 0 ? titleColor : titleColorEven))

  svg
    .append('rect')
    .attr('x', 0)
    .attr('y', textHeight)
    .attr('height', startHeight)
    .attr('width', width)
    .attr('fill', titleColor)
  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', textHeight + startHeight / 2)
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('font-size', '1.2rem')
    .style('font-weight', 'bold')
    .text('START')

  svg
    .append('g')
    .selectAll('text')
    .data(noteTypes)
    .enter()
    .append('text')
    .attr('x', (_, i) => (i + 0.5) * widthPerColumn)
    .attr('y', textHeight / 2)
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('font-size', '1.2rem')
    .style('font-weight', 'bold')
    .text((x) => x)

  svg
    .append('g')
    .selectAll('rect')
    .data(d3.range(5))
    .enter()
    .append('rect')
    .attr('x', (_, i) => i * widthPerColumn)
    .attr('y', textHeight + startHeight)
    .attr('width', widthPerColumn)
    .attr('height', height + 0.25 * widthPerColumn)
    .attr('fill', titleColor)

  svg
    .append('g')
    .selectAll('line')
    .data(d3.range(4))
    .enter()
    .append('line')
    .attr('x1', (_, i) => (i + 1) * widthPerColumn)
    .attr('y1', textHeight + startHeight)
    .attr('x2', (_, i) => (i + 1) * widthPerColumn)
    .attr('y2', textHeight + startHeight + height + 0.25 * widthPerColumn)
    .attr('stroke', 'white')

  const columns = svg.append('g').selectAll('g').data(notes).enter().append('g')

  // SP/A circles
  columns
    .append('g')
    .selectAll('circle')
    .data((x, i) => x.map((y) => [y, i]))
    .enter()
    .append('circle')
    .attr('cx', ([, i]) => (i + 0.5) * widthPerColumn)
    .attr(
      'cy',
      ([x]) => (Math.abs(x) / beat) * height + textHeight + startHeight
    )
    .attr('r', ([x]) => (x < 0 ? 0.25 : 0.15) * widthPerColumn)
    .attr('fill', 'blue')

  // Extra styling for SP circles
  columns
    .append('g')
    .selectAll('circle')
    .data((x, i) => x.filter((y) => y < 0).map((y) => [y, i]))
    .enter()
    .append('circle')
    .attr('cx', ([, i]) => (i + 0.5) * widthPerColumn)
    .attr(
      'cy',
      ([x]) => (Math.abs(x) / beat) * height + textHeight + startHeight
    )
    .attr('r', 0.15 * widthPerColumn)
    .attr('fill', 'white')
    .attr('fill-opacity', 0.2)

  columns
    .selectAll('text')
    .data((x, i) => x.map((y) => [y, i]))
    .enter()
    .append('text')
    .attr('x', ([, i]) => (i + 0.5) * widthPerColumn)
    .attr(
      'y',
      ([x]) => (Math.abs(x) / beat) * height + textHeight + startHeight
    )
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-weight', 'bold')
    .text(([x]) => Math.abs(x))

  return svg.node()!
}

export default renderNotemap
