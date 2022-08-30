import { Tabs } from '@mantine/core'

import InGameNotice from './InGameNotice'
import SiteNotice from './SiteNotice'

const Notice = () => (
    <Tabs defaultValue="announcement">
        <Tabs.List>
            <Tabs.Tab value="announcement">网站公告</Tabs.Tab>
            <Tabs.Tab value="ingame">游戏公告</Tabs.Tab>
            <Tabs.Tab value="bugs">问题报告</Tabs.Tab>
            <Tabs.Tab value="pr">公关消息</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="announcement">
            <SiteNotice />
        </Tabs.Panel>
        <Tabs.Panel value="ingame">
            <InGameNotice type="notices" />
        </Tabs.Panel>
        <Tabs.Panel value="bugs">
            <InGameNotice type="malfunctionNotices" />
        </Tabs.Panel>
        <Tabs.Panel value="pr">
            <InGameNotice type="prNotices" />
        </Tabs.Panel>
    </Tabs>
)

export default Notice
