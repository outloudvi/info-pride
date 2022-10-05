import { ReactNode, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useForm } from '@mantine/form'
import { Checkbox, NumberInput, TextInput, Tooltip } from '@mantine/core'
import { SkillCategoryType } from 'hoshimi-types/ProtoEnum'
import { EffectWithTarget as SXEffectWithTarget } from 'hoshimi-types/Skillx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import uniq from 'lodash/uniq'
import { useTranslations } from 'next-intl'

import { LocalBox } from './settings'

import tryJSONParse from '#utils/tryJsonParse'
import { LOCALSTORAGE_BOX_TAG } from '#utils/startupHook'
import useApi from '#utils/useApi'
import allFinished from '#utils/allFinished'
import PageLoading from '#components/PageLoading'
import { APIResponseOf } from '#utils/api'
import FilterSelect from '#components/search/FilterSelect'
import { CharacterId, CharacterIds } from '#data/vendor/characterId'
import {
    skillEffectTypeNames,
    skillTargetTypeNames,
} from '#data/vendor/searchSkillTypes'
import ResultList from '#components/search/ResultList'
import CCIDTable from '#data/ccid'
import Title from '#components/Title'
import Paths from '#utils/paths'
import getI18nProps from '#utils/getI18nProps'

const SearchPage = ({
    CardData,
    SkillAllData,
    SkillxData,
}: {
    CardData: APIResponseOf<'Card'>
    SkillAllData: APIResponseOf<'Skill/All'>
    SkillxData: APIResponseOf<'Skill/X'>
}) => {
    const $t = useTranslations('search')
    const $vc = useTranslations('v-chr')
    const $v = useTranslations('vendor')

    const [localBox, setLocalBox] = useState<LocalBox>({})
    useEffect(() => {
        setLocalBox(
            tryJSONParse(localStorage.getItem(LOCALSTORAGE_BOX_TAG)) ?? {}
        )
    }, [])

    const {
        values: formValues,
        errors: formErrors,
        getInputProps,
    } = useForm({
        initialValues: {
            keyword: '',
            selectedCharacters: [] as CharacterId[],
            selectedCardTypes: [] as string[],
            ownedOnly: false,
            ctMin: '',
            ctMax: '',
            ctShowSp: false,
            effectTypes: [] as SXEffectWithTarget['effect']['typ'][],
            targetTypes: [] as SXEffectWithTarget['target']['typ'][],
            dualA: false,
            initial5Only: false,
        },
        validate: {
            ctMin: (x) =>
                x.trim() !== '' && Number.isNaN(Number(x))
                    ? 'Invalid ctMin'
                    : null,
            ctMax: (x) =>
                x.trim() !== '' && Number.isNaN(Number(x))
                    ? 'Invalid ctMax'
                    : null,
        },
    })

    const skillEffectTypes = useMemo(() => {
        const orders = Object.keys(skillEffectTypeNames)
        return uniq(
            Object.values<SXEffectWithTarget>(SkillxData)
                .map((x) => x.effect.typ)
                .filter((x) => x)
        ).sort((a, b) => orders.indexOf(a) - orders.indexOf(b))
    }, [SkillxData])
    const skillTargetTypes = useMemo(() => {
        const orders = Object.keys(skillTargetTypeNames)
        return uniq(
            Object.values<SXEffectWithTarget>(SkillxData)
                .map((x) => x.target.typ)
                .filter((x) => x)
        ).sort((a, b) => orders.indexOf(a) - orders.indexOf(b))
    }, [SkillxData])

    const [selectedCards, selectedSkills] = useMemo(() => {
        let ret = [...CardData]
        let highlightedSkills: string[] = []

        const {
            keyword,
            selectedCharacters,
            selectedCardTypes,
            ctMin,
            ctMax,
            ctShowSp,
            effectTypes,
            targetTypes,
            dualA,
            ownedOnly,
            initial5Only,
        } = formValues

        const numCtMin = Number.isNaN(Number(ctMin)) ? 0 : Number(ctMin)
        const numCtMax = Number.isNaN(Number(ctMax)) ? 0 : Number(ctMax)

        if (keyword.trim() !== '') {
            ret = ret.filter((x) => x.name.includes(keyword.trim()))
        }

        if (selectedCharacters.length > 0) {
            ret = ret.filter((x) =>
                selectedCharacters.includes(x.characterId as CharacterId)
            )
        }

        if (selectedCardTypes.length > 0) {
            ret = ret.filter((x) => {
                return selectedCardTypes.includes(String(x.type))
            })
        }

        if (initial5Only) {
            ret = ret.filter((card) => card.initialRarity === 5)
        }

        if (ownedOnly) {
            ret = ret.filter((card) => {
                const cardCcid = (
                    CCIDTable[card.characterId as CharacterId] ?? []
                ).filter((x) => x.cardId === card.id)?.[0]?.ccid
                // Card does not exist in CCIDDB
                // TODO: find a way to improve
                if (!cardCcid) return true
                return localBox?.[card.characterId as CharacterId]?.[cardCcid]
            })
        }

        ret = ret.filter((card) => {
            const cardSkillIds = [card.skillId1, card.skillId2, card.skillId3]
            const cardSkills = cardSkillIds
                .map((x) => SkillAllData.filter((r) => r.id === x)?.[0])
                .filter((x) => x)
            if (cardSkills.length < 3) {
                // Some skills are not found
                // TODO: find a way to improve
                return true
            }
            if (
                dualA &&
                cardSkills.filter(
                    (x) => x.categoryType === SkillCategoryType.Active
                ).length < 2
            ) {
                return false
            }
            const hasSkillFilters =
                numCtMin > 0 ||
                numCtMax > 0 ||
                effectTypes.length > 0 ||
                targetTypes.length > 0
            const selectedSkills = cardSkills.filter((sk) => {
                // Only check the highest level for now
                const skillHighestLevel = sk.levels[sk.levels.length - 1]
                // ctMin and ctMax
                if (numCtMin > 0) {
                    if (
                        // For SP, coolTime is 0 so we use ||
                        (skillHighestLevel.coolTime || -1) < numCtMin &&
                        !(
                            ctShowSp &&
                            sk.categoryType === SkillCategoryType.Special
                        )
                    )
                        return false
                }
                if (numCtMax > 0) {
                    if (
                        // For SP, coolTime is 0 so we use ||
                        (skillHighestLevel.coolTime || Infinity) > numCtMax &&
                        !(
                            ctShowSp &&
                            sk.categoryType === SkillCategoryType.Special
                        )
                    )
                        return false
                }
                if (effectTypes.length > 0) {
                    if (
                        skillHighestLevel.skillDetails
                            .map((r) => r.efficacyId)
                            .map((r) => SkillxData[r])
                            .filter(
                                (r) => r && effectTypes.includes(r.effect.typ)
                            ).length === 0
                    )
                        return false
                }
                if (targetTypes.length > 0) {
                    if (
                        skillHighestLevel.skillDetails
                            .map((r) => r.efficacyId)
                            .map((r) => SkillxData[r])
                            .filter(
                                (r) => r && targetTypes.includes(r.target.typ)
                            ).length === 0
                    )
                        return false
                }
                return true
            })
            if (selectedSkills.length === 0) return false
            if (hasSkillFilters) {
                highlightedSkills = highlightedSkills.concat(
                    selectedSkills.map((x) => x.id)
                )
            }
            return true
        })

        return [ret, highlightedSkills]
    }, [CardData, SkillAllData, SkillxData, formValues, localBox])

    return (
        <>
            <p>
                {$t.rich('notice_mybox', {
                    link: (c) => (
                        <Link href="/settings">{(c as ReactNode[])[0]}</Link>
                    ),
                })}
            </p>
            <div className="mt-2 rounded-md border-solid border-6 border-sky-500 p-2">
                <div className="flex items-center mb-2">
                    <TextInput
                        className="mr-2"
                        label={$t('Keyword')}
                        {...getInputProps('keyword')}
                    />
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
                            1: $v('Appeal'),
                            2: $v('Technique'),
                            3: $v('Support'),
                        }}
                        width={300}
                        formProps={getInputProps('selectedCardTypes')}
                    />
                    <Checkbox
                        className="mr-2"
                        label={$t('show_only_owned')}
                        {...getInputProps('ownedOnly')}
                    />
                    <Checkbox
                        label={$t('show_only_rare')}
                        {...getInputProps('initial5Only')}
                    />
                </div>
                <div className="flex items-center mb-2">
                    <NumberInput
                        className="mr-2"
                        label={$t('Minimum CT')}
                        placeholder={$t('Unlimited')}
                        min={0}
                        {...getInputProps('ctMin')}
                    />
                    <NumberInput
                        className="mr-2"
                        label={$t('Maximum CT')}
                        placeholder={$t('Unlimited')}
                        min={0}
                        {...getInputProps('ctMax')}
                    />
                    <Checkbox
                        label={$t('no_skip_sp_on_ctfilter')}
                        className="mr-2"
                        {...getInputProps('ctShowSp')}
                    />
                    <Tooltip label={$t('no_skip_sp_on_ctfilter_desc')}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </Tooltip>
                </div>
                <div className="flex items-center mb-2">
                    <FilterSelect
                        className="mr-2"
                        label={
                            <span>
                                {$t('Skill type')}{' '}
                                <Link href={Paths.wiki('技能说明')}>
                                    {$t('skill_type_desc')}
                                </Link>
                            </span>
                        }
                        multiple
                        list={skillEffectTypes}
                        listNamemap={skillEffectTypeNames}
                        width={300}
                        formProps={getInputProps('effectTypes')}
                    />
                    <FilterSelect
                        className="mr-2"
                        label={$t('Target type')}
                        multiple
                        list={skillTargetTypes}
                        listNamemap={skillTargetTypeNames}
                        width={300}
                        formProps={getInputProps('targetTypes')}
                    />
                    <Checkbox
                        label={$t('Dual A skills')}
                        className="mr-2"
                        {...getInputProps('dualA')}
                    />
                </div>
            </div>
            <div className="mt-2">
                {selectedCards.length === CardData.length ? (
                    <p>{$t('card_total', { num: CardData.length })}</p>
                ) : (
                    <p>
                        {$t('card_filtered', {
                            total: CardData.length,
                            num: selectedCards.length,
                        })}
                    </p>
                )}
            </div>
            <div className="mt-2">
                <ResultList
                    list={selectedCards}
                    highlightedSkills={selectedSkills}
                    SkillAllData={SkillAllData}
                />
            </div>
        </>
    )
}

const SkeletonSearchPage = () => {
    const $t = useTranslations('search')

    const { data: CardData } = useApi('Card')
    const { data: SkillAllData } = useApi('Skill/All')
    const { data: SkillxData } = useApi('Skill/X')

    const allData = {
        CardData,
        SkillAllData,
        SkillxData,
    }

    return (
        <>
            <Title title={$t('Card search')} />
            {allFinished(allData) ? (
                <SearchPage {...allData} />
            ) : (
                <PageLoading data={allData} />
            )}
        </>
    )
}

export const getStaticProps = getI18nProps(['search', 'vendor', 'v-chr'])

export default SkeletonSearchPage
