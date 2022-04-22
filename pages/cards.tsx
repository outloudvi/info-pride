import { useRouter } from 'next/router'
import { Button, Grid, NativeSelect } from '@mantine/core'
import { APIMapping } from '@outloudvi/hoshimi-types'
import useSWR from 'swr'
import type { Card } from '@outloudvi/hoshimi-types/ProtoMaster'
import { CardType } from '@outloudvi/hoshimi-types/ProtoEnum'
import { useMemo, useState } from 'react'

import Layout from '../components/Layout'
import CardItem from '../components/CardItem'
import { UnwrapPromise } from '../utils/api'
import {
  CharacterChineseNameList,
  CharacterId,
  CharacterIds,
} from '../data/vendor/characterId'

const CardPage = () => {
  const router = useRouter()
  const { data: CardData, error: CardDataError } =
    useSWR<UnwrapPromise<ReturnType<APIMapping['Card']>>>('Card')

  const { data: RarityData } =
    useSWR<UnwrapPromise<ReturnType<APIMapping['CardRarity']>>>('CardRarity')

  const cards: Partial<Record<CharacterId, Card[]>> = useMemo(() => {
    const ret: Partial<Record<CharacterId, Card[]>> = {}
    for (const i of CardData ?? []) {
      // typecast-safe: CharacterId should be aligned with CardData
      const cid = i.characterId as CharacterId
      ;(ret[cid] ?? (ret[cid] = [])).push(i)
    }
    return ret
  }, [CardData])

  const [idol, setIdol] = useState<CharacterId>(CharacterIds[0])
  const cardList = cards[idol] ?? []
  const [cardNumber, setCardNumber] = useState(0)

  // FIXME: routing support

  return (
    <Layout>
      <h2>卡片</h2>
      {CardDataError && <p>{String(CardDataError)}</p>}
      <Grid gutter={20} className="my-3">
        <Grid.Col xs={12} lg={6}>
          <NativeSelect
            data={Object.entries(CharacterChineseNameList).map(
              ([id, name]) => ({
                label: name,
                value: id,
              })
            )}
            placeholder="偶像..."
            label="偶像"
            required
            onChange={(e) => {
              setIdol(e.target.value as CharacterId)
            }}
          />
          <div>
            {Object.entries(cardList).map(([cardId, card], key) => (
              <Button
                key={key}
                variant="outline"
                fullWidth
                onClick={() => {
                  setCardNumber(Number(cardId))
                  // FIXME: update route
                }}
                className={
                  'h-14 mt-2 text-left ' +
                  (cardNumber === Number(cardId)
                    ? 'border-none text-black'
                    : '')
                }
                classNames={{
                  inner: 'block',
                }}
              >
                <div className="text-base">
                  <span lang="zh-CN">
                    [{CardType[card.type]}] {card.name}
                  </span>{' '}
                  <br />
                  <span className="text-gray-600 text-sm" lang="ja">
                    {card.name}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </Grid.Col>
        <Grid.Col xs={12} lg={6}>
          {cardList[cardNumber] && RarityData && (
            <CardItem card={cardList[cardNumber]} rarityData={RarityData} />
          )}
        </Grid.Col>
      </Grid>
    </Layout>
  )
}

export default CardPage
