import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { Alert } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import PageLoading from '#components/PageLoading'
import Title from '#components/Title'
import getI18nProps from '#utils/getI18nProps'
import useApi from '#utils/useApi'
import allFinished from '#utils/allFinished'
import type { APIResponseOf } from '#utils/api'
import pickFirstOrOne from '#utils/pickFirstOrOne'
import StoryReplayView from '#components/storyreplay/StoryReplayView'

const StoryReplayPage = ({
    StoryScriptData,
}: {
    StoryScriptData: APIResponseOf<'StoryScript'>
}) => {
    const $t = useTranslations('storyreplay')

    return (
        <>
            <Title title={$t('Story replay')} noh2 />
            {StoryScriptData.length === 0 ? (
                <p>{$t('no_story')}</p>
            ) : StoryScriptData.length > 1 ? (
                <>
                    <p>
                        {$t('multiple_parts', {
                            len: StoryScriptData.length,
                        })}
                    </p>
                    {StoryScriptData.map((lines, index) => (
                        <>
                            <p>{$t('story_part', { p: index + 1 })}</p>
                            <StoryReplayView lines={lines} />
                        </>
                    ))}
                </>
            ) : (
                <StoryReplayView lines={StoryScriptData[0]} />
            )}
        </>
    )
}

const SkeletonStoryReplayPage = () => {
    const router = useRouter()
    const $t = useTranslations('storyreplay')
    const id = pickFirstOrOne(router.query.id ?? '')
    const { data: StoryScriptData } = useApi('StoryScript', {
        id,
    })

    const allData = {
        StoryScriptData,
    }

    return (
        <>
            <h2>{$t('Story replay')}</h2>
            {allFinished(allData) ? (
                <StoryReplayPage {...allData} />
            ) : (
                <>
                    <Alert
                        icon={<FontAwesomeIcon icon={faInfoCircle} />}
                        color="orange"
                    >
                        {$t('be_patient')}
                    </Alert>
                    <PageLoading data={allData} />
                </>
            )}
        </>
    )
}

export const getServerSideProps = getI18nProps(['storyreplay'])

export default SkeletonStoryReplayPage
