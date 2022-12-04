import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import lfToBr from '#utils/lfToBr'

type NoticeUnit = (x: () => void, y: (s: string) => string) => JSX.Element

const GlobalNotices: Record<string, NoticeUnit> = {
    '221105-mirai': (off, $t) => (
        <Alert
            icon={<FontAwesomeIcon icon={faInfoCircle} />}
            color="cyan"
            title={$t('221105-title')}
            withCloseButton
            onClose={off}
            closeButtonLabel={$t('btn_close')}
        >
            {lfToBr($t('221105-desc'))}
            <p>
                <a
                    href="https://idolypride.jp/news/2022/10/27/2127/"
                    rel="noopener nofollow"
                >
                    {$t('221105-link')}
                </a>
            </p>
        </Alert>
    ),
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
        deserialize: (v) => v,
    })

    return hideKey !== 'true' ? (
        <div>
            {unit(() => {
                setHideKey('true')
            }, t)}
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
        ls.removeItem('220803-Notice-Closed')
        ls.removeItem('220914-boltrend')
    }, [])

    return (
        <div>
            {Object.entries(GlobalNotices).map(([nKey, unit], index) => (
                <NoticeItem key={index} nKey={nKey} unit={unit} t={$t} />
            ))}
        </div>
    )
}

export default NoticeTop
