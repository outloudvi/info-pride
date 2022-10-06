import { useMemo } from 'react'
import { Checkbox, SimpleGrid } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { useForm } from '@mantine/form'
import uniq from 'lodash/uniq'
import { got } from 'got'
import { CardRarity } from 'hoshimi-types/ProtoMaster'
import { AttributeType } from 'hoshimi-types/ProtoEnum'

import useApi from '#utils/useApi'
import allFinished from '#utils/allFinished'
import { addI18nMessages } from '#utils/getI18nProps'
import { APIResponseOf, UnArray } from '#utils/api'
import PageLoading from '#components/PageLoading'
import Title from '#components/Title'
import CardCard from '#components/cards/CardCard'
import { CharacterId, CharacterIds } from '#data/vendor/characterId'
import getCardColor from '#utils/getCardColor'
import FilterSelect from '#components/search/FilterSelect'
import type { Card as WikiCard } from '#data/wikiPages/cards'
import useFrontendApi from '#utils/useFrontendApi'
import { MAX_LEVEL } from '#utils/constants'
import Paths from '#utils/paths'

type CardNameDataType = { nameCn: string; nameJa: string }[]

const CardFaceTypes = [
    'schl',
    'casl',
    'idol',
    'vlnt',
    'eve',
    'chna',
    'mizg',
    'xmas',
    'fest',
    'wedd',
    'prem',
    'newy',
]

const CardsPage = ({
    CardListData,
    CardNameData,
}: {
    CardListData: APIResponseOf<'Card/List'>
    CardNameData: CardNameDataType
}) => {
    const $v = useTranslations('vendor')
    const $vc = useTranslations('v-chr')
    const $t = useTranslations('cards')

    const {
        values: formValues,
        errors: formErrors,
        getInputProps,
    } = useForm({
        initialValues: {
            selectedCharacters: [] as CharacterId[],
            selectedCardTypes: [] as string[],
            selectedCardColors: [] as string[],
            selectedCardFaceTypes: [] as string[],
            orderBy: 'releaseDate' as keyof UnArray<APIResponseOf<'Card/List'>>,
            orderReversed: true,
        },
    })

    const cardFaceTypeList = useMemo(
        () =>
            uniq(
                CardListData.map((x) => x.id.split('-')?.[3])
                    .filter((x) => CardFaceTypes.includes(x))
                    .sort((a, b) => (a < b ? -1 : 1))
            ),
        [CardListData]
    )

    const cards = useMemo(() => {
        const {
            selectedCharacters,
            selectedCardTypes,
            selectedCardFaceTypes,
            selectedCardColors,
            orderBy,
            orderReversed,
        } = formValues

        return CardListData.filter((x) =>
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
                selectedCardFaceTypes.length === 0
                    ? true
                    : selectedCardFaceTypes.includes(x.id.split('-')?.[3])
            )
            .filter((x) =>
                selectedCardColors.length === 0
                    ? true
                    : selectedCardColors.includes(
                          AttributeType[
                              getCardColor({
                                  // shall be safe since large RatioPermil gives larger Pt
                                  vocalRatioPermil: x.vocalPt,
                                  danceRatioPermil: x.dancePt,
                                  visualRatioPermil: x.visualPt,
                              })
                          ]
                      )
            )
            .sort(
                (a, b) =>
                    (a[orderBy] > b[orderBy] ? -1 : 1) *
                    (orderReversed ? 1 : -1)
            )
    }, [formValues, CardListData])

    return (
        <>
            <div className="mt-2 mb-4 rounded-md border-solid border-6 border-sky-500 p-2">
                <div className="flex items-center mb-2 flex-wrap">
                    <FilterSelect
                        className="mr-2"
                        label={$t('Character')}
                        multiple
                        list={CharacterIds}
                        displayAs={$vc}
                        width={300}
                        formProps={getInputProps('selectedCharacters')}
                    />
                    <FilterSelect
                        className="mr-2"
                        label={$t('Type')}
                        multiple
                        list={['1', '2', '3']}
                        listNamemap={{
                            // Also check locales/vendor.json
                            1: $v('Appeal'),
                            2: $v('Technique'),
                            3: $v('Support'),
                        }}
                        width={300}
                        formProps={getInputProps('selectedCardTypes')}
                    />
                    <FilterSelect
                        className="mr-2"
                        label={$t('Property')}
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
                        label={$t('Theme')}
                        multiple
                        list={cardFaceTypeList}
                        displayAs={(x) => $t(`cardface_${x}`)}
                        width={300}
                        formProps={getInputProps('selectedCardFaceTypes')}
                    />
                    <FilterSelect
                        className="mr-2"
                        label={$t('Sort')}
                        list={[
                            'releaseDate',
                            'idol',
                            'vocalPt',
                            'dancePt',
                            'visualPt',
                        ]}
                        displayAs={$t}
                        width={300}
                        formProps={getInputProps('orderBy')}
                    />
                    <Checkbox
                        label={$t('Descending')}
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
                            CardNameData.filter(
                                (x) => x.nameJa === item.name
                            )?.[0]?.nameCn
                        }
                    />
                ))}
            </SimpleGrid>
        </>
    )
}

const SkeletonCardsPage = ({ maxRarity }: { maxRarity: number }) => {
    const $t = useTranslations('cards')
    const { data: CardListData } = useApi('Card/List', {
        level: String(MAX_LEVEL),
        rarity: String(maxRarity),
    })
    const { data: CardNameData } = useFrontendApi('wikiCard', {
        fields: 'nameCn,nameJa',
    })

    const allData = {
        CardListData,
        CardNameData: CardNameData as
            | Pick<WikiCard, 'nameCn' | 'nameJa'>[]
            | undefined,
    }

    return (
        <>
            <Title title={$t('Cards')} />
            {allFinished(allData) ? (
                <>
                    <p>
                        {$t('page_header', {
                            rarity: maxRarity,
                            level: MAX_LEVEL,
                        })}
                    </p>
                    <CardsPage {...allData} />
                </>
            ) : (
                <PageLoading data={allData} />
            )}
        </>
    )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
    const CardRarity: CardRarity[] = await got
        .get(Paths.api('CardRarity'))
        .json()
    return {
        props: {
            ...(await addI18nMessages(locale, ['cards', 'vendor', 'v-chr'])),
            maxRarity: CardRarity.reduce((a, b) =>
                a.rarity > b.rarity ? a : b
            ).rarity,
        },
    }
}

export default SkeletonCardsPage
