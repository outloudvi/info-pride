import dynamic from 'next/dynamic'

import useApi from '#utils/useApi'

const NotemapGraph = dynamic(() => import('./NotemapGraph'), {
  ssr: false,
})

const NotemapView = ({
  chartId,
  laneColors,
}: {
  chartId: string
  laneColors: string[]
}) => {
  const { data } = useApi('MusicChart', {
    chartId,
  })

  return data ? (
    <NotemapGraph chart={data} laneColors={laneColors} />
  ) : (
    <div className="text-center text-gray-500">正在下载曲谱信息。</div>
  )
}

export default NotemapView
