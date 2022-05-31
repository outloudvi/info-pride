import MessageView from '#components/messages/MessageView'
import PageLoading from '#components/PageLoading'
import Title from '#components/Title'
import allFinished from '#utils/allFinished'
import useApi from '#utils/useApi'

const SkeletonMessagesPage = () => {
  const { data: MessageGroups } = useApi('MessageGroup')

  const allData = {
    groups: MessageGroups,
  }

  return (
    <>
      <Title title="消息" />
      {allFinished(allData) ? (
        <>
          <MessageView {...allData} />
        </>
      ) : (
        <PageLoading data={allData} />
      )}
    </>
  )
}

export default SkeletonMessagesPage
