import dynamic from 'next/dynamic'
import { MusicChart } from 'hoshimi-types/types'

import { ImageChart, SkillChart } from './types'

import useApi from '#utils/useApi'

const NotemapGraph = dynamic(() => import('./NotemapGraph'), {
  ssr: false,
})

const NotemapGraphToDownload = ({
  chartId,
  laneColors,
  landingSkillChart,
  imageChart,
}: {
  chartId: string
  laneColors: string[]
  landingSkillChart?: SkillChart
  imageChart?: ImageChart
}) => {
  const { data } = useApi('MusicChart', {
    chartId,
  })

  return data ? (
    <NotemapGraph
      chart={data}
      laneColors={laneColors}
      landingSkillChart={landingSkillChart}
      imageChart={imageChart}
    />
  ) : (
    <div className="text-center text-gray-500">正在下载曲谱信息。</div>
  )
}

const NotemapView = ({
  chartId,
  chart,
  laneColors,
  landingSkillChart,
  imageChart,
}: {
  chartId?: string
  chart?: MusicChart
  laneColors: string[]
  landingSkillChart?: SkillChart
  imageChart?: ImageChart
}) => {
  if (chart) {
    return (
      <NotemapGraph
        chart={chart}
        laneColors={laneColors}
        landingSkillChart={landingSkillChart}
        imageChart={imageChart}
      />
    )
  }

  if (chartId) {
    return (
      <NotemapGraphToDownload
        chartId={chartId}
        laneColors={laneColors}
        landingSkillChart={landingSkillChart}
        imageChart={imageChart}
      />
    )
  }

  throw Error('Either chart or chartId should be provided')
}

export default NotemapView
