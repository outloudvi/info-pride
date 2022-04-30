import { useCallback, useMemo, useState } from 'react'
import {
  Button,
  Grid,
  Group,
  Modal,
  Select,
  Stack,
  TextInput,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'

import useIpSWR from '../utils/useIpSWR'
import type { APIResponseOf, UnArray } from '../utils/api'
import {
  CharacterChineseNameList,
  CharacterId,
} from '../data/vendor/characterId'
import allFinished from '../utils/allFinished'
import unitCodeV1 from '../utils/unitCode'
import PageLoading from '../components/PageLoading'

type CardTiny = UnArray<APIResponseOf<'Card'>>

const UnitPosition = ({
  position,
  card,
  setCard,
  cardList,
}: {
  position: number
  card?: CardTiny
  setCard: (c: CardTiny) => void
  cardList: CardTiny[]
}) => {
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={`选择位置 ${position} 的卡片`}
      >
        <Select
          label="选择一张卡片"
          data={cardList.map((x) => ({
            label: `${x.name} / ${
              CharacterChineseNameList[x.characterId as CharacterId]
            }`,
            value: x.id,
          }))}
          searchable
          value={card?.id}
          onChange={(e) => {
            if (!e) return
            setCard(cardList[cardList.findIndex((c) => c.id === e)])
          }}
        />
      </Modal>
      <Stack align="center">
        <Button onClick={() => setModalOpened(true)}>选择卡片</Button>
        <div>
          {card ? (
            <>
              <div>{card.name}</div>
              <div>
                {CharacterChineseNameList[card.characterId as CharacterId]}
              </div>
            </>
          ) : (
            <div>未选择卡片</div>
          )}
        </div>
      </Stack>
    </>
  )
}

const UnitsPage = ({
  CardData,
  CardIdData,
}: {
  CardData: APIResponseOf<'Card'>
  CardIdData: APIResponseOf<'Card/Id'>
}) => {
  // 6 positions (0 and 1-5)
  // (unitCards[0] should be always empty)
  const [unitCards, setUnitCards] = useState<(CardTiny | undefined)[]>([
    ,
    ,
    ,
    ,
    ,
    ,
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
    return unitCodeV1.encode(cardList as NonNullable<any>, CardIdData)
  }, [unitCards, CardIdData])

  const [modalImportUnit, setModalImportUnit] = useState(false)
  const [importUnitId, setImportUnitId] = useState('')

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
              undefined,
              ...result.map((x) => CardData.find((y) => y.id === x)),
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
          <Grid className="mt-2" columns={5} gutter={10}>
            {[4, 2, 1, 3, 5].map((position, key) => (
              <Grid.Col key={key} xs={1}>
                <UnitPosition
                  position={position}
                  card={unitCards[position]}
                  setCard={setPositionCard(position)}
                  cardList={CardData}
                />
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>
        <Grid.Col xs={12} lg={6}>
          {/* TODO: display notemap */}
        </Grid.Col>
      </Grid>
    </>
  )
}

const SkeletonUnitsPage = () => {
  const { data: CardData } = useIpSWR('Card')
  const { data: CardIdData } = useIpSWR('Card/Id')

  const allData = {
    CardData,
    CardIdData,
  }

  return (
    <>
      <h2>组队</h2>
      {allFinished(allData) ? (
        <UnitsPage {...allData} />
      ) : (
        <PageLoading data={allData} />
      )}
    </>
  )
}

export default SkeletonUnitsPage
