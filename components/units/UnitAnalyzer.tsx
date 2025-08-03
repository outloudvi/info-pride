import { Alert } from '@mantine/core'
import type { Skill } from 'hoshimi-types/ProtoMaster'
import type { MusicChart } from 'hoshimi-types/types'
import _range from 'lodash/range'
import { useTranslations } from 'next-intl'

import type { CardTiny, MusicChartItem } from './types'
import lint from './lint'

import useApi from '#utils/useApi'
import Paths from '#utils/paths'
import { notUndefined } from '#utils/nonEmpty'

const UnitAnalyzer = ({
    unitCards,
    chart,
    skills,
}: {
    unitCards: CardTiny[]
    chart: MusicChart
    skills: Skill[]
}) => {

    const $t = useTranslations('units')
    const TRACK_DESC = [undefined, $t('Middle'), $t('Middle Left'), $t('Middle Right'), $t('Most Left'), $t('Most Right')]

    return (
        <>
            {_range(5)
                .map((x) => x + 1)
                .map((_key) => {
                    const card = unitCards[_key - 1]
                    const lintResult = lint(
                        [card.skillId1, card.skillId2, card.skillId3]
                            .map((x) => skills.find((sk) => sk.id === x))
                            .filter(notUndefined),
                        chart.chart[_key as 1 | 2 | 3 | 4 | 5],
                        $t("Normal")
                    )

                    const maxSeverity = Math.max(
                        0,
                        ...lintResult.map((x) => x.severity)
                    )

                    return (
                        <Alert
                            title={$t("Track Simulation Result", {
                                trackNumber: _key,
                                trackDesc: TRACK_DESC[_key],
                                cardName: card.name,
                            })}
                            color={
                                maxSeverity === 3
                                    ? 'red'
                                    : maxSeverity === 2
                                    ? 'yellow'
                                    : 'blue'
                            }
                            className="my-1"
                            key={_key}
                        >
                            <ul>
                                {lintResult.map((msg, __key) => (
                                    <li
                                        key={__key}
                                        className={
                                            msg.severity === 3
                                                ? 'font-bold'
                                                : ''
                                        }
                                    >
                                        {$t(msg.text, {
                                            trackNum: msg.trackNum,
                                        })}
                                    </li>
                                ))}
                            </ul>
                        </Alert>
                    )
                })}
        </>
    )
}

const UnitAnalyzerDownloader = ({
    unitCards,
    musicChart,
}: {
    unitCards: CardTiny[]
    musicChart: MusicChartItem
}) => {
    const $c = useTranslations('common')

    const { data: ChartData, isFetched: ChartDataFetched } = useApi(
        'MusicChart',
        {
            chartId: musicChart.id,
        }
    )
    const { data: SkillData, isFetched: SkillDataFetched } = useApi(`Skill`, {
        ids: unitCards
            .map((x) => [x.skillId1, x.skillId2, x.skillId3].join(','))
            .join(','),
    })

    if (!ChartDataFetched || !SkillDataFetched) {
        return (
            <Alert title={$c('loading')} color="yellow">
                {$c('loading')}
                <ul>
                    <li>谱面数据 {ChartDataFetched ? '✅' : '⌛'}</li>
                    <li>技能数据 {SkillDataFetched ? '✅' : '⌛'}</li>
                </ul>
            </Alert>
        )
    }

    if (!ChartData) {
        return (
            <Alert title="数据获取出错" color="yellow">
                无效的谱面数据。请在 <a href={Paths.repoIssue()}>issue</a>{' '}
                报告问题。
            </Alert>
        )
    }

    if (!SkillData) {
        return (
            <Alert title="数据获取出错" color="yellow">
                无效的技能数据。请在 <a href={Paths.repoIssue()}>issue</a>{' '}
                报告问题。
            </Alert>
        )
    }

    return (
        <UnitAnalyzer
            unitCards={unitCards}
            chart={ChartData}
            skills={SkillData}
        />
    )
}

const UnitAnalyzerWrapper = ({
    unitCards,
    musicChart,
}: {
    unitCards: (CardTiny | null)[]
    musicChart: MusicChartItem
}) => {

    const $t = useTranslations('units')
    if (unitCards.slice(1, 6).filter((x) => x === null).length !== 0) {
        return <Alert title={$t('Team Not Complete')} color="red"></Alert>
    }

    // TODO: fix it typescript-ly
    return (
        <UnitAnalyzerDownloader
            unitCards={unitCards.slice(1, 6) as CardTiny[]}
            musicChart={musicChart}
        />
    )
}

export default UnitAnalyzerWrapper
