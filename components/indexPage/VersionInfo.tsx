import day from 'dayjs'
import { Badge } from '@mantine/core'
import { getTranslations } from 'next-intl/server'

import { getVersion } from '#components/api/version'
import { Meta as WikiPagesMeta } from '#data/wikiPages'
import { Meta as WikiModulesMeta } from '#data/wikiModules'
import { fetchApi } from '#utils/fetchApi'

const VersionInfo = async () => {
    const VersionData = await fetchApi('Version')
    const GameVersionData = await getVersion()
    const $t = await getTranslations('index')

    const backendVersion = day(VersionData.version).format('YYYY/MM/DD')
    const wikiModuleVersion = day(WikiModulesMeta.updatedAt * 1000).format(
        'YYYY/MM/DD',
    )
    const wikiPageVersion = day(WikiPagesMeta.updatedAt * 1000).format(
        'YYYY/MM/DD',
    )

    const lines = {
        [$t('Backend')]: backendVersion,
        [$t('Bwiki modules')]: wikiModuleVersion,
        [$t('Bwiki pages')]: wikiPageVersion,
    }

    return (
        <>
            <div>
                {Object.entries(lines).map(([k, v], key) => (
                    <div key={key}>
                        {k} <Badge>{v}</Badge> <br />
                    </div>
                ))}
            </div>

            <div className="mt-2">
                {GameVersionData ? (
                    <div>
                        {$t('Game version')}{' '}
                        <Badge color="green">
                            {GameVersionData.versionDisplay}
                        </Badge>
                        <br />
                        {$t('Update date')}{' '}
                        <Badge color="green">
                            {day(GameVersionData.releaseDate).format(
                                'YYYY/MM/DD',
                            )}
                        </Badge>
                    </div>
                ) : (
                    <div className="text-gray-500">
                        {$t('version_info_loading')}
                    </div>
                )}
            </div>
        </>
    )
}

export default VersionInfo
