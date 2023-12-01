import { Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core'
import { useTranslations } from 'next-intl'

import InGameNotice from './InGameNotice'
import SiteNotice from './SiteNotice'

const Notice = () => {
    const $t = useTranslations('index')

    return (
        <Tabs defaultValue="announcement">
            <TabsList>
                <TabsTab value="announcement">{$t('Website news')}</TabsTab>
                <TabsTab value="ingame">{$t('Announcement')}</TabsTab>
                <TabsTab value="bugs">{$t('Issues')}</TabsTab>
                <TabsTab value="pr">{$t('PR')}</TabsTab>
            </TabsList>
            <TabsPanel value="announcement">
                <SiteNotice />
            </TabsPanel>
            <TabsPanel value="ingame">
                <InGameNotice type="notices" />
            </TabsPanel>
            <TabsPanel value="bugs">
                <InGameNotice type="malfunctionNotices" />
            </TabsPanel>
            <TabsPanel value="pr">
                <InGameNotice type="prNotices" />
            </TabsPanel>
        </Tabs>
    )
}

export default Notice
