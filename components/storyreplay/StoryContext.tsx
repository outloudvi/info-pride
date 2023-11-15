import { createContext } from 'react'

import { STORY_STORAGE_PREFIX, getBaseId, getPartId } from './utils'

import tryJSONParse from '#utils/tryJsonParse'

export class StoryStateStorageContext {
    #storyBaseId: string
    #storyPartId: string
    #refreshTrigger: (s: Record<string, number>) => void

    constructor(
        storyId: string,
        refreshTrigger: (s: Record<string, number>) => void,
    ) {
        this.#storyBaseId = getBaseId(storyId)
        this.#storyPartId = getPartId(storyId)
        this.#refreshTrigger = refreshTrigger
    }

    getContext(): Record<string, number> {
        const storyStorageKey = STORY_STORAGE_PREFIX + this.#storyBaseId
        const storyState = (tryJSONParse(
            window?.localStorage?.getItem(storyStorageKey),
        ) ?? {}) as Record<string, number>
        return storyState
    }

    get(key: string): number | null {
        return this.getContext()[`${this.#storyPartId}:${key}`] ?? null
    }

    set(key: string, value: number) {
        console.log(
            'Setting',
            this.#storyBaseId,
            `${this.#storyPartId}:${key}=${value}`,
        )
        if (typeof window !== 'undefined' && window.localStorage) {
            const storyStorageKey = STORY_STORAGE_PREFIX + this.#storyBaseId
            const storyState = (tryJSONParse(
                window?.localStorage?.getItem(storyStorageKey),
            ) ?? {}) as Record<string, number>
            storyState[`${this.#storyPartId}:${key}`] = value
            window.localStorage.setItem(
                storyStorageKey,
                JSON.stringify(storyState),
            )
            this.#refreshTrigger(storyState)
        }
    }
}

const StoryContext = createContext(
    new StoryStateStorageContext('EMPTY', () => {}),
)
StoryContext.displayName = 'StoryContext'

export default StoryContext
