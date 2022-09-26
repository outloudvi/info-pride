import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useEffect } from 'react'

type NoticeUnit = (x: () => void) => JSX.Element

const GlobalNotices: Record<string, NoticeUnit> = {
    '220914-boltrend': () => (
        <Alert
            icon={<FontAwesomeIcon icon={faInfoCircle} />}
            color="orange"
            title="IDOLY PRIDE 的其它地区版本 / IDOLY PRIDE versions for other regions"
        >
            由 Boltrend Games 运营的 IDOLY PRIDE 国际版本
            <a
                href="https://twitter.com/idolypride_en/status/1569936518722060288"
                rel="nofollow noopener"
            >
                曾经进行过内测
            </a>
            ，而 Neowiz 也在运营
            <a href="https://idolypride.pmang.cloud/" rel="noopener nofollow">
                一个韩国版本
            </a>
            。请注意 info-pride
            目前的信息只跟随日本服务器更新，因此内容可能和国际版本或韩国版本不一致。
            <details>
                <summary>(English version)</summary>
                The global version of IDOLY PRIDE, published by Boltrend Games{' '}
                <a
                    href="https://twitter.com/idolypride_en/status/1569936518722060288"
                    rel="nofollow noopener"
                >
                    was in Closed Beta Test
                </a>
                . Also, Neowiz has published{' '}
                <a
                    href="https://idolypride.pmang.cloud/"
                    rel="noopener nofollow"
                >
                    a Korean version of IDOLY PRIDE
                </a>
                . Please note that data of info-pride is currently only
                following the Japanese server. Therefore, contents may differ
                with the global or the Korean version.
            </details>
        </Alert>
    ),
}

const NoticeItem = ({ nKey, unit }: { nKey: string; unit: NoticeUnit }) => {
    const [showKey, setShowKey] = useLocalStorage({
        key: nKey,
        defaultValue: 'false',
        serialize: (v) => v,
        deserialize: (v) => v,
    })
    const doNotShow = showKey === 'true'

    useEffect(() => {
        if (!window.localStorage) return
        window.localStorage.removeItem('220803-Notice-Closed')
    }, [])

    return !doNotShow ? (
        <div>
            {unit(() => {
                setShowKey('true')
            })}
        </div>
    ) : (
        <div className="hidden"></div>
    )
}

const NoticeTop = () => (
    <div>
        {Object.entries(GlobalNotices).map(([nKey, unit], index) => (
            <NoticeItem key={index} nKey={nKey} unit={unit} />
        ))}
    </div>
)

export default NoticeTop
