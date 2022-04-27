import { Grid, NativeSelect } from '@mantine/core'
import useSWR from 'swr'
import type { Card } from '@outloudvi/hoshimi-types/ProtoMaster'
import { CardType } from '@outloudvi/hoshimi-types/ProtoEnum'
import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { atomWithHash } from 'jotai/utils'
import { useAtom } from 'jotai'

import Layout from '../components/Layout'
import CardItem from '../components/CardItem'
import {
  CharacterChineseNameList,
  CharacterId,
  CharacterIds,
} from '../data/vendor/characterId'
import getI18nProps from '../utils/geti18nProps'
import { APIResponseOf } from '../utils/api'
import ListButton from '../components/ListButton'

const idolNameAtom = atomWithHash<CharacterId>('idol', CharacterIds[0], {
  serialize: (x) => x,
  deserialize: (x) => x as CharacterId,
})
const cardNumberAtom = atomWithHash('cardId', 0)

const CardPage = () => {
  const { t: $v } = useTranslation('vendor')

  const { data: CardData, error: CardDataError } =
    useSWR<APIResponseOf<'Card'>>('Card')

  const cards: Partial<Record<CharacterId, APIResponseOf<'Card'>>> =
    useMemo(() => {
      const ret: Partial<Record<CharacterId, APIResponseOf<'Card'>>> = {}
      for (const i of CardData ?? []) {
        // typecast-safe: CharacterId should be aligned with CardData
        const cid = i.characterId as CharacterId
        ;(ret[cid] ?? (ret[cid] = [])).push(i)
      }
      return ret
    }, [CardData])

  const [idol, setIdol] = useAtom(idolNameAtom)
  const cardList = cards[idol] ?? []
  const [cardNumber, setCardNumber] = useAtom(cardNumberAtom)

  return (
    <Layout>
      <h2>卡片</h2>
      {CardDataError && <p>{String(CardDataError)}</p>}
      <Grid gutter={20} className="my-3">
        <Grid.Col xs={12} lg={4}>
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
            value={idol}
            onChange={(e) => {
              setIdol(e.target.value as CharacterId)
            }}
          />
          <div>
            {Object.entries(cardList).map(([cardId, card], key) => (
              <ListButton
                key={key}
                onClick={() => {
                  setCardNumber(Number(cardId))
                }}
                selected={cardNumber === Number(cardId)}
              >
                <div className="text-base">
                  <span lang="zh-CN">
                    [{$v(CardType[card.type])}] {card.name}
                  </span>{' '}
                  {/* TODO: 中文卡牌名 */}
                  {/* <br />
                    <span className="text-gray-600 text-sm" lang="ja">
                    {card.name}
                  </span> */}
                </div>
              </ListButton>
            ))}
          </div>
        </Grid.Col>
        <Grid.Col xs={12} lg={8}>
          {cardList[cardNumber] && RarityData && (
            <CardItem card={cardList[cardNumber]} rarityData={RarityData} />
          )}
        </Grid.Col>
      </Grid>
    </Layout>
  )
}

export const getStaticProps = getI18nProps

export default CardPage
