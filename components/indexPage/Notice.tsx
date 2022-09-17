import { Tabs } from '@mantine/core'
import { useTranslations } from 'next-intl'

import InGameNotice from './InGameNotice'
import SiteNotice from './SiteNotice'

const Notice = () => {
    const $t = useTranslations('index')

    return (
        <Tabs defaultValue="announcement">
            <Tabs.List>
                <Tabs.Tab value="announcement">{$t('Website news')}</Tabs.Tab>
                <Tabs.Tab value="ingame">{$t('Announcement')}</Tabs.Tab>
                <Tabs.Tab value="bugs">{$t('Issues')}</Tabs.Tab>
                <Tabs.Tab value="pr">{$t('PR')}</Tabs.Tab>
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
}

export default Notice
