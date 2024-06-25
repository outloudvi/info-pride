import { Group, Progress, Tooltip } from '@mantine/core'
import dayjs from 'dayjs'
import { getTranslations } from 'next-intl/server'

import GachaPickupList from './GachaPickupList'

import AssetImage from '#components/AssetImage'
import { fetchApi } from '#utils/fetchApi'
import { ExtendedDateFormat, SOURCE_TIMEZONE } from '#utils/constants'

const CurrentGachas = async () => {
    const $t = await getTranslations('index')

    const now = Number(new Date())
    const gachas = (await fetchApi('Gacha')).filter(
        (x) => now > Number(x.nowAfter) && now < Number(x.nowBefore),
    )

    return (
        <Group wrap="nowrap" align="flex-start" className="overflow-x-auto">
            {gachas.map((x, key) => {
                const {
                    name,
                    bannerAssetId,
                    nowAfter,
                    nowBefore,
                    pickupCards,
                } = x
                const startDate = dayjs(Number(nowAfter)).tz(SOURCE_TIMEZONE)
                const endDate = dayjs(Number(nowBefore)).tz(SOURCE_TIMEZONE)
                const localTimeString = `${$t('local_time')} ${startDate
                    .local()
                    .format(ExtendedDateFormat)} - ${endDate
                    .local()
                    .format(ExtendedDateFormat)}`
                return (
                    <div key={key}>
                        <AssetImage
                            name={`img_banner_l_${bannerAssetId}`}
                            ratio={3}
                            height="100px"
                            alt={`Banner for ${name}`}
                        />
                        <div className="my-1">
                            <b>{name}</b>
                        </div>
                        <div className="my-1">
                            <Tooltip label={localTimeString}>
                                <Progress
                                    value={
                                        100 *
                                        ((now - Number(nowAfter)) /
                                            (Number(nowBefore) -
                                                Number(nowAfter)))
                                    }
                                    aria-label={localTimeString}
                                />
                            </Tooltip>
                        </div>
                        <GachaPickupList pickupCards={pickupCards} />
                    </div>
                )
            })}
        </Group>
    )
}

export default CurrentGachas
