import { useCallback, useMemo, useState } from 'react'
import {
  Button,
  Collapse,
  Grid,
  Group,
  Modal,
  NativeSelect,
  TextInput,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'

import useApi from '#utils/useApi'
import CardIdData from '#data/ccid'
import type { APIResponseOf } from '#utils/api'
import allFinished from '#utils/allFinished'
import unitCodeV1 from '#utils/unitCode'
import PageLoading from '#components/PageLoading'
import getI18nProps from '#utils/geti18nProps'
import Title from '#components/Title'
import type { CardTiny, MusicChartItem } from '#components/units/types'
import UnitPosition from '#components/units/UnitPosition'
import UnitAnalyzer from '#components/units/UnitAnalyzer'
import NotemapView from '#components/notemap/NotemapView'

const UnitsPage = ({
  CardData,
  ChartListData,
}: {
  CardData: APIResponseOf<'Card'>
  ChartListData: APIResponseOf<'MusicChartList'>
}) => {
  const musicChartList: MusicChartItem[] = ChartListData.map((x) =>
    x.charts.map((r) => ({
      ...r,
      songTitle: x.title,
    }))
  ).reduce((a, b) => [...a, ...b])

  const [selectedMusicChart, setSelectedMusicChart] = useState<MusicChartItem>(
    musicChartList[0]
  )

  // 6 positions (0 and 1-5)
  // (unitCards[0] should be always empty)
  const [unitCards, setUnitCards] = useState<(CardTiny | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ])

  const setPositionCard = useCallback(
    (pos: number) => (card: CardTiny) => {
      setUnitCards((r) => [...r.slice(0, pos), card, ...r.slice(pos + 1)])
    },
    [setUnitCards]
  )

  const unitCode = useMemo(() => {
    const cardList = unitCards.slice(1)
    if (cardList.filter((x) => x).length !== 5) return ''
    return unitCodeV1.encode(cardList as NonNullable<CardTiny[]>, CardIdData)
  }, [unitCards])

  const [modalImportUnit, setModalImportUnit] = useState(false)
  const [importUnitId, setImportUnitId] = useState('')
  const [showNotemap, setShowNotemap] = useState(false)

  return (
    <>
      <Modal
        opened={modalImportUnit}
        onClose={() => setModalImportUnit(false)}
        title="导入队伍编码"
      >
        <p className="p-2">
          队伍编码可以表示一个五人队伍的卡组及站位，但不包含等级或技能信息。{' '}
          <br />
          它应该以 1P- 开头。
        </p>
        <TextInput
          placeholder="1P-..."
          label="队伍编码"
          onChange={(e) => {
            setImportUnitId(e.target.value)
          }}
          required
        />
        <Button
          className="mt-2"
          onClick={() => {
            const result = unitCodeV1.decode(importUnitId, CardIdData)
            if (result === null) {
              showNotification({
                title: `错误的队伍编码：${importUnitId}`,
                message: '此编码无效，或来自更新版本的 INFO PRIDE。',
                color: 'red',
              })
              return
            }
            setUnitCards([
              null,
              ...result.map((x) => CardData.find((y) => y.id === x) ?? null),
            ])
            showNotification({
              title: '导入了队伍。',
              message: '队伍编码导入成功。',
              color: 'green',
            })
            setModalImportUnit(false)
          }}
        >
          导入
        </Button>
      </Modal>
      <p className="text-gray-500 dark:text-gray-400">
        本页面正在设计中。任何内容均可能发生变化。
      </p>

      <Grid gutter={20} className="my-3">
        <Grid.Col xs={12} lg={6}>
          <div className="mb-2">
            <NativeSelect
              label="选择谱面"
              data={musicChartList.map(
                (x, index) => `[#${index + 1}] ${x.songTitle} - ${x.desc}`
              )}
              onChange={(e) => {
                const value = e.currentTarget.value.match(/^\[#(\d+)\]/)?.[1]
                if (!value) {
                  showNotification({
                    title: '无效的谱面',
                    message: '请重新选择谱面。',
                    color: 'red',
                  })
                  return
                }
                setSelectedMusicChart(musicChartList[Number(value)])
              }}
              required
            />
          </div>
          <Group>
            <div className="grow">
              队伍编码：
              {unitCode || '（请先选择所有位置的卡片。）'}
            </div>
            <Button
              onClick={() => {
                setModalImportUnit(true)
              }}
            >
              导入队伍编码
            </Button>
          </Group>
          <div className="grid grid-cols-5 gap-x-2 gap-y-1 mt-3">
            {[4, 2, 1, 3, 5].map((position, key) => (
              <UnitPosition
                key={key}
                col={key + 1}
                position={position}
                card={unitCards[position]}
                setCard={setPositionCard(position)}
                cardList={CardData}
              />
            ))}
          </div>
        </Grid.Col>
        <Grid.Col xs={12} lg={6}>
          <UnitAnalyzer unitCards={unitCards} musicChart={selectedMusicChart} />
          <Button
            className="my-2"
            onClick={() => {
              setShowNotemap((x) => !x)
            }}
          >
            {showNotemap ? '隐藏曲谱' : '显示曲谱'}
          </Button>
          <Collapse in={showNotemap}>
            <NotemapView
              chartId={selectedMusicChart.id}
              laneColors={['blue', 'blue', 'blue', 'blue', 'blue']}
            />
          </Collapse>
        </Grid.Col>
      </Grid>
    </>
  )
}

const SkeletonUnitsPage = () => {
  const { data: CardData } = useApi('Card')
  const { data: ChartListData } = useApi('MusicChartList')

  const allData = {
    CardData,
    ChartListData,
  }

  return (
    <>
      <Title title="组队" />
      {allFinished(allData) ? (
        <UnitsPage {...allData} />
      ) : (
        <PageLoading data={allData} />
      )}
    </>
  )
}

export const getStaticProps = getI18nProps

export default SkeletonUnitsPage
