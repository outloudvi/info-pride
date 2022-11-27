import { useEffect, useState } from 'react'
import { Grid, NativeSelect } from '@mantine/core'
import { useTranslations } from 'next-intl'

import useApi from '#utils/useApi'
import type { APIResponseOf, UnArray } from '#utils/api'
import allFinished from '#utils/allFinished'
import PageLoading from '#components/PageLoading'
import Title from '#components/Title'
import AssetImage from '#components/AssetImage'
import NotemapView from '#components/notemap/NotemapView'
import TrackColorSelect from '#components/notemap/TrackColorSelect'
import getI18nProps from '#utils/getI18nProps'

const NotemapPage = ({
    ChartListData,
}: {
    ChartListData: APIResponseOf<'MusicChartList'>
}) => {
    const $t = useTranslations('notemap')
    const [song, setSong] = useState<UnArray<typeof ChartListData>>(
        ChartListData[0]
    )
    const chartList = song.charts
    const [chartId, setChartId] = useState<string | null>(null)

    useEffect(() => {
        // update notemap after switching songs
        setChartId(song.charts?.[0]?.id ?? null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [song])

    const [laneColors, setLaneColors] = useState<string[]>([
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
    ])

    return (
        <Grid gutter={20} className="my-3">
            <Grid.Col xs={12} lg={6}>
                <div>
                    <NativeSelect
                        label={$t('Song')}
                        data={ChartListData.map(({ musicId, title }) => ({
                            value: musicId,
                            label: title,
                        }))}
                        value={song.musicId}
                        onChange={(i) => {
                            const chartSongItem = ChartListData.filter(
                                (x) => x.musicId === i.target.value
                            )[0]
                            setSong(chartSongItem)
                        }}
                        required
                    />
                    <NativeSelect
                        label={$t('Notemap')}
                        data={chartList.map(({ id, desc }) => ({
                            label: desc,
                            value: id,
                        }))}
                        value={chartId ?? ''}
                        onChange={(i) => {
                            setChartId(i.target.value)
                        }}
                        required
                    />
                </div>
                <Grid>
                    <Grid.Col xs={12} lg={4}>
                        <div className="m-2">
                            <AssetImage
                                name={`img_music_jacket_${song.assetId}`}
                                ratio={1}
                                alt="Album art"
                            />
                        </div>
                    </Grid.Col>
                    <Grid.Col xs={12} lg={8}>
                        {chartId !== null && (
                            <div className="mt-4">
                                <TrackColorSelect
                                    laneColors={laneColors}
                                    setLaneColors={setLaneColors}
                                />
                            </div>
                        )}
                    </Grid.Col>
                </Grid>
            </Grid.Col>
            <Grid.Col xs={12} lg={6}>
                {chartId !== null && (
                    <NotemapView chartId={chartId} laneColors={laneColors} />
                )}
            </Grid.Col>
        </Grid>
    )
}

const SkeletonNotemapPage = () => {
    const $t = useTranslations('notemap')
    const { data: ChartListData } = useApi('MusicChartList')

    const allData = {
        ChartListData,
    }

    return (
        <>
            <Title title={$t('Notemaps')} />
            {allFinished(allData) ? (
                <NotemapPage {...allData} />
            ) : (
                <PageLoading data={allData} />
            )}
        </>
    )
}

export const getStaticProps = getI18nProps(['notemap'])

export default SkeletonNotemapPage
