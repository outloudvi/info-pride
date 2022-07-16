import dynamic from 'next/dynamic'
import { MusicChart } from 'hoshimi-types/types'

import { SkillChart } from './types'

import useApi from '#utils/useApi'

const NotemapGraph = dynamic(() => import('./NotemapGraph'), {
  ssr: false,
})

const NotemapGraphToDownload = ({
  chartId,
  laneColors,
  landingSkillChart,
}: {
  chartId: string
  laneColors: string[]
  landingSkillChart?: SkillChart
}) => {
  const { data } = useApi('MusicChart', {
    chartId,
  })

  return data ? (
    <NotemapGraph
      chart={data}
      laneColors={laneColors}
      landingSkillChart={landingSkillChart}
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
}: {
  chartId?: string
  chart?: MusicChart
  laneColors: string[]
  landingSkillChart?: SkillChart
}) => {
  if (chart) {
    return (
      <NotemapGraph
        chart={chart}
        laneColors={laneColors}
        landingSkillChart={landingSkillChart}
      />
    )
  }

  if (chartId) {
    return (
      <NotemapGraphToDownload
        chartId={chartId}
        laneColors={laneColors}
        landingSkillChart={landingSkillChart}
      />
    )
  }

  throw Error('Either chart or chartId should be provided')
}

export default NotemapView
