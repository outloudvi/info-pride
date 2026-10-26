import { redirect, notFound } from 'next/navigation'

import { fetchApi } from '#utils/fetchApi'

const StoryRedirectPage = async ({
    params,
}: {
    params: Promise<{ advAssetId: string }>
}) => {
    const { advAssetId } = await params
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
