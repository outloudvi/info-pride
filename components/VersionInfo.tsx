import day from 'dayjs'
import { Badge } from '@mantine/core'
import useSWR from 'swr'

import useIpSWR from '../utils/useIpSWR'
import allFinished from '../utils/allFinished'
import { APIResponseOf } from '../utils/api'
import { Meta as WikiPagesMeta } from '../data/wikiPages'
import { Meta as WikiModulesMeta } from '../data/wikiModules'
import { VersionInfo } from '../pages/api/version'

import PageLoading from './PageLoading'

const VersionInfo = ({
  VersionData,
  GameVersionData,
}: {
  VersionData: APIResponseOf<'Version'>
  GameVersionData: VersionInfo | null
}) => {
  const backendVersion = day(VersionData.version).format('YYYY/MM/DD')
  const wikiModuleVersion = day(WikiModulesMeta.updatedAt * 1000).format(
    'YYYY/MM/DD'
  )
  const wikiPageVersion = day(WikiPagesMeta.updatedAt * 1000).format(
    'YYYY/MM/DD'
  )

  const lines = {
    后端数据: backendVersion,
    'Wiki 模块数据': wikiModuleVersion,
    'Wiki 页面数据': wikiPageVersion,
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
      {GameVersionData && (
        <div className="mt-2">
          <div>
            游戏版本{' '}
            <Badge color="green">{GameVersionData.versionDisplay}</Badge>
            <br />
            游戏更新日期{' '}
            <Badge color="green">
              {day(GameVersionData.releaseDate).format('YYYY/MM/DD')}
            </Badge>
          </div>
        </div>
      )}
    </>
  )
}

const SkeletonVersionInfo = () => {
  const { data: VersionData } = useIpSWR('Version')
  const { data: GameVersionData } = useSWR<VersionInfo | null>(
    '/api/version',
    (u) => fetch(u).then((x) => x.json())
  )

  const allData = {
    VersionData,
    GameVersionData,
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
