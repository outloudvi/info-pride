import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import EditorView from '#components/mtalk/EditorView'
import { withMessages } from '#utils/withMessages'

const MTalkPage = () => {
    const $t = useTranslations('mtalk')
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
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'mtalk' })
    return {
        title: $t('MacaronTalk'),
    }
}

export default withMessages(MTalkPage, ['mtalk', 'messages', 'v-chr'])
