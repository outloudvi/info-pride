import storiesData from '#data/videos/stories.data'

const getSpecialStories = (locale: string) => {
    return storiesData?.[locale]?.special
}

export default getSpecialStories
