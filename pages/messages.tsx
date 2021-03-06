import PageLoading from '#components/PageLoading'
import Title from '#components/Title'
import allFinished from '#utils/allFinished'
import useApi from '#utils/useApi'
import MessageBoardView from '#components/messages/MessageBoardView'

const SkeletonMessagesPage = () => {
  const { data: MessageGroups } = useApi('MessageGroup')

  const allData = {
    groups: MessageGroups,
  }

  return (
    <>
      <Title title="消息" />
      <p>建议使用全屏模式查看本页。</p>
      {allFinished(allData) ? (
        <>
          <MessageBoardView {...allData} />
        </>
      ) : (
        <PageLoading data={allData} />
      )}
    </>
  )
}

export default SkeletonMessagesPage
