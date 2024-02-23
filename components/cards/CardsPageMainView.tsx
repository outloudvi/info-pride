'use client'

import { useMemo } from 'react'
import { Checkbox, SimpleGrid } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { useForm } from '@mantine/form'
import uniq from 'lodash/uniq'
import { AttributeType } from 'hoshimi-types/ProtoEnum'

import type { APIResponseOf, UnArray } from '#utils/api'
import CardCard from '#components/cards/CardCard'
import type { CharacterId } from '#data/vendor/characterId'
import { CharacterIds } from '#data/vendor/characterId'
import getCardColor from '#utils/getCardColor'
import FilterSelect from '#components/search/card/FilterSelect'

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
    'pajm',
]

const CardsPageMainView = ({
    CardListData,
}: {
    CardListData: APIResponseOf<'Card/List'>
}) => {
    const $v = useTranslations('vendor')
    const $vc = useTranslations('v-chr')
    const $t = useTranslations('cards')

    const { values: formValues, getInputProps } = useForm({
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
                    .sort((a, b) => (a < b ? -1 : 1)),
            ),
        [CardListData],
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
                : selectedCharacters.includes(x.characterId as CharacterId),
        )
            .filter((x) =>
                selectedCardTypes.length === 0
                    ? true
                    : selectedCardTypes.includes(String(x.type)),
            )
            .filter((x) =>
                selectedCardFaceTypes.length === 0
                    ? true
                    : selectedCardFaceTypes.includes(x.id.split('-')?.[3]),
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
                          ],
                      ),
            )
            .sort(
                (a, b) =>
                    (a[orderBy] > b[orderBy] ? -1 : 1) *
                    (orderReversed ? 1 : -1),
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
                        width={200}
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
                        width={200}
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
                        width={200}
                        formProps={getInputProps('selectedCardColors')}
                    />
                    <FilterSelect
                        className="mr-2"
                        label={$t('Theme')}
                        multiple
                        list={cardFaceTypeList}
                        displayAs={(x) => $t(`cardface_${x}`)}
                        width={200}
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
                        width={200}
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
                spacing="lg"
                cols={{
                    base: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                }}
                verticalSpacing={{
                    base: 'sm',
                    md: 'md',
                    lg: 'lg',
                }}
            >
                {cards.map((item, key) => (
                    <CardCard key={key} card={item} />
                ))}
            </SimpleGrid>
        </>
    )
}

export default CardsPageMainView
