import { useTranslations } from 'next-intl'

import PageLoading from '#components/PageLoading'
import Title from '#components/Title'
import allFinished from '#utils/allFinished'
import useApi from '#utils/useApi'
import MessageBoardView from '#components/messages/MessageBoardView'
import getI18nProps from '#utils/getI18nProps'

const SkeletonMessagesPage = () => {
    const $t = useTranslations('messages')
    const { data: MessageGroups } = useApi('MessageGroup')

    const allData = {
        groups: MessageGroups,
    }

    return (
        <>
            <Title title={$t('Messages')} />
            <p>{$t('full_screen_advised')}</p>
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

export const getStaticProps = getI18nProps(['messages', 'v-chr'])

export default SkeletonMessagesPage
