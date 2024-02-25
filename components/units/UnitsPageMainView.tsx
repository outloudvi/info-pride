'use client'

import { useCallback, useEffect, useState } from 'react'
import {
    Alert,
    Button,
    Collapse,
    Divider,
    Grid,
    Group,
    Modal,
    NativeSelect,
    Skeleton,
    TextInput,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import type { SearchParams } from './sp'

import useApi from '#utils/useApi'
import CardIdData from '#data/ccid'
import type { APIResponseOf } from '#utils/api'
import unitCodeV1 from '#utils/unitCode'
import type { CardTiny, MusicChartItem } from '#components/units/types'
import UnitPosition from '#components/units/UnitPosition'
import UnitAnalyzer from '#components/units/UnitAnalyzer'
import UnitNotemap from '#components/units/UnitNotemap'
import TrackColorSelect from '#components/notemap/TrackColorSelect'
import useSetSearchParams from '#utils/useSetSearchParams'

const UnitsPageMainView = ({
    CardData,
    ChartListData,
}: {
    CardData: APIResponseOf<'Card'>
    ChartListData: APIResponseOf<'MusicChartList'>
}) => {
    const $t = useTranslations('units')

    const musicChartList: MusicChartItem[] = ChartListData.map((x) =>
        x.charts.map((r) => ({
            ...r,
            songTitle: x.title,
        })),
    ).reduce((a, b) => [...a, ...b])

    const searchParams = useSearchParams()
    const { setSearch } = useSetSearchParams<SearchParams>()
    const unitId = searchParams.get('u') ?? ''
    const chartId = searchParams.get('chart') ?? musicChartList[0].id

    const selectedMusicChart = musicChartList.find(
        (x) => x.id === chartId,
    ) as MusicChartItem

    const { data: ChartData } = useApi('MusicChart', {
        chartId: selectedMusicChart.id,
    })

    // 6 positions (0 and 1-5)
    // (unitCards[0] should be always empty)
    const [unitCards, setUnitCards] = useState<(CardTiny | null)[]>([
        null,
        null,
        null,
        null,
        null,
        null,
    ])

    const setPositionCard = useCallback(
        (pos: number) => (card: CardTiny) => {
            setUnitCards((r) => [...r.slice(0, pos), card, ...r.slice(pos + 1)])
        },
        [setUnitCards],
    )

    useEffect(() => {
        const cardList = unitCards.slice(1)
        if (cardList.filter((x) => x).length !== 5) return
        setSearch(
            'u',
            unitCodeV1.encode(cardList as NonNullable<CardTiny[]>, CardIdData),
        )
    }, [unitCards, setSearch])

    const [modalImportUnit, setModalImportUnit] = useState(false)
    const [importUnitId, setImportUnitId] = useState('')
    const [showNotemap, setShowNotemap] = useState(false)

    const [laneColors, setLaneColors] = useState<string[]>([
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
    ])

    const importUnitCode = useCallback(
        (unitId: string) => {
            let result = null
            try {
                result = unitCodeV1.decode(unitId, CardIdData)
            } catch (e) {
                //
            }
            if (result === null) {
                showNotification({
                    title: `错误的队伍编码：${unitId}`,
                    message: '此编码无效，或来自更新版本的 INFO PRIDE。',
                    color: 'red',
                })
                return
            }
            setUnitCards([
                null,
                ...result.map((x) => CardData.find((y) => y.id === x) ?? null),
            ])
            showNotification({
                title: '导入了队伍。',
                message: '队伍编码导入成功。',
                color: 'green',
            })
            setModalImportUnit(false)
        },
        [CardData],
    )

    useEffect(() => {
        // Import unitId in query
        if (unitId && unitCards[1] === null) {
            importUnitCode(unitId)
        }
    }, [importUnitCode, unitId, unitCards])

    return (
        <>
            <Modal
                opened={modalImportUnit}
                onClose={() => setModalImportUnit(false)}
                title="导入队伍编码"
                closeButtonProps={{
                    'aria-label': 'Close',
                }}
            >
                <p className="p-2">
                    队伍编码可以表示一个五人队伍的卡组及站位，但不包含等级或技能信息。{' '}
                    <br />
                    它应该以 1P- 开头。
                </p>
                <TextInput
                    placeholder="1P-..."
                    label="队伍编码"
                    onChange={(e) => {
                        setImportUnitId(e.target.value)
                    }}
                    required
                />
                <Button
                    className="mt-2"
                    onClick={() => {
                        importUnitCode(importUnitId)
                    }}
                >
                    导入
                </Button>
            </Modal>
            <Alert className="mb-2">
                {$t.rich('check_out_sakura_love', {
                    a: (c) => <a href="https://ipr.vibbit.me/">{c}</a>,
                })}
            </Alert>
            <Grid gutter={20}>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <div className="mb-2">
                        <NativeSelect
                            label="选择谱面"
                            data={musicChartList.map((x) => ({
                                value: x.id,
                                label: `${x.songTitle} - ${x.desc}`,
                            }))}
                            value={chartId}
                            onChange={(e) => {
                                setSearch('chart', e.currentTarget.value)
                            }}
                            required
                        />
                    </div>
                    <Group>
                        <div className="grow">
                            队伍编码：
                            {unitId
                                ? unitId.includes('!')
                                    ? '（部分新卡片在 ccid 数据库中不存在，暂时无法生成编码。）'
                                    : unitId
                                : '（请先选择所有位置的卡片。）'}
                        </div>
                        <Button
                            onClick={() => {
                                setModalImportUnit(true)
                            }}
                        >
                            导入队伍编码
                        </Button>
                    </Group>
                    <div className="grid grid-cols-5 gap-x-2 gap-y-1 mt-3">
                        {[4, 2, 1, 3, 5].map((position, key) => (
                            <UnitPosition
                                key={key}
                                col={key + 1}
                                position={position}
                                card={unitCards[position]}
                                setCard={setPositionCard(position)}
                                cardList={CardData}
                            />
                        ))}
                    </div>
                    <div className="mt-2">
                        <TrackColorSelect
                            laneColors={laneColors}
                            setLaneColors={setLaneColors}
                        />
                    </div>
                    <Divider className="my-2" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <UnitAnalyzer
                        unitCards={unitCards}
                        musicChart={selectedMusicChart}
                    />
                    <Button
                        className="my-2"
                        onClick={() => {
                            setShowNotemap((x) => !x)
                        }}
                    >
                        {showNotemap ? '隐藏曲谱' : '显示曲谱'}
                    </Button>
                    {ChartData ? (
                        <Collapse in={showNotemap}>
                            <UnitNotemap
                                chart={ChartData}
                                unitCards={unitCards}
                                laneColors={laneColors}
                            />
                        </Collapse>
                    ) : (
                        <Skeleton height={200} />
                    )}
                </Grid.Col>
            </Grid>
        </>
    )
}

export default UnitsPageMainView
