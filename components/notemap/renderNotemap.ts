/* eslint-disable @typescript-eslint/no-unused-vars */
import * as d3 from 'd3'
import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'
import type { MusicChart } from 'hoshimi-types/types'

import type { ImageChart, SkillChart } from './types'

type Config = {
  height: number
  width: number
  textHeight: number
  startHeight: number
  skillLineOffset: number
  titleColorEven: string
  titleColor: string
  laneColors: string[]
  imageChart?: ImageChart
  landingSkillChart?: SkillChart
}

type D3LandingSkill = [
  string, // name
  number, // start beat
  number, // end beat
  boolean // success?
]

type D3LandingSkills = D3LandingSkill[][]

function processImages(imageChart: ImageChart): (string | undefined)[] {
  return [
    imageChart[4],
    imageChart[2],
    imageChart[1],
    imageChart[3],
    imageChart[5],
  ]
}

function processSkills(landingSkillChart: SkillChart): D3LandingSkills {
  return [
    landingSkillChart[4],
    landingSkillChart[2],
    landingSkillChart[1],
    landingSkillChart[3],
    landingSkillChart[5],
  ].map((r) =>
    r.map(({ type, success, start, end }) => [
      SkillCategoryType[type],
      start,
      end ?? start,
      success,
    ])
  )
}

