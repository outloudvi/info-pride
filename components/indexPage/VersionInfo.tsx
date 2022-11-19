import day from 'dayjs'
import { Badge } from '@mantine/core'
import { useTranslations } from 'next-intl'

import useApi from '#utils/useApi'
import allFinished from '#utils/allFinished'
import type { APIResponseOf } from '#utils/api'
import { Meta as WikiPagesMeta } from '#data/wikiPages'
import { Meta as WikiModulesMeta } from '#data/wikiModules'
import PageLoading from '#components/PageLoading'
import useFrontendApi from '#utils/useFrontendApi'

const VersionInfo = ({
    VersionData,
}: {
    VersionData: APIResponseOf<'Version'>
}) => {
    const { data: GameVersionData } = useFrontendApi('version')
    const $t = useTranslations('index')

    const backendVersion = day(VersionData.version).format('YYYY/MM/DD')
    const wikiModuleVersion = day(WikiModulesMeta.updatedAt * 1000).format(
        'YYYY/MM/DD'
    )
    const wikiPageVersion = day(WikiPagesMeta.updatedAt * 1000).format(
        'YYYY/MM/DD'
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
                                'YYYY/MM/DD'
                            )}
                        </Badge>
                    </div>
                ) : (
                    <div className="text-gray-500">
                        {$t('Loading game version info.')}
                    </div>
                )}
            </div>
        </>
    )
}

const SkeletonVersionInfo = () => {
    const { data: VersionData } = useApi('Version')

    const allData = {
        VersionData,
    }

    return (
        <>
            {allFinished(allData) ? (
                <VersionInfo {...allData} />
            ) : (
                <PageLoading data={allData} />
            )}
        </>
    )
}

export default SkeletonVersionInfo
