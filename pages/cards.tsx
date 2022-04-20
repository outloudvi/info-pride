import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import _range from 'lodash/range'
import { Grid, NativeSelect } from '@mantine/core'
import { Button } from '../components/vendorx/mantine'

import Layout from '../components/Layout'
import CardItem from '../components/CardItem'
import { tryToNumber, updateRoute } from '../rtUtils'

import type { TheRootSchema } from '../utils/wikiPages/cards'
import { Cards } from '../utils/dataset'
import { IdolNameList, idolNameToSlug, idolSlugToName } from '../data/idols'

type IdolName = keyof TheRootSchema

const CardPage = () => {
  const router = useRouter()

  const [idol, setIdol] = useState<IdolName>(IdolNameList[0])
  const cardList = Cards[idol]
  const [cardNumber, setCardNumber] = useState(1)

  useEffect(() => {
    if (!router.isReady) return
    const { idol, slug } = router.query

    if (idol === undefined) return
    if (Array.isArray(idol)) return
    const maybeIdolName = idolSlugToName(idol.toLowerCase())
    if (!maybeIdolName) return
    setIdol(maybeIdolName)

    const cardNumber = tryToNumber(slug)
    if (cardNumber !== null) {
      setCardNumber(cardNumber)
    }
  }, [router])

  return (
    <Layout>
      <h2>卡片</h2>
      <Grid gutter={20} className="my-3">
        <Grid.Col xs={12} lg={6}>
          <NativeSelect
            data={IdolNameList}
            placeholder="偶像..."
            label="选择偶像"
            required
            onChange={(e) => {
              setIdol(e.target.value as IdolName)
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
                  updateRoute(`/cards/${idolNameToSlug(idol)}/${cardId}`)
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
                    [{card.type}] {card.nameCn}
                  </span>{' '}
                  <br />
                  <span className="text-gray-600 text-sm" lang="ja">
                    {card.nameJa}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </Grid.Col>
        <Grid.Col xs={12} lg={6}>
          {cardList[cardNumber] && (
            <CardItem
              card={cardList[cardNumber]}
              idolName={idol}
              cardNumber={cardNumber}
            />
          )}
        </Grid.Col>
      </Grid>
    </Layout>
  )
}

export default CardPage
