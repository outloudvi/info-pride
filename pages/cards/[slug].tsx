import { useRouter } from 'next/router'
import { Skeleton } from '@mantine/core'

import PageLoading from '#components/PageLoading'
import Title from '#components/Title'
import getI18nProps from '#utils/geti18nProps'
import useApi from '#utils/useApi'
import allFinished from '#utils/allFinished'
import { APIResponseOf } from '#utils/api'
import pickFirstOrOne from '#utils/pickFirstOrOne'
import CardItem from '#components/cards/CardItem'

const CardInfoPage = ({
  CardData,
  RarityData,
}: {
  CardData: APIResponseOf<'Card'>
  RarityData: APIResponseOf<'CardRarity'>
}) => {
  const Card = CardData[0]

  return <CardItem card={Card} rarityData={RarityData} />
}

const SkeletonCardInfoPage = () => {
  const router = useRouter()
  const slug = pickFirstOrOne(router.query.slug ?? '')
  const { data: CardData } = useApi('Card', {
    id: slug,
  })
  const { data: RarityData } = useApi('CardRarity')

  const allData = {
    CardData,
    RarityData,
  }

  return (
    <>
      <Title title="卡片" />
      {allFinished(allData) ? (
        <CardInfoPage {...allData} />
      ) : (
        <PageLoading data={allData} />
      )}
    </>
  )
}

const PreloadedCardInfoPage = () => {
  const router = useRouter()

  return router.isReady ? <SkeletonCardInfoPage /> : <Skeleton height={300} />
}

// export const getServerSideProps = getI18nProps

export default PreloadedCardInfoPage
