import day from 'dayjs'
import { Badge } from '@mantine/core'

import useIpSWR from '../utils/useIpSWR'
import allFinished from '../utils/allFinished'
import { APIResponseOf } from '../utils/api'
import { Meta as WikiPagesMeta } from '../data/wikiPages'
import { Meta as WikiModulesMeta } from '../data/wikiModules'

import PageLoading from './PageLoading'

const VersionInfo = ({
  VersionData,
}: {
  VersionData: APIResponseOf<'Version'>
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
    <div>
      {Object.entries(lines).map(([k, v], i) => (
        <>
          {k} <Badge>{v}</Badge> <br />
        </>
      ))}
    </div>
  )
}

const SkeletonVersionInfo = () => {
  const { data: VersionData } = useIpSWR('Version')

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
