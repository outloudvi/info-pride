import { Alert } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

type NoticeUnit = (x: () => void, y: (s: string) => string) => JSX.Element

const GlobalNotices: Record<string, NoticeUnit> = {
    '230405-intl': (off, $t) => (
        <Alert
            color="blue"
            title={$t('230405-title')}
            withCloseButton
            onClose={off}
            closeButtonLabel={$t('btn_close')}
        >
            <a
                href="https://twitter.com/IDOLYG_official"
                rel="noopener nofollow"
            >
                Twitter (English)
            </a>{' '}
            /{' '}
            <a href="https://twitter.com/IDOLYPRIDE_TW" rel="noopener nofollow">
                Twitter（繁体中文）
            </a>{' '}
            /{' '}
            <a
                href="https://play.google.com/store/apps/details?id=com.neowiz.game.idolypride.en"
                rel="noopener nofollow"
            >
                Google Play (English)
            </a>{' '}
            /{' '}
            <a
                href="https://play.google.com/store/apps/details?id=com.neowiz.game.idolypride.tw"
                rel="noopener nofollow"
            >
                Google Play（繁体中文）
            </a>
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
        ls.removeItem('221218-kanda')
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
