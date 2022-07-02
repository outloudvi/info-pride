import { useMemo } from 'react'
import { Checkbox, SimpleGrid } from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { useForm } from '@mantine/form'

import useApi from '#utils/useApi'
import allFinished from '#utils/allFinished'
import getI18nProps from '#utils/geti18nProps'
import { APIResponseOf, UnArray } from '#utils/api'
import PageLoading from '#components/PageLoading'
import Title from '#components/Title'
import CardCard from '#components/cards/CardCard'
import {
  CharacterChineseNameList,
  CharacterId,
  CharacterIds,
} from '#data/vendor/characterId'
import getCardColor from '#utils/getCardColor'
import FilterSelect from '#components/search/FilterSelect'
import type { Card as WikiCard } from '#data/wikiPages/cards'
import useFrontendApi from '#utils/useFrontendApi'

type CardNameDataType = { nameCn: string; nameJa: string }[]

const CardsPage = ({
  CardData,

  CardNameData,
}: {
  CardData: APIResponseOf<'Card'>

  CardNameData: CardNameDataType
}) => {
  const { t: $v } = useTranslation('vendor')
  const {
    values: formValues,
    errors: formErrors,
    getInputProps,
  } = useForm({
    initialValues: {
      selectedCharacters: [] as CharacterId[],
      selectedCardTypes: [] as string[],
      selectedCardColors: [] as string[],
      orderBy: 'releaseDate' as keyof UnArray<APIResponseOf<'Card'>>,
      orderReversed: true,
    },
  })

  const cards = useMemo(() => {
    const {
      selectedCharacters,
      selectedCardTypes,
      selectedCardColors,
      orderBy,
      orderReversed,
    } = formValues

    return CardData.filter((x) =>
      selectedCharacters.length === 0
        ? true
        : selectedCharacters.includes(x.characterId as CharacterId)
    )
      .filter((x) =>
        selectedCardTypes.length === 0
          ? true
          : selectedCardTypes.includes(String(x.type))
      )
      .filter((x) =>
        selectedCardColors.length === 0
          ? true
          : selectedCardColors.includes(getCardColor(x))
      )
      .sort(
        (a, b) => (a[orderBy] > b[orderBy] ? -1 : 1) * (orderReversed ? 1 : -1)
      )
  }, [formValues, CardData])

  return (
    <>
      <div className="mt-2 mb-4 rounded-md border-solid border-6 border-sky-500 p-2">
        <div className="flex items-center mb-2 flex-wrap">
          <FilterSelect
            className="mr-2"
            label="角色"
            multiple
            list={CharacterIds}
            listNamemap={CharacterChineseNameList}
            width={300}
            formProps={getInputProps('selectedCharacters')}
          />
          <FilterSelect
            className="mr-2"
            label="类型"
            multiple
            list={['1', '2', '3']}
            listNamemap={{
              // Also check locales/vendor.json
              1: '得分',
              2: '辅助',
              3: '支援',
            }}
            width={300}
            formProps={getInputProps('selectedCardTypes')}
          />
          <FilterSelect
            className="mr-2"
            label="属性"
            multiple
            list={['Dance', 'Vocal', 'Visual']}
            listNamemap={{
              Dance: $v('Dance'),
              Vocal: $v('Vocal'),
              Visual: $v('Visual'),
            }}
            width={300}
            formProps={getInputProps('selectedCardColors')}
          />
          <FilterSelect
            className="mr-2"
            label="排序方式"
            list={['releaseDate', 'idol']}
            listNamemap={{
              releaseDate: '发布日期',
              idol: '偶像',
            }}
            width={300}
            formProps={getInputProps('orderBy')}
          />
          <Checkbox
            label="倒序"
            {...getInputProps('orderReversed')}
            checked={formValues.orderReversed}
          />
        </div>
      </div>
      <SimpleGrid
        className="max-w-7xl mx-auto"
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: 'md' },
          { maxWidth: 755, cols: 2, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
      >
        {cards.map((item, key) => (
          <CardCard
            key={key}
            card={item}
            nameCn={
              CardNameData.filter((x) => x.nameJa === item.name)?.[0]?.nameCn
            }
          />
        ))}
      </SimpleGrid>
    </>
  )
}

const SkeletonCardsPage = () => {
  const { data: CardData } = useApi('Card')
  const { data: CardNameData } = useFrontendApi('wikiCard', {
    fields: 'nameCn,nameJa',
  })

  const allData = {
    CardData,
    CardNameData: CardNameData as
      | Pick<WikiCard, 'nameCn' | 'nameJa'>[]
      | undefined,
  }

  return (
    <>
      <Title title="卡片" />
      {allFinished(allData) ? (
        <CardsPage {...allData} />
      ) : (
        <PageLoading data={allData} />
      )}
    </>
  )
}

export const getStaticProps = getI18nProps

export default SkeletonCardsPage
