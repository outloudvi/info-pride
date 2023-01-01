import { useLocalStorage } from '@mantine/hooks'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

type NoticeUnit = (x: () => void, y: (s: string) => string) => JSX.Element

const GlobalNotices: Record<string, NoticeUnit> = {}

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
        ls.removeItem('220914-boltrend')
        ls.removeItem('221105-boltrend')
        ls.removeItem('221218-kanda')
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
