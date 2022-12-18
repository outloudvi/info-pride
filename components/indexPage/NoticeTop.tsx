import { Alert } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import lfToBr from '#utils/lfToBr'

type NoticeUnit = (x: () => void, y: (s: string) => string) => JSX.Element

const GlobalNotices: Record<string, NoticeUnit> = {
    '221218-kanda': (off, $t) => (
        <Alert
            color="gray"
            title={$t('221218-title')}
            withCloseButton
            onClose={off}
            closeButtonLabel={$t('btn_close')}
        >
            {lfToBr($t('221218-desc'))}
            <p>
                <a
                    href="https://www.ponycanyon.co.jp/music/PCCA000006164"
                    rel="noopener nofollow"
                >
                    {$t('221218-link')}
                </a>{' '}
                /{' '}
                <a
                    href="https://www.youtube.com/watch?v=-GQQW7fiujw"
                    rel="noopener nofollow"
                >
                    {$t('221218-video')}
                </a>{' '}
                /{' '}
                <a
                    href="https://open.spotify.com/album/4b9yufB1czOPML40w0LUyc"
                    rel="noopener nofollow"
                >
                    {$t('221218-spotify')}
                </a>{' '}
                /{' '}
                <a
                    href="https://music.apple.com/jp/album/liberty-memorial/1657121580"
                    rel="noopener nofollow"
                >
                    {$t('221218-apple-music')}
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
        ls.removeItem('221105-boltrend')
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
