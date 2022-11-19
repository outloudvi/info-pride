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

const NoticeItem = ({ nKey, unit }: { nKey: string; unit: NoticeUnit }) => {
    const $t = useTranslations('notice')
    const [showKey, setShowKey] = useLocalStorage({
        key: nKey,
        defaultValue: 'false',
        serialize: (v) => v,
        deserialize: (v) => v,
    })
    const doNotShow = showKey === 'true'

    return !doNotShow ? (
        <div key={nKey}>
            {unit(() => {
                setShowKey('true')
            }, $t)}
        </div>
    ) : (
        <div key={nKey} className="hidden"></div>
    )
}

const NoticeTop = () => {
    useEffect(() => {
        const ls = window.localStorage
        if (!ls) return
        ls.removeItem('220803-Notice-Closed')
        ls.removeItem('220914-boltrend')
    }, [])

    return (
        <div>
            {Object.entries(GlobalNotices).map(([nKey, unit], index) => (
                <NoticeItem key={index} nKey={nKey} unit={unit} />
            ))}
        </div>
    )
}

export default NoticeTop
