import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import EditorView from '#components/mtalk/EditorView'
import { withMessages } from '#utils/withMessages'
import type { ParamsWithLocale } from '#utils/types'

const MTalkPage = async ({ params }: ParamsWithLocale) => {
    const { locale } = await params
    unstable_setRequestLocale(locale)
    const $t = await getTranslations({ locale, namespace: 'mtalk' })
    return (
        <>
            <h2>{$t('MacaronTalk')}</h2>
            <p>
                {$t.rich('mtalk_description', {
                    a: (children) => (
                        <a
                            href="https://www.yuzutalk.net/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {children}
                        </a>
                    ),
                })}
            </p>
            <EditorView />
        </>
    )
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const $t = await getTranslations({ locale, namespace: 'mtalk' })
    return {
        title: $t('MacaronTalk'),
    }
}

export default withMessages(MTalkPage, ['mtalk', 'messages', 'v-chr'])
