import { DatePickerInput } from '@mantine/dates'
import { Alert, Button, Grid } from '@mantine/core'
import dayjs from 'dayjs'
import { atomWithHash } from 'jotai-location'
import { useAtom } from 'jotai'
import { useLayoutEffect } from 'react'
import { useTranslations } from 'next-intl'

import Title from '#components/Title'
import AssetImage from '#components/AssetImage'
import getI18nProps from '#utils/getI18nProps'

const START_DATE = dayjs('2016-05-05')
const END_DATE = dayjs('2017-12-26')

const VALID_DATE_LIST = [
    '0-56',
    '58-58',
    '61-139',
    '141-191',
    '194-199',
    '202-204',
    '206-207',
    '213-213',
    '216-216',
    '220-236',
    '239-241',
    '243-243',
    '246-252',
    '259-268',
    '270-270',
    '273-274',
    '276-278',
    '280-280',
    '282-282',
    '285-285',
    '287-287',
    '290-293',
    '298-298',
    '301-305',
    '309-309',
    '312-316',
    '320-331',
    '333-333',
    '336-337',
    '341-343',
    '348-348',
    '351-351',
    '356-357',
    '359-366',
    '369-371',
    '374-374',
    '378-379',
    '382-382',
    '384-384',
    '386-386',
    '389-389',
    '393-393',
    '396-400',
    '405-405',
    '407-410',
    '413-415',
    '418-419',
    '422-422',
    '425-426',
    '437-451',
    '454-456',
    '460-460',
    '462-465',
    '468-468',
    '471-471',
    '474-488',
    '493-493',
    '495-495',
    '497-498',
    '501-502',
    '506-506',
    '510-510',
    '512-522',
    '524-524',
    '530-533',
    '538-566',
    '569-569',
    '571-576',
    '578-583',
    '585-590',
    '592-600',
]

const toShortDate = (date: Date) =>
    `${String(date.getFullYear()).slice(2)}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

const fromShortDate = (s: string | null) =>
    s === null ? new Date(0) : new Date('20' + s)

const isValidDate = (s: string) => {
    const thatDay = dayjs('20' + s)
    const dayDiff = thatDay.diff(START_DATE, 'day')
    for (const i of VALID_DATE_LIST) {
        const [dayFrom, dayTo] = i.split('-').map(Number)
        if (dayDiff > dayTo) continue
        return dayFrom <= dayDiff
    }
    return false
}

const shortDateAtom = atomWithHash('date', new Date(0), {
    serialize: toShortDate,
    deserialize: fromShortDate,
})

const DiaryPage = () => {
    const $c = useTranslations('common')
    const $t = useTranslations('diary')

    const [currDate, setCurrDate] = useAtom(shortDateAtom)
    const isValid = isValidDate(toShortDate(currDate))

    useLayoutEffect(() => {
        setCurrDate(END_DATE.toDate())
    }, [setCurrDate])

    return (
        <>
            <Title title={$t('mana_diary')} />
            <Alert color="pink">{$t('mana_diary_not_updating')}</Alert>
            <Grid gutter={20} className="my-3">
                <Grid.Col xs={12} lg={8}>
                    <div>
                        <p>
                            {`${$t('included_diary_dates')} ${$t('date_from_to', {START_DATE: toShortDate(START_DATE.toDate()), END_DATE: toShortDate(END_DATE.toDate())})}`}
                        </p>
                        <div>
                            <div className="flex-col">
                                <DatePickerInput
                                    placeholder={$t("choose_a_date")}
                                    label={$t("date")}
                                    required
                                    className="w-72"
                                    value={currDate}
                                    minDate={START_DATE.toDate()}
                                    maxDate={END_DATE.toDate()}
                                    onChange={(e) => {
                                        if (e) setCurrDate(e)
                                    }}
                                    clearButtonProps={{
                                        'aria-label': $c('Clear'),
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <Button
                                className="mr-2"
                                disabled={
                                    toShortDate(currDate) ===
                                    toShortDate(START_DATE.toDate())
                                }
                                onClick={() => {
                                    const currDay = dayjs(currDate)
                                    setCurrDate(
                                        currDay.subtract(1, 'day').toDate()
                                    )
                                }}
                            >
                                {$t("previous_day")}
                            </Button>
                            <Button
                                disabled={
                                    toShortDate(currDate) ===
                                    toShortDate(END_DATE.toDate())
                                }
                                onClick={() => {
                                    const currDay = dayjs(currDate)
                                    setCurrDate(currDay.add(1, 'day').toDate())
                                }}
                            >
                                {$t("next_day")}
                            </Button>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col xs={12} lg={4}>
                    {isValid ? (
                        <AssetImage
                            name={`img_ui_diary_${toShortDate(currDate)}`}
                            ratio={0.7}
                            width="100%"
                            alt="Diary image"
                        />
                    ) : (
                        <p>{$t('no_diary')}</p>
                    )}
                </Grid.Col>
            </Grid>
        </>
    )
}

export const getStaticProps = getI18nProps(['common', 'diary'])
export default DiaryPage