function renderNotemap(
  nm: MusicChart,
  el: SVGSVGElement | null,
  config?: Partial<Config>
): SVGSVGElement {
  const {
    height,
    width,
    textHeight,
    startHeight,
    iconHeight,
    iconHeightMargin,
    skillLineOffset,
    titleColor,
    titleColorEven,
    laneColors,
    imageChart,
    landingSkillChart,
  } = {
    height: 600,
    width: 450,
    textHeight: 30,
    startHeight: 40,
    iconHeight: 80,
    iconHeightMargin: 5, // margin*2+height=width/5
    skillLineOffset: 35,
    titleColorEven: '#32323d',
    titleColor: '#484750',
    laneColors: ['blue', 'blue', 'blue', 'blue', 'blue'],
    ...config,
  }
  const widthPerColumn = width / 5

  const notes = [
    nm.chart[4],
    nm.chart[2],
    nm.chart[1],
    nm.chart[3],
    nm.chart[5],
  ]
  const skills = landingSkillChart && processSkills(landingSkillChart)
  const images = imageChart ? processImages(imageChart) : []
  const beat = nm.beats

  const ifRenderImages = imageChart !== undefined
  const baseHeight = ifRenderImages ? iconHeight + 2 * iconHeightMargin : 0

  const svg = d3
    .select(el)
    .attr('width', width)
    .attr(
      'height',
      height +
        baseHeight +
        textHeight +
        startHeight +
        0.25 * widthPerColumn +
        15
    )
    .attr('font-family', 'sans-serif')

  const svgPartsForImage = svg.append('g')

  if (ifRenderImages) {
    svgPartsForImage
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', baseHeight)
      .attr('fill', titleColor)

    svgPartsForImage
      .selectAll('image')
      .data(
        images.map((x, i) => [x, i]).filter((x) => x[0]) as [string, number][]
      )
      .enter()
      .append('image')
      .attr('x', ([url, i]) => i * widthPerColumn + iconHeightMargin)
      .attr('y', 0 + iconHeightMargin)
      .attr('height', iconHeight)
      .attr('width', iconHeight)
      .attr('href', ([url, i]) => url)
  }

  const noteTypes = notes.map((x) =>
    x.filter((r) => r < 0).length > 0 ? 'SP' : x.length >= 3 ? '多' : '少'
  )

  const skillLineStrokeWidth = 10

  // Background part 1
  svg
    .append('g')
    .selectAll('rect')
    .data(d3.range(5))
    .enter()
    .append('rect')
    .attr('x', (_, i) => i * widthPerColumn)
    .attr('y', baseHeight)
    .attr('width', widthPerColumn)
    .attr('height', textHeight)
    .attr('fill', (_, i) => (i % 2 === 0 ? titleColor : titleColorEven))

  // Background part 2
  svg
    .append('rect')
    .attr('x', 0)
    .attr('y', baseHeight + textHeight)
    .attr('height', startHeight)
    .attr('width', width)
    .attr('fill', titleColor)

  // Text "START"
  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', baseHeight + textHeight + startHeight / 2)
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('font-size', '1.2rem')
    .style('font-weight', 'bold')
    .text('START')

  // Text: Lane note amount
  svg
    .append('g')
    .selectAll('text')
    .data(noteTypes)
    .enter()
    .append('text')
    .attr('x', (_, i) => (i + 0.5) * widthPerColumn)
    .attr('y', baseHeight + textHeight / 2)
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('font-size', '1.2rem')
    .style('font-weight', 'bold')
    .text((x) => x)

  // Background part 3
  svg
    .append('g')
    .selectAll('rect')
    .data(d3.range(5))
    .enter()
    .append('rect')
    .attr('x', (_, i) => i * widthPerColumn)
    .attr('y', baseHeight + textHeight + startHeight)
    .attr('width', widthPerColumn)
    .attr('height', height + 0.25 * widthPerColumn)
    .attr('fill', titleColor)

  // Lane separator
  svg
    .append('g')
    .selectAll('line')
    .data(d3.range(4))
    .enter()
    .append('line')
    .attr('x1', (_, i) => (i + 1) * widthPerColumn)
    .attr('y1', baseHeight + textHeight + startHeight)
    .attr('x2', (_, i) => (i + 1) * widthPerColumn)
    .attr(
      'y2',
      baseHeight + textHeight + startHeight + height + 0.25 * widthPerColumn
    )
    .attr('stroke', 'white')

  const columns = svg.append('g').selectAll('g').data(notes).enter().append('g')

  const heightBeforeLanes = textHeight + startHeight + baseHeight

  // SP/A circles
  columns
    .append('g')
    .selectAll('circle')
    .data((x, i) => x.map((y) => [y, i]))
    .enter()
    .append('circle')
    .attr('cx', ([, i]) => (i + 0.5) * widthPerColumn)
    .attr('cy', ([x]) => (Math.abs(x) / beat) * height + heightBeforeLanes)
    .attr('r', ([x]) => (x < 0 ? 0.25 : 0.15) * widthPerColumn)
    .attr('fill', ([, i]) => laneColors[i])

  // Extra styling for SP circles
  columns
    .append('g')
    .selectAll('circle')
    .data((x, i) => x.filter((y) => y < 0).map((y) => [y, i]))
    .enter()
    .append('circle')
    .attr('cx', ([, i]) => (i + 0.5) * widthPerColumn)
    .attr('cy', ([x]) => (Math.abs(x) / beat) * height + heightBeforeLanes)
    .attr('r', 0.15 * widthPerColumn)
    .attr('fill', 'white')
    .attr('fill-opacity', 0.2)

  // Beat #
  columns
    .selectAll('text')
    .data((x, i) => x.map((y) => [y, i]))
    .enter()
    .append('text')
    .attr('x', ([, i]) => (i + 0.5) * widthPerColumn)
    .attr('y', ([x]) => (Math.abs(x) / beat) * height + heightBeforeLanes)
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-weight', 'bold')
    .text(([x]) => Math.abs(x))

  if (skills) {
    const columnSkills = svg
      .append('g')
      .selectAll('g')
      .data(skills)
      .enter()
      .append('g')

    // Skill lines
    columnSkills
      .append('g')
      .selectAll('line')
      .data((x, i) => x.map((y) => [y, i] as [D3LandingSkill, number]))
      .enter()
      .append('line')
      .attr('x1', ([_, i], __b) => (i + 0.5) * widthPerColumn - skillLineOffset)
      .attr('x2', ([_, i], __b) => (i + 0.5) * widthPerColumn - skillLineOffset)
      .attr(
        'y1',
        ([[typ, from, to], __a], __b) =>
          (from / beat) * height + heightBeforeLanes
      )
      .attr(
        'y2',
        ([[typ, from, to], __a], __b) =>
          Math.min(to / beat, 1) * height +
          textHeight +
          startHeight +
          baseHeight
      )
      .attr('stroke', '#6cf')
      .attr('stroke-linecap', ([[, from, to, success], __a], __b) =>
        success && from !== Math.min(to, beat) ? 'round' : 'butt'
      )
      .attr(
        'stroke-width',
        ([[typ, from, to], __a], __b) => skillLineStrokeWidth
      )

    // Skill start notation
    columnSkills
      .append('g')
      .selectAll('text')
      .data((x, i) => x.map((y) => [y, i] as [D3LandingSkill, number]))
      .enter()
      .append('text')
      .attr(
        'x',
        ([__a, i], __b) => (i + 0.5) * widthPerColumn - skillLineOffset
      )
      .attr(
        'y',
        ([[typ, from, to], __a], __b) =>
          (from / beat) * height + heightBeforeLanes
      )
      .attr('fill', 'white')
      .attr('text-anchor', 'left')
      .attr('dominant-baseline', 'middle')
      .style('font-size', '0.9rem')
      .text(([[typ, from, to, success]]) => (success ? '✅' : '❌'))

    // Skill end notation
    columnSkills
      .append('g')
      .selectAll('text')
      .data((x, i) => x.map((y) => [y, i] as [D3LandingSkill, number]))
      .enter()
      .append('text')
      .attr(
        'x',
        ([__a, i], __b) =>
          (i + 0.5) * widthPerColumn -
          skillLineOffset +
          0.8 * skillLineStrokeWidth
      )
      .attr(
        'y',
        ([[typ, from, to], __a], __b) =>
          (to / beat) * height + heightBeforeLanes
      )
      .attr('fill', 'white')
      .attr('text-anchor', 'left')
      .attr('dominant-baseline', 'middle')
      .style('font-size', '0.9rem')
      .text(([[typ, from, to]]) => (from === to ? '' : String(to)))
  }

  const node = svg.node()
  if (!node) {
    throw Error('D3 node not found')
  }
  return node
}

export default renderNotemap
