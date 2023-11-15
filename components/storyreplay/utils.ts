export function getBaseId(storyId: string): string {
    return storyId.split('-').slice(0, 4).join('-')
}

export function getPartId(storyId: string): string {
    return storyId.split('-').slice(4).join('-')
}

export const STORY_STORAGE_PREFIX = 'StoryState_'
