import { useCallback, useMemo, useState } from 'react'
import {
  Button,
  Collapse,
  Divider,
  Grid,
  Group,
  Modal,
  NativeSelect,
  Skeleton,
  Switch,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

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
import UnitNotemap from '#components/units/UnitNotemap'
import TrackColorSelect from '#components/notemap/TrackColorSelect'

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

  const { data: ChartData } = useApi('MusicChart', {
    chartId: selectedMusicChart.id,
  })

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
  const [cnTrans, setCnTrans] = useState(true)

  const [laneColors, setLaneColors] = useState<string[]>([
    'blue',
    'blue',
    'blue',
    'blue',
    'blue',
  ])

  return (
    <>
      <Modal
        opened={modalImportUnit}
        onClose={() => setModalImportUnit(false)}
        title="??????????????????"
      >
        <p className="p-2">
          ???????????????????????????????????????????????????????????????????????????????????????????????????{' '}
          <br />
          ???????????? 1P- ?????????
        </p>
        <TextInput
          placeholder="1P-..."
          label="????????????"
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
                title: `????????????????????????${importUnitId}`,
                message: '?????????????????????????????????????????? INFO PRIDE???',
                color: 'red',
              })
              return
            }
            setUnitCards([
              null,
              ...result.map((x) => CardData.find((y) => y.id === x) ?? null),
            ])
            showNotification({
              title: '??????????????????',
              message: '???????????????????????????',
              color: 'green',
            })
            setModalImportUnit(false)
          }}
        >
          ??????
        </Button>
      </Modal>
      <Grid gutter={20}>
        <Grid.Col xs={12} lg={6}>
          <div className="mb-2">
            <NativeSelect
              label="????????????"
              data={musicChartList.map(
                (x, index) => `[#${index + 1}] ${x.songTitle} - ${x.desc}`
              )}
              onChange={(e) => {
                const value = e.currentTarget.value.match(/^\[#(\d+)\]/)?.[1]
                if (!value) {
                  showNotification({
                    title: '???????????????',
                    message: '????????????????????????',
                    color: 'red',
                  })
                  return
                }
                setSelectedMusicChart(musicChartList[Number(value) - 1])
              }}
              required
            />
          </div>
          <Group>
            <div className="grow">
              ???????????????
              {unitCode
                ? unitCode.includes('!')
                  ? '????????????????????? ccid ??????????????????????????????????????????????????????'
                  : unitCode
                : '??????????????????????????????????????????'}
            </div>
            <Button
              onClick={() => {
                setModalImportUnit(true)
              }}
            >
              ??????????????????
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
                useCnTrans={cnTrans}
              />
            ))}
          </div>
          <div className="mt-2">
            <TrackColorSelect
              laneColors={laneColors}
              setLaneColors={setLaneColors}
            />
          </div>
          <Divider className="my-2" />
          <Switch
            label={
              <span>
                ??????????????????
                <Tooltip
                  className="ml-2"
                  label="?????????????????????????????????????????????????????????????????????????????????"
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </Tooltip>
              </span>
            }
            checked={cnTrans}
            onChange={(e) => setCnTrans(e.target.checked)}
          />
        </Grid.Col>
        <Grid.Col xs={12} lg={6}>
          <UnitAnalyzer unitCards={unitCards} musicChart={selectedMusicChart} />
          <Button
            className="my-2"
            onClick={() => {
              setShowNotemap((x) => !x)
            }}
          >
            {showNotemap ? '????????????' : '????????????'}
          </Button>
          {ChartData ? (
            <Collapse in={showNotemap}>
              <UnitNotemap
                chart={ChartData}
                unitCards={unitCards}
                laneColors={laneColors}
              />
            </Collapse>
          ) : (
            <Skeleton height={200} />
          )}
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
      <Title title="??????" />
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
