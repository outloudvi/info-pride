import { Tabs } from '@mantine/core'

import InGameNotice from './InGameNotice'
import SiteNotice from './SiteNotice'

const Notice = () => (
    <Tabs>
        <Tabs.Tab label="网站公告">
            <SiteNotice />
        </Tabs.Tab>
        <Tabs.Tab label="游戏公告">
            <InGameNotice type="notices" />
        </Tabs.Tab>
        <Tabs.Tab label="问题报告">
            <InGameNotice type="malfunctionNotices" />
        </Tabs.Tab>
        <Tabs.Tab label="公关消息">
            <InGameNotice type="prNotices" />
        </Tabs.Tab>
    </Tabs>
)

export default Notice
