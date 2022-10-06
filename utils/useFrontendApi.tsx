import * as Sentry from '@sentry/browser'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { showNotification } from '@mantine/notifications'
import { QueryFunction, useQuery } from 'react-query'
import { useMemo } from 'react'

import type {
    Card as WikiCard,
    TheRootSchema as WikiCards,
} from '#data/wikiPages/cards'
import type { ChapterItem, Stories } from '#data/types'
import type { SkillLaunchItem } from '#components/notemap/types'
import type { BirthdayCommuList } from '#data/birthday.data'
import type { Contributor } from '#components/api/contributors/types'
import { DiaryItem } from '#data/wikiModules/diary'

const frontendQueryFn: QueryFunction = ({ queryKey: [path] }) =>
    fetch(('/api/' + path) as string).then((x) =>
        x.status === 200 ? x.json() : undefined
    )

export type FrontendAPIResponseMapping = {
    birthdayCommu: BirthdayCommuList
    cards: WikiCards
    cardStories:
        | {
              stories: Stories | null
          }
        | undefined
    eventStories: ChapterItem | null
    contributors: Contributor[]
    diary: DiaryItem | undefined
    news: { title: string; link?: string }[]
    skillRunner: SkillLaunchItem[]
    stories: ChapterItem | null
    version:
        | {
              releaseDate: string
              releaseNotes: string
              releaseTimestamp: string
              versionDisplay: string
          }
        | undefined
    wikiCard: Partial<WikiCard>[] | undefined
}

function useFrontendApi<T extends keyof FrontendAPIResponseMapping>(
    key: T,
    params?: Record<string, string | string[]>,
    enabled?: boolean
) {
    const [urlsp, withParams] = useMemo(() => {
        const _urlsp = new URLSearchParams()
        let _withParams = false
        Object.entries(params ?? {}).map(([k, v]) => {
            _withParams = true
            _urlsp.set(k, String(v))
        })

        return [_urlsp, _withParams]
    }, [params])
    const rq = useQuery<FrontendAPIResponseMapping[T]>({
        queryKey: key + (withParams ? '?' + urlsp.toString() : ''),
        queryFn: frontendQueryFn as QueryFunction<
            FrontendAPIResponseMapping[T]
        >,
        onError: (error) => {
            showNotification({
                color: 'red',
                title: `于 ${key} 前端 API 获取数据时出错`,
                icon: <FontAwesomeIcon icon={faCircleXmark} />,
                message: String(error),
            })
            console.error(error)
            Sentry.captureException(error)
        },
        enabled,
    })

    return rq
}

export default useFrontendApi
