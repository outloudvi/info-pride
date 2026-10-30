'use client'

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useTranslations } from 'next-intl'
import { useEffect, useState, type JSX } from 'react'

import lfToBr from '#utils/lfToBr'

type NoticeUnit = (
    x: () => void,
    y: (s: string) => string,
    z: Date,
) => JSX.Element | undefined

const GlobalNotices: Record<string, NoticeUnit> = {
    '261030-eos': (off, $t, date) => {
        const str =
            date < new Date('2026-12-01T00:00:00+09:00')
                ? $t('261030-eos-desc-1')
                : $t('261030-eos-desc-2')
        return (
            <Alert
                icon={<FontAwesomeIcon icon={faInfoCircle} />}
                color="blue"
                title={$t('261030-eos-title')}
                withCloseButton
                onClose={off}
                closeButtonLabel={$t('btn_close')}
            >
                {lfToBr(str)}
            </Alert>
        )
    },
}

const NoticeItem = ({
    nKey,
    unit,
    t,
}: {
    nKey: string
    unit: NoticeUnit
    t: (s: string) => string
}) => {
    const [hideKey, setHideKey] = useLocalStorage({
        key: nKey,
        defaultValue: 'false',
        serialize: (v) => v,
        deserialize: (v) => v!,
    })
    const [now] = useState(new Date())

    return hideKey !== 'true' ? (
        <div>
            {unit(
                () => {
                    setHideKey('true')
                },
                t,
                now,
            )}
        </div>
    ) : (
        <></>
    )
}

const NoticeTop = () => {
    const $t = useTranslations('notice')

    useEffect(() => {
        const ls = window.localStorage
        if (!ls) return
        ls.removeItem('230405-intl')
    }, [])

    return (
        <div className="mb-2">
            {Object.entries(GlobalNotices).map(([nKey, unit], index) => (
                <NoticeItem key={index} nKey={nKey} unit={unit} t={$t} />
            ))}
        </div>
    )
}

export default NoticeTop
