import { faFeather, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Button } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

type NoticeUnit = (x: () => void) => JSX.Element

const GlobalNotices: Record<string, NoticeUnit> = {
    '220831-Miku': (_) => (
        <Alert
            icon={<FontAwesomeIcon icon={faFeather} />}
            color="cyan"
            title="初音ミク联动活动开始！"
        >
            由烏屋茶房作词，八王子P 与 kz 作曲，TRINITYAiLE
            与初音ミク演唱的新曲《Magical Melody》正在活动中出现！
            <a
                href="https://www.bilibili.com/video/av472450564"
                target="_blank"
                rel="noreferrer noopener"
            >
                <Button size="xs" color="cyan" variant="gradient">
                    试听曲目！
                </Button>
            </a>
        </Alert>
    ),
    '220803-Notice-Closed': (close) => (
        <Alert
            icon={<FontAwesomeIcon icon={faInfoCircle} />}
            color="orange"
            title="我们正在更新网站架构 / We're updating the website infrastructure"
            onClose={close}
            withCloseButton
            className="mt-2"
        >
            我们正在将 API 服务器
            <a href="https://github.com/MalitsPlus/IDOLY-Backend/pull/2">
                从 Cloudflare Workers 迁移到 Deno
            </a>
            。因此，新的 API
            服务可能出现可用性或数据完整性问题。如果怀疑发生了任何问题，欢迎通过{' '}
            <a href="https://github.com/outloudvi/info-pride/issues">Issues</a>{' '}
            或任何其它方式告知我们。
            <br />
            如果希望回到使用旧 API 服务的版本，请访问
            <a href="https://info-pride-git-feat-workers-outloudvi.vercel.app/">
                此站点
            </a>
            。请注意旧 API 服务的数据目前处于停止更新的状态。
            <br />
            此公告在手动关闭后不会再显示。
            <br />
            <details>
                <summary>(English Version)</summary>
                We are shifting our API service{' '}
                <a href="https://github.com/MalitsPlus/IDOLY-Backend/pull/2">
                    from Cloudflare Workers to Deno
                </a>
                . Therefore, the new service might suffer from useability or
                data integrity problems. If there are any problems suspected,
                please don&apos;t hesitate to contact us via{' '}
                <a href="https://github.com/outloudvi/info-pride/issues">
                    Issues
                </a>{' '}
                or other channels.
                <br />
                If you wish to use the site with the old API service, please
                check{' '}
                <a href="https://info-pride-git-feat-workers-outloudvi.vercel.app/">
                    here
                </a>
                . Please be noted that updates for the old API service are
                currently paused.
                <br />
                This notice will not be shown again after closing it.
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
