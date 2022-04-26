import { useCallback, useMemo, useState } from 'react'
import { Button, Grid, Modal, Select, Stack } from '@mantine/core'
import useSWR from 'swr'
import type { Card } from '@outloudvi/hoshimi-types/ProtoMaster'

import Layout from '../components/Layout'
import type { APIResponseOf } from '../utils/api'
import {
  CharacterChineseNameList,
  CharacterId,
} from '../data/vendor/characterId'

const UnitPosition = ({
  position,
  card,
  setCard,
  cardList,
}: {
  position: number
  card?: Card
  setCard: (c: Card) => void
  cardList: Card[]
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

const UnitsPage = () => {
  const { data: _CardData, error: CardDataError } =
    useSWR<APIResponseOf<'Card'>>('Card')

  const CardData = _CardData ?? []

  // 6 positions (0 and 1-5)
  // (unitCards[0] should be always empty)
  const [unitCards, setUnitCards] = useState<(Card | undefined)[]>([
    ,
    ,
    ,
    ,
    ,
    ,
  ])

  const setPositionCard = useCallback(
    (pos: number) => (card: Card) => {
      setUnitCards((r) => [...r.slice(0, pos), card, ...r.slice(pos + 1)])
    },
    [setUnitCards]
  )

  const unitCode = useMemo(() => {
    const cardList = unitCards.slice(1)
    if (cardList.filter((x) => x).length !== 5) return ''
    return (cardList as Card[]).map((x) => x.id).join('+')
  }, [unitCards])

  return (
    <Layout>
      <h2>组队</h2>
      <p className="text-gray-500 dark:text-gray-400">
        本页面正在设计中。任何内容均可能发生变化。
      </p>
      <p>
        分享小队编码（在将来这当然会更短一点）：
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
    </Layout>
  )
}

export default UnitsPage
