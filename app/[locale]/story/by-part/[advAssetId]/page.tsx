import { redirect, notFound } from 'next/navigation'

import { fetchApi } from '#utils/fetchApi'

const StoryRedirectPage = async ({
    params: { advAssetId },
}: {
    params: { advAssetId: string }
}) => {
    const storyId = await fetchApi('Story/Reverse', {
        advAssetId,
    }).then((x) => x.id)

    if (storyId) {
        redirect(`/story/${storyId}`)
    } else {
        notFound()
    }
}

export default StoryRedirectPage
