import { useCallback, useMemo, useState } from 'react'
import { Button, Grid, Modal, Progress, Select, Stack } from '@mantine/core'

import useIpSWR from '../utils/useIpSWR'
import type { APIResponseOf, UnArray } from '../utils/api'
import {
  CharacterChineseNameList,
  CharacterId,
} from '../data/vendor/characterId'
import allFinished from '../utils/allFinished'
import unitCodeV1 from '../utils/unitCode'

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
        <Button onClick={() => setModalOpened(true)}>选择卡片</Button>
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

  return (
    <>
      <p className="text-gray-500 dark:text-gray-400">
        本页面正在设计中。任何内容均可能发生变化。
      </p>
      <p>
        小队编码：
        {unitCode || '（请先选择所有位置的卡片。）'}
      </p>
      <Grid gutter={20} className="my-3">
        <Grid.Col xs={12} lg={6}>
          <Grid columns={5} gutter={10}>
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
        <>
          <div>
            正在加载数据：完成{' '}
            {Object.values(allData).filter((x) => x !== undefined).length}/
            {Object.keys(allData).length}
          </div>
          <Progress
            value={
              (Object.values(allData).filter((x) => x !== undefined).length /
                Object.keys(allData).length) *
              100
            }
          />
        </>
      )}
    </>
  )
}

export default SkeletonUnitsPage
